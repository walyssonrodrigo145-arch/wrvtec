type GtagWindow = Window & {
  gtag?: (...args: unknown[]) => void;
};

export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem("wrv-consent") === "accepted";
  } catch {
    return false;
  }
}

export function track(evento: string, params?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  if (!hasAnalyticsConsent()) return;
  const win = window as GtagWindow;
  if (typeof win.gtag === "function") {
    win.gtag("event", evento, params ?? {});
  }
}
