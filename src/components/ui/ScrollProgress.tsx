"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progresso, setProgresso] = useState(0);

  useEffect(() => {
    let raf = 0;

    const calcular = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const atual = window.scrollY;
        setProgresso(total > 0 ? Math.min(1, Math.max(0, atual / total)) : 0);
      });
    };

    calcular();
    window.addEventListener("scroll", calcular, { passive: true });
    window.addEventListener("resize", calcular);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", calcular);
      window.removeEventListener("resize", calcular);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-x-0 top-[72px] z-40 h-[3px] transition-opacity duration-300 ${
        progresso > 0.005 ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-blue via-blue-light to-[#7B3FF2] shadow-[0_0_12px_rgba(29,111,242,0.5)] transition-transform duration-75 ease-out"
        style={{ transform: `scaleX(${progresso})` }}
      />
    </div>
  );
}
