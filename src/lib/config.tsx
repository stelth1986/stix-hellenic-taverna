import { createContext, useContext, useEffect, useState } from "react";
import { HOURS } from "@/data/site";
import type { SeoSettings } from "@/data/seo";

export type GalleryItem = { src: string; caption: string };

export type SiteConfig = {
  images: Record<string, string>;
  analytics: { gaId?: string; enabled?: boolean };
  hours: typeof HOURS | null;
  gallery: GalleryItem[] | null;
  seo: SeoSettings | null;
};

const DEFAULTS: SiteConfig = { images: {}, analytics: {}, hours: null, gallery: null, seo: null };

const Ctx = createContext<SiteConfig>(DEFAULTS);

/** Turns a bundled relative path like "./images/x.jpg" into an absolute one. */
export function absPath(p: string) {
  return p.startsWith("./") ? p.slice(1) : p;
}

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [cfg, setCfg] = useState<SiteConfig>(DEFAULTS);

  useEffect(() => {
    fetch("/api/site-config")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d) setCfg({ ...DEFAULTS, ...d });
      })
      .catch(() => {
        // No config available (local dev or DB offline): use bundled defaults.
      });
  }, []);

  // Inject Google Analytics only when enabled in the admin panel.
  useEffect(() => {
    const id = cfg.analytics?.gaId?.trim();
    if (!id || !cfg.analytics?.enabled) return;
    if (document.getElementById("ga-gtag")) return;
    const s = document.createElement("script");
    s.id = "ga-gtag";
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.appendChild(s);
    const w = window as unknown as {
      dataLayer: unknown[];
      gtag: (...args: unknown[]) => void;
    };
    w.dataLayer = w.dataLayer || [];
    w.gtag = function () {
      w.dataLayer.push(arguments);
    };
    w.gtag("js", new Date());
    w.gtag("config", id);
  }, [cfg]);

  return <Ctx.Provider value={cfg}>{children}</Ctx.Provider>;
}

export function useConfig() {
  return useContext(Ctx);
}

/** Image URL for a slot: admin override if set, otherwise the bundled photo. */
export function img(cfg: SiteConfig, key: string, fallback: string) {
  return cfg.images[key] || fallback;
}

/** Opening hours: admin override if set, otherwise the bundled defaults. */
export function useHours(): typeof HOURS {
  const cfg = useContext(Ctx);
  return cfg.hours || HOURS;
}
