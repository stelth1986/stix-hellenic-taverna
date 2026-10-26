import { useEffect } from "react";
import { useLocation } from "react-router";
import { useConfig } from "@/lib/config";
import { DEFAULT_SEO, SEO_PAGES } from "@/data/seo";

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!content) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/** Applies the admin-editable SEO tags for the current page. */
export default function Seo() {
  const location = useLocation();
  const cfg = useConfig();

  useEffect(() => {
    const origin = window.location.origin;
    const path = location.pathname;

    // Admin, thank-you and any unknown path stay out of Google.
    const page = SEO_PAGES.find((p) => p.path === path);
    if (!page) {
      document.title = "Stix Hellenic Taverna";
      setMeta("name", "robots", "noindex, nofollow");
      return;
    }

    const over = cfg.seo?.pages?.[page.key] || {};
    const def = DEFAULT_SEO[page.key];
    const title = over.title?.trim() || def.title;
    const desc = over.description?.trim() || def.description;
    const ogImage =
      over.ogImage || cfg.seo?.defaultOgImage || "/images/hero-flatlay.jpg";
    const ogImageAbs = ogImage.startsWith("http")
      ? ogImage
      : `${origin}${ogImage.startsWith("/") ? ogImage : `/${ogImage}`}`;

    document.title = title;
    setMeta("name", "description", desc);
    setMeta(
      "name",
      "robots",
      over.noindex ? "noindex, nofollow" : "index, follow"
    );
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", "Stix Hellenic Taverna");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", desc);
    setMeta("property", "og:url", `${origin}${path}`);
    setMeta("property", "og:image", ogImageAbs);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", desc);
    setMeta("name", "twitter:image", ogImageAbs);

    // Search Console / Bing verification tags from the admin panel.
    setMeta("name", "google-site-verification", cfg.seo?.googleVerify?.trim() || "");
    setMeta("name", "msvalidate.01", cfg.seo?.bingVerify?.trim() || "");
  }, [location.pathname, cfg]);

  return null;
}
