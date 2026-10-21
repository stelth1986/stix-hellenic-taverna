import { getSettings } from "./_lib/db.js";

/** Public, non-sensitive site configuration consumed by the frontend. */
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=300");
  try {
    const s = await getSettings();
    return res.status(200).json({
      images: s.images || {},
      analytics: s.analytics || {},
      hours: s.hours || null,
      gallery: s.gallery || null,
    });
  } catch (err) {
    console.error("site-config failed", err);
    // Site must keep working with bundled defaults even if the DB is down.
    return res.status(200).json({ images: {}, analytics: {}, hours: null, gallery: null });
  }
}
