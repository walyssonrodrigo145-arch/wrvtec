import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "onDark" | "white";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-blue to-blue-hover text-white shadow-lg shadow-blue/25 hover:shadow-xl hover:shadow-blue/35 hover:brightness-110 active:scale-[0.98]",
  outline:
    "border border-line bg-white text-navy shadow-sm hover:border-blue/40 hover:text-blue hover:shadow-lg hover:shadow-blue/10 active:scale-[0.98]",
  onDark:
    "border border-white/20 bg-white/5 text-white backdrop-blur-sm hover:border-white/40 hover:bg-white/10 active:scale-[0.98]",
  white:
    "bg-white text-navy shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/15 hover:bg-white/95 active:scale-[0.98]",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  disabled,
  onClick,
  target,
  rel,
  ariaLabel,
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  target?: string;
  rel?: string;
  ariaLabel?: string;
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    const externo = /^(https?:|mailto:|tel:)/.test(href);

    if (externo) {
      return (
        <a
          href={href}
          className={classes}
          target={target ?? "_blank"}
          rel={rel ?? "noopener noreferrer"}
          aria-label={ariaLabel}
          onClick={onClick}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} aria-label={ariaLabel} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
