"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisivel(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const subir = () => {
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduzido ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={subir}
      aria-label="Voltar ao topo"
      tabIndex={visivel ? 0 : -1}
      className={`fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue to-blue-hover text-white shadow-lg shadow-blue/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue/40 active:scale-95 sm:bottom-8 sm:right-8 ${
        visivel
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" strokeWidth={2.2} aria-hidden="true" />
    </button>
  );
}
