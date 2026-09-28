import { cn } from "@/lib/cn";
import { site } from "@/content/site";

export function Logo({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span
      className={cn("inline-flex flex-col leading-none", className)}
      aria-label={site.nome}
    >
      <span
        className={cn(
          "font-display text-2xl font-bold tracking-tight",
          tone === "dark" ? "text-navy" : "text-white",
        )}
      >
        WR
        <span className="bg-gradient-to-r from-blue to-blue-light bg-clip-text text-transparent">
          V
        </span>
      </span>
      <span
        className={cn(
          "font-display text-[9px] font-semibold tracking-[0.45em]",
          tone === "dark" ? "text-navy/70" : "text-white/70",
        )}
      >
        TECNOLOGIA
      </span>
    </span>
  );
}
