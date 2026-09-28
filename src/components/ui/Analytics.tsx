"use client";

import { useEffect } from "react";
import { hasAnalyticsConsent } from "@/lib/analytics";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let carregado = false;

export function Analytics() {
  useEffect(() => {
    const id = process.env.NEXT_PUBLIC_GA_ID;
    if (!id) return;

    const carregar = () => {
      if (carregado || !hasAnalyticsConsent()) return;
      carregado = true;

      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer ?? [];
      window.gtag = (...args: unknown[]) => {
        window.dataLayer?.push(args);
      };
      window.gtag("js", new Date());
      window.gtag("config", id, { anonymize_ip: true });
    };

    carregar();
    window.addEventListener("wrv-consent-change", carregar);
    return () => window.removeEventListener("wrv-consent-change", carregar);
  }, []);

  return null;
}
