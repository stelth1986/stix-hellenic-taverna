import { getSettings, hasDb } from "./_lib/db.js";
import {
  EMPTY_PUBLIC_CONFIG,
  hasBlob,
  publishPublicConfig,
  readPublicConfig,
  toPublicConfig,
} from "./_lib/public-config.js";

/** Public, non-sensitive site configuration consumed by the frontend. */
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=300");

  // Normal path: read the published file. No database query, so page views
  // do not keep the database compute awake.
  if (hasBlob()) {
    try {
      const published = await readPublicConfig();
      if (published) return res.status(200).json({ ...EMPTY_PUBLIC_CONFIG, ...published });
    } catch (err) {
      console.error("site-config: could not read published config", err);
    }
  }

  // Fallback: nothing published yet (or Blob is not configured). Read the
  // database once and publish, so later requests take the path above.
  try {
    const settings = await getSettings();
    if (hasBlob() && hasDb()) {
      try {
        await publishPublicConfig(settings);
      } catch (err) {
        console.error("site-config: could not publish config", err);
      }
    }
    return res.status(200).json(toPublicConfig(settings));
  } catch (err) {
    console.error("site-config failed", err);
    // Site must keep working with bundled defaults even if the DB is down.
    return res.status(200).json(EMPTY_PUBLIC_CONFIG);
  }
}
