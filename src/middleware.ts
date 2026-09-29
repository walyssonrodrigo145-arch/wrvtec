import { NextRequest, NextResponse } from "next/server";

type Balde = {
  count: number;
  resetAt: number;
};

const baldes = new Map<string, Balde>();

function consumir(
  chave: string,
  limite: number,
  janelaMs: number,
): { ok: boolean; retryAfter: number } {
  const agora = Date.now();

  if (baldes.size > 5000) {
    for (const [k, b] of baldes) {
      if (b.resetAt <= agora) baldes.delete(k);
    }
  }

  const atual = baldes.get(chave);

  if (!atual || atual.resetAt <= agora) {
    baldes.set(chave, { count: 1, resetAt: agora + janelaMs });
    return { ok: true, retryAfter: 0 };
  }

  if (atual.count >= limite) {
    return {
      ok: false,
      retryAfter: Math.ceil((atual.resetAt - agora) / 1000),
    };
  }

  atual.count += 1;
  return { ok: true, retryAfter: 0 };
}

function ipDoCliente(req: NextRequest): string {
  const encaminhado = req.headers.get("x-forwarded-for");
  if (encaminhado) {
    const partes = encaminhado
      .split(",")
      .map((parte) => parte.trim())
      .filter(Boolean);
    if (partes.length > 0) return partes[partes.length - 1];
  }
  return req.headers.get("x-real-ip") ?? "desconhecido";
}

function negar(retryAfter: number, mensagem: string): NextResponse {
  return new NextResponse(mensagem, {
    status: 429,
    headers: {
      "Retry-After": String(retryAfter),
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export function middleware(req: NextRequest): NextResponse {
  const { pathname } = req.nextUrl;
  const ip = ipDoCliente(req);

  const global = consumir(`global:${ip}`, 150, 60_000);
  if (!global.ok) {
    return negar(global.retryAfter, "Muitas requisicoes. Aguarde um instante.");
  }

  if (pathname.startsWith("/_next/image")) {
    const imagem = consumir(`imagem:${ip}`, 45, 60_000);
    if (!imagem.ok) {
      return negar(imagem.retryAfter, "Muitas requisicoes de imagem.");
    }
  }

  if (pathname.startsWith("/api/")) {
    if (!req.headers.get("user-agent")) {
      return new NextResponse("Forbidden", { status: 403 });
    }
    const api = consumir(`api:${ip}`, 30, 60_000);
    if (!api.ok) {
      return negar(api.retryAfter, "Muitas requisicoes.");
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|favicon).*)"],
};
