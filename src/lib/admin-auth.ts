import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "wrv-admin";
const DURACAO_HORAS = 12;

function segredo(): string {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "";
}

export function adminConfigurado(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function verificarSenha(senha: string): boolean {
  const esperada = process.env.ADMIN_PASSWORD ?? "";
  if (!esperada) return false;
  const recebida = Buffer.from(senha);
  const alvo = Buffer.from(esperada);
  if (recebida.length !== alvo.length) return false;
  return timingSafeEqual(recebida, alvo);
}

function criarToken(): string {
  const expiraEm = Date.now() + DURACAO_HORAS * 3_600_000;
  const assinatura = createHmac("sha256", segredo())
    .update(String(expiraEm))
    .digest("hex");
  return `${expiraEm}.${assinatura}`;
}

function tokenValido(token: string | undefined): boolean {
  if (!token) return false;
  if (!segredo()) return false;
  const [expiraEm, assinatura] = token.split(".");
  if (!expiraEm || !assinatura) return false;
  if (Number(expiraEm) < Date.now()) return false;

  const esperada = createHmac("sha256", segredo())
    .update(expiraEm)
    .digest("hex");
  const recebida = Buffer.from(assinatura);
  const alvo = Buffer.from(esperada);
  return recebida.length === alvo.length && timingSafeEqual(recebida, alvo);
}

export async function sessaoAtiva(): Promise<boolean> {
  if (!adminConfigurado()) return false;
  const jar = await cookies();
  return tokenValido(jar.get(COOKIE)?.value);
}

export async function criarSessao(): Promise<void> {
  const jar = await cookies();
  jar.set(COOKIE, criarToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: DURACAO_HORAS * 3_600,
  });
}

export async function encerrarSessao(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE);
}
