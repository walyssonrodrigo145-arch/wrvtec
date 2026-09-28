import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { navegacao } from "@/content/navegacao";
import { redesSociais } from "@/content/redes-sociais";
import { site } from "@/content/site";

export function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="relative bg-navy-deep text-white">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue/70 to-transparent"
      />
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/" aria-label="WRV Tecnologia — Página inicial">
            <Logo tone="light" />
          </Link>

          <nav aria-label="Navegação do rodapé">
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {navegacao.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex items-center gap-3">
            {redesSociais.map((rede) => (
              <li key={rede.label}>
                <a
                  href={rede.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.nome} no ${rede.label}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-light/50 hover:bg-white/5 hover:text-white hover:shadow-lg hover:shadow-blue/20"
                >
                  <Icon name={rede.icone} className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>{site.tagline}</p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>
              © {ano} {site.nome}
            </span>
            <Link
              href="/politica-de-privacidade"
              className="transition-colors hover:text-white"
            >
              Política de Privacidade
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
