import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const TELA = {
  left: "8.789%",
  top: "15.234%",
  width: "82.617%",
  height: "66.895%",
};

export function LaptopFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("relative w-full", className)}
      style={{ aspectRatio: "1536 / 1024" }}
    >
      <div
        className="absolute overflow-hidden bg-white"
        style={TELA}
      >
        {children}
      </div>
      <Image
        src="/frames/laptop-frame.png"
        alt=""
        fill
        sizes="(max-width: 1024px) 92vw, 720px"
        className="pointer-events-none select-none object-contain"
      />
    </div>
  );
}
