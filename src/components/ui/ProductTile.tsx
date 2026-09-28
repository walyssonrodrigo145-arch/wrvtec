import { cn } from "@/lib/cn";
import type { ProdutoLogo } from "@/content/produtos";

const tiles: Record<ProdutoLogo, { classe: string }> = {
  musicpro: { classe: "bg-gradient-to-br from-[#2E6BFF] to-[#7B3FF2]" },
  dancepro: { classe: "bg-gradient-to-br from-[#1D6FF2] to-[#1560DB]" },
};

export function ProductTile({
  logo,
  className,
}: {
  logo: ProdutoLogo;
  className?: string;
}) {
  const tile = tiles[logo];

  return (
    <span
      className={cn(
        "relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl text-white shadow-md shadow-navy/10 ring-1 ring-inset ring-white/25 transition-transform duration-300 group-hover:scale-105",
        tile.classe,
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent"
      />
      {logo === "musicpro" ? (
        <svg
          viewBox="0 0 24 24"
          className="relative h-5 w-5"
          aria-hidden="true"
          fill="currentColor"
        >
          <rect x="3" y="7" width="2.6" height="10" rx="1.3" />
          <rect x="8.1" y="4" width="2.6" height="16" rx="1.3" />
          <rect x="13.2" y="5.5" width="2.6" height="13" rx="1.3" />
          <rect x="18.3" y="8.5" width="2.6" height="7" rx="1.3" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          className="relative h-5 w-5"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="13.6" cy="5.4" r="2.1" fill="currentColor" stroke="none" />
          <path d="M14.4 9.2c1.6 1.1 2.2 2.7 1.8 4.4" />
          <path d="M8.6 20.6l2.6-4.7-1.8-3.6 3.3-2.3 2 2.7 2.9 1.3" />
        </svg>
      )}
    </span>
  );
}
