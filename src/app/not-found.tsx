import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-mist px-4 py-16">
      <div className="w-full max-w-md text-center">
        <Link
          href="/"
          className="inline-flex justify-center"
          aria-label="WRV Tecnologia — Página inicial"
        >
          <Logo />
        </Link>

        <p className="mt-8 font-display text-sm font-semibold tracking-[0.22em] text-blue">
          ERRO 404
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold text-navy sm:text-4xl">
          Página não encontrada
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted sm:text-base">
          O endereço que você tentou acessar não existe ou foi movido. Volte
          para o início para continuar navegando.
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue to-blue-hover px-6 font-display text-[15px] font-semibold text-white shadow-lg shadow-blue/25 transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
          >
            Voltar para o início
            <Icon name="arrow-right" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
