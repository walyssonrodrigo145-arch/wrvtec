import { createHash } from "node:crypto";

export function hashKey(value: string): string {
  const salt = process.env.RATE_LIMIT_SALT ?? "wrv-local-salt";
  return createHash("sha256").update(`${salt}:${value}`).digest("hex");
}
