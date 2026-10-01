import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { adminConfigurado, sessaoAtiva } from "@/lib/admin-auth";
import { loginAction } from "@/app/master-panel/actions";

export const metadata: Metadata = {
  title: "Entrar na gestão de leads",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const mensagensErro: Record<string, string> = {
  "1": "Senha incorreta. Tente novamente.",
  limite: "Muitas tentativas. Aguarde alguns minutos e tente novamente.",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ erro?: string }>;
}) {
  if (await sessaoAtiva()) redirect("/master-panel");

  const { erro } = await searchParams;
  const configurado = adminConfigurado();

  return (
    <main className="flex min-h-screen items-center justify-center bg-mist px-4 py-12">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="inline-flex justify-center"
          aria-label="WRV Tecnologia — Página inicial"
        >
          <Logo />
        </Link>

        <div className="mt-6 rounded-3xl border border-line bg-white p-7 shadow-[0_30px_60px_-30px_rgba(11,30,62,0.35)]">
          <h1 className="font-display text-xl font-semibold text-navy">
            Gestão de leads
          </h1>
          <p className="mt-1.5 text-sm text-muted">
            Acesso restrito à equipe WRV Tecnologia.
          </p>

          {!configurado ? (
            <div
              role="alert"
              className="mt-5 rounded-xl border border-error/25 bg-error/5 p-4 text-xs leading-relaxed text-error"
            >
              Acesso não configurado. Defina a variável{" "}
              <code className="rounded bg-white/60 px-1 font-semibold">
                ADMIN_PASSWORD
              </code>{" "}
              no arquivo <code className="rounded bg-white/60 px-1">.env</code>{" "}
              e reinicie o servidor.
            </div>
          ) : (
            <form action={loginAction} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="senha"
                  className="text-xs font-semibold text-navy"
                >
                  Senha de acesso
                </label>
                <input
                  id="senha"
                  name="senha"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-3 text-sm text-ink shadow-sm transition-all duration-300 placeholder:text-muted/50 hover:border-blue/30 focus:border-blue focus:outline-none focus:ring-4 focus:ring-blue/10"
                  placeholder="Sua senha"
                />
              </div>

              {erro && mensagensErro[erro] ? (
                <p role="alert" className="text-xs font-medium text-error">
                  {mensagensErro[erro]}
                </p>
              ) : null}

              <button
                type="submit"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue to-blue-hover font-display text-sm font-semibold text-white shadow-lg shadow-blue/25 transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
              >
                Entrar
                <Icon name="arrow-right" className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>

        <p className="mt-5 text-center text-xs text-muted/70">
          <Link href="/" className="transition-colors hover:text-blue">
            Voltar para o site
          </Link>
        </p>
      </div>
    </main>
  );
}
