import { hasDb, getSettings, setSetting } from "../_lib/db.js";
import { requireAdmin } from "../_lib/auth.js";

const ALLOWED_KEYS = new Set(["images", "forms", "analytics", "hours", "gallery"]);

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;
  if (!hasDb()) return res.status(503).json({ error: "Admin is not configured yet." });

  if (req.method === "GET") {
    try {
      return res.status(200).json(await getSettings());
    } catch (err) {
      console.error("Settings load failed", err);
      return res.status(500).json({ error: "Could not load settings." });
    }
  }

  if (req.method === "PUT") {
    const body = req.body ?? {};
    const entries = Object.entries(body).filter(([k]) => ALLOWED_KEYS.has(k));
    if (entries.length === 0) {
      return res.status(400).json({ error: "Nothing to save." });
    }
    try {
      for (const [key, value] of entries) {
        await setSetting(key, value);
      }
      return res.status(200).json({ ok: true, saved: entries.map(([k]) => k) });
    } catch (err) {
      console.error("Settings save failed", err);
      return res.status(500).json({ error: "Could not save. Please try again." });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
