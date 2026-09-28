import { NextResponse } from "next/server";
import { fieldErrors, leadSchema } from "@/lib/validators";
import { checkRateLimit } from "@/lib/rate-limit";
import { hashKey } from "@/lib/hash";
import { registrarLeadLocal, sendLeadEmail } from "@/lib/email";
import { salvarLead } from "@/lib/leads-store";

export const runtime = "nodejs";

const LIMITE_PAYLOAD = 10_240;

const MENSAGEM_ENVIO =
  "Não foi possível enviar sua mensagem. Tente novamente ou fale conosco pelo WhatsApp.";

function respostaErro(
  status: number,
  code: string,
  message: string,
  extra?: Record<string, unknown>,
) {
  return NextResponse.json(
    { ok: false, error: { code, message, ...extra } },
    { status },
  );
}

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "127.0.0.1";

  let corpo: unknown;
  try {
    const texto = await request.text();
    if (texto.length > LIMITE_PAYLOAD) {
      return respostaErro(
        413,
        "PAYLOAD",
        "Mensagem muito longa. Reduza o texto e tente novamente.",
      );
    }
    corpo = JSON.parse(texto);
  } catch {
    return respostaErro(400, "JSON", "Não foi possível processar a solicitação.");
  }

  const validacao = leadSchema.safeParse(corpo);
  if (!validacao.success) {
    return respostaErro(422, "VALIDACAO", "Verifique os campos destacados.", {
      fields: fieldErrors(validacao.error),
    });
  }

  const { website, elapsedMs, ...lead } = validacao.data;

  if (website && website.length > 0) {
    console.warn(`[contato][${requestId}] Honeypot acionado`);
    return NextResponse.json({ ok: true, data: { delivered: false } });
  }

  if (typeof elapsedMs === "number" && elapsedMs < 2000) {
    console.warn(`[contato][${requestId}] Envio rápido demais (possível bot)`);
    return NextResponse.json({ ok: true, data: { delivered: false } });
  }

  const limite = checkRateLimit(hashKey(ip));
  if (!limite.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "RATE_LIMIT",
          message: "Muitas tentativas. Tente novamente em alguns minutos.",
        },
      },
      {
        status: 429,
        headers: { "Retry-After": String(limite.retryAfterSeconds) },
      },
    );
  }

  const salvo = await salvarLead(lead);

  let entregue = false;
  try {
    entregue = (await sendLeadEmail(lead)).delivered;
  } catch (error) {
    console.error(`[contato][${requestId}] Falha no envio do lead por e-mail`, error);
    registrarLeadLocal(lead, "falha no envio de e-mail");
  }

  if (!salvo && !entregue) {
    return respostaErro(502, "ENVIO", MENSAGEM_ENVIO);
  }

  return NextResponse.json({ ok: true, data: { salvo, entregue } });
}
