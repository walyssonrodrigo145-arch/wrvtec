"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { navegacao } from "@/content/navegacao";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    const primeiroLink = panelRef.current?.querySelector<HTMLElement>("a, button");
    primeiroLink?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const prenderFoco = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !panelRef.current) return;

    const focaveis = panelRef.current.querySelectorAll<HTMLElement>(
      "a, button, [tabindex]:not([tabindex='-1'])",
    );
    if (focaveis.length === 0) return;

    const primeiro = focaveis[0];
    const ultimo = focaveis[focaveis.length - 1];

    if (event.shiftKey && document.activeElement === primeiro) {
      event.preventDefault();
      ultimo.focus();
    } else if (!event.shiftKey && document.activeElement === ultimo) {
      event.preventDefault();
      primeiro.focus();
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-line/70 bg-white/80 shadow-[0_10px_40px_-24px_rgba(11,30,62,0.45)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" aria-label="WRV Tecnologia — Página inicial">
          <Logo />
        </Link>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navegacao.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="relative text-sm font-medium text-navy/80 transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-gradient-to-r after:from-blue after:to-blue-light after:transition-all after:duration-300 hover:text-blue hover:after:w-full"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button href="/#contato">Fale Conosco</Button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((valor) => !valor)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/80 text-navy shadow-sm backdrop-blur transition-colors hover:border-blue/40 hover:text-blue lg:hidden"
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>

      {open ? (
        <button
          type="button"
          aria-label="Fechar menu"
          tabIndex={-1}
          onClick={() => setOpen(false)}
          className="fixed inset-0 top-[72px] z-40 bg-navy/40 backdrop-blur-sm lg:hidden"
        />
      ) : null}

      <div
        ref={panelRef}
        id="menu-mobile"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        onKeyDown={prenderFoco}
        className={`fixed right-0 top-[72px] z-50 h-[calc(100dvh-72px)] w-72 max-w-[85vw] border-l border-line bg-white/95 p-6 shadow-2xl backdrop-blur-xl transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav aria-label="Navegação mobile">
          <ul className="flex flex-col gap-1">
            {navegacao.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-base font-medium text-navy transition-colors hover:bg-blue/5 hover:text-blue"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-6">
          <Button href="/#contato" className="w-full" onClick={() => setOpen(false)}>
            Fale Conosco
          </Button>
        </div>
      </div>
    </header>
  );
}
