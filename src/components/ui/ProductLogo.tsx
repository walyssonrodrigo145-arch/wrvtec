import { cn } from "@/lib/cn";
import { ProductTile } from "@/components/ui/ProductTile";
import type { Produto } from "@/content/produtos";

export function Wordmark({
  nome,
  tone = "dark",
  className,
}: {
  nome: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  const base = tone === "dark" ? "text-navy" : "text-white";

  if (nome.endsWith("Pro")) {
    return (
      <span className={cn("font-display font-semibold", base, className)}>
        {nome.slice(0, -3)}
        <span className="text-blue">Pro</span>
      </span>
    );
  }

  return (
    <span className={cn("font-display font-semibold", base, className)}>
      {nome}
    </span>
  );
}

export function ProductLogo({
  produto,
  tone = "dark",
  className,
}: {
  produto: Produto;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <ProductTile logo={produto.logo} />
      <span className="flex flex-col leading-tight">
        <Wordmark nome={produto.nome} tone={tone} className="text-base" />
        <span
          className={cn(
            "text-xs",
            tone === "dark" ? "text-muted" : "text-white/60",
          )}
        >
          {produto.subtitulo}
        </span>
      </span>
    </span>
  );
}
