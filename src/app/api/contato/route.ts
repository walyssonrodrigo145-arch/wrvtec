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

function extrairIp(request: Request): string {
  const encaminhado = request.headers.get("x-forwarded-for");
  if (encaminhado) {
    const partes = encaminhado
      .split(",")
      .map((parte) => parte.trim())
      .filter(Boolean);
    if (partes.length > 0) return partes[partes.length - 1];
  }
  return request.headers.get("x-real-ip") ?? "127.0.0.1";
}

function respostaErro(
  status: number,
  code: string,
  message: string,
  extra?: Record<string, unknown>,
  retryAfterSeconds?: number,
) {
  const headers: Record<string, string> = {};
  if (retryAfterSeconds) headers["Retry-After"] = String(retryAfterSeconds);

  return NextResponse.json(
    { ok: false, error: { code, message, ...extra } },
    { status, headers },
  );
}

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  const ip = extrairIp(request);

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

  const ipHash = hashKey(ip);

  const rajada = checkRateLimit(`contato-rajada:${ipHash}`, {
    limite: 1,
    janelaMs: 30_000,
  });
  if (!rajada.allowed) {
    return respostaErro(
      429,
      "RATE_LIMIT",
      "Aguarde alguns segundos antes de enviar outra mensagem.",
      undefined,
      rajada.retryAfterSeconds,
    );
  }

  const diario = checkRateLimit(`contato-diario:${ipHash}`, {
    limite: 3,
    janelaMs: 24 * 60 * 60 * 1000,
  });
  if (!diario.allowed) {
    return respostaErro(
      429,
      "LIMITE_DIARIO",
      "Limite de 3 envios por dia atingido. Fale com a gente pelo WhatsApp.",
      undefined,
      diario.retryAfterSeconds,
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
