"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function ConsentBanner() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem("wrv-consent")) setVisivel(true);
    } catch {
      setVisivel(true);
    }
  }, []);

  const decidir = (decisao: "accepted" | "rejected") => {
    try {
      window.localStorage.setItem("wrv-consent", decisao);
    } catch {
      // preferência não pôde ser salva; banner reaparece na próxima visita
    }
    window.dispatchEvent(new Event("wrv-consent-change"));
    setVisivel(false);
  };

  if (!visivel) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:pb-6">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 rounded-2xl border border-line bg-white p-5 shadow-2xl sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-muted">
          Usamos cookies para melhorar sua experiência e medir o desempenho do
          site. Saiba mais na{" "}
          <Link
            href="/politica-de-privacidade"
            className="font-medium text-blue underline-offset-2 hover:underline"
          >
            Política de Privacidade
          </Link>
          .
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => decidir("rejected")}
            className="rounded-full border border-line px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-navy/30"
          >
            Recusar
          </button>
          <button
            type="button"
            onClick={() => decidir("accepted")}
            className="rounded-full bg-blue px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-hover"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
