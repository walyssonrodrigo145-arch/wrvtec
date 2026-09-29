type Opcoes = {
  limite?: number;
  janelaMs?: number;
};

type Bucket = {
  count: number;
  resetAt: number;
};

const LIMITE_PADRAO = 3;
const JANELA_PADRAO_MS = 10 * 60 * 1000;

const baldes = new Map<string, Bucket>();

function limparExpirados(agora: number): void {
  if (baldes.size < 1000) return;
  for (const [chave, bucket] of baldes) {
    if (bucket.resetAt <= agora) baldes.delete(chave);
  }
}

export function checkRateLimit(
  chave: string,
  opcoes: Opcoes = {},
): {
  allowed: boolean;
  retryAfterSeconds: number;
} {
  const limite = opcoes.limite ?? LIMITE_PADRAO;
  const janelaMs = opcoes.janelaMs ?? JANELA_PADRAO_MS;
  const agora = Date.now();
  limparExpirados(agora);

  const bucket = baldes.get(chave);

  if (!bucket || bucket.resetAt <= agora) {
    baldes.set(chave, { count: 1, resetAt: agora + janelaMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (bucket.count >= limite) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((bucket.resetAt - agora) / 1000),
    };
  }

  bucket.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}
