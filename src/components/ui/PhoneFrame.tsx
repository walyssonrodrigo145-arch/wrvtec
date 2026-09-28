import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const TELA = {
  left: "14.941%",
  top: "8.919%",
  width: "69.824%",
  height: "84.505%",
};

export function PhoneFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("relative w-full", className)}
      style={{ aspectRatio: "1024 / 1536" }}
    >
      <div
        className="absolute overflow-hidden bg-white"
        style={TELA}
      >
        {children}
      </div>
      <Image
        src="/frames/phone-frame.png"
        alt=""
        fill
        sizes="(max-width: 640px) 160px, 260px"
        className="pointer-events-none select-none object-contain"
      />
    </div>
  );
}
