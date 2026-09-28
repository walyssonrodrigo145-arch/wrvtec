import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Wordmark } from "@/components/ui/ProductLogo";
import { ProductTile } from "@/components/ui/ProductTile";
import type { Produto } from "@/content/produtos";

export function ProductCard({ produto }: { produto: Produto }) {
  return (
    <Link
      href={`/produtos/${produto.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-[0_2px_10px_-6px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:border-blue/25 hover:shadow-[0_28px_50px_-22px_rgba(29,111,242,0.4)]"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <span className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 group-hover:border-blue/30 group-hover:bg-blue/5 group-hover:text-blue">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m9 6 6 6-6 6" />
        </svg>
      </span>

      <div className="relative flex items-center gap-3 pr-10">
        <ProductTile logo={produto.logo} />
        <span className="flex flex-col leading-tight">
          <Wordmark nome={produto.nome} className="text-lg" />
          <span className="text-xs text-muted">{produto.subtitulo}</span>
        </span>
      </div>

      <p className="relative mt-4 text-sm leading-relaxed text-muted">
        {produto.descricao}
      </p>

      <span className="relative mt-auto pt-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-xs font-semibold text-blue transition-all duration-300 group-hover:gap-3 group-hover:border-blue/40 group-hover:bg-blue/5 group-hover:shadow-sm group-hover:shadow-blue/10">
          Saiba mais
          <Icon name="arrow-right" className="h-3.5 w-3.5" />
        </span>
      </span>
    </Link>
  );
}
