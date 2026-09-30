import Image from "next/image";
import { cn } from "@/lib/cn";
import type { ProdutoLogo } from "@/content/produtos";

const logos: Record<ProdutoLogo, { src: string; alt: string }> = {
  musicpro: { src: "/logos/musicpro.png", alt: "Logo do MusicPro" },
  dancepro: { src: "/logos/dancepro.png", alt: "Logo do DancePro" },
};

export function ProductTile({
  logo,
  className,
}: {
  logo: ProdutoLogo;
  className?: string;
}) {
  const item = logos[logo];

  return (
    <span
      className={cn(
        "relative flex h-11 w-11 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-105",
        className,
      )}
    >
      <Image
        src={item.src}
        alt={item.alt}
        width={88}
        height={88}
        className="h-full w-full object-contain drop-shadow-[0_6px_12px_rgba(11,30,62,0.18)]"
      />
    </span>
  );
}
