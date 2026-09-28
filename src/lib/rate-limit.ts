const LIMITE = 3;
const JANELA_MS = 10 * 60 * 1000;

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

function limparExpirados(agora: number): void {
  if (buckets.size < 1000) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= agora) buckets.delete(key);
  }
}

export function checkRateLimit(key: string): {
  allowed: boolean;
  retryAfterSeconds: number;
} {
  const agora = Date.now();
  limparExpirados(agora);

  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= agora) {
    buckets.set(key, { count: 1, resetAt: agora + JANELA_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (bucket.count >= LIMITE) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((bucket.resetAt - agora) / 1000),
    };
  }

  bucket.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}
