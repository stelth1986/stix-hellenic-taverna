import { get, put } from "@vercel/blob";

/**
 * The public site config is published to Vercel Blob as a JSON file so that
 * page views never touch the database. The database then only wakes for
 * admin logins, admin saves and form submissions.
 */
const PATHNAME = "stix/site-config.json";

export const EMPTY_PUBLIC_CONFIG = {
  images: {},
  analytics: {},
  hours: null,
  gallery: null,
  seo: null,
};

export function hasBlob() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

/** Picks the non-sensitive settings the frontend is allowed to see. */
export function toPublicConfig(s) {
  return {
    images: s.images || {},
    analytics: s.analytics || {},
    hours: s.hours || null,
    gallery: s.gallery || null,
    seo: s.seo || null,
  };
}

/** Writes the public config file. Call after every admin settings save. */
export async function publishPublicConfig(settings) {
  const config = toPublicConfig(settings);
  await put(PATHNAME, JSON.stringify(config), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    // Shortest allowed, so admin changes show on the site within about a minute.
    cacheControlMaxAge: 60,
  });
  return config;
}

/** Returns the published config, or null if it has not been published yet. */
export async function readPublicConfig() {
  const result = await get(PATHNAME, { access: "public" });
  if (!result || result.statusCode !== 200) return null;
  return JSON.parse(await new Response(result.stream).text());
}
