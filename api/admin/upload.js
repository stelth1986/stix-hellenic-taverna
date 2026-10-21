import { put } from "@vercel/blob";
import { requireAdmin } from "../_lib/auth.js";

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return res.status(503).json({ error: "Photo uploads are not configured yet." });
  }

  try {
    const { data } = req.body ?? {};
    if (!data || typeof data !== "string") {
      return res.status(400).json({ error: "No photo received." });
    }
    const buffer = Buffer.from(data, "base64");
    if (!buffer.length || buffer.length > 4 * 1024 * 1024) {
      return res.status(400).json({ error: "That photo is too large." });
    }
    const blob = await put(`stix/${Date.now()}.jpg`, buffer, {
      access: "public",
      contentType: "image/jpeg",
      addRandomSuffix: true,
    });
    return res.status(200).json({ url: blob.url });
  } catch (err) {
    console.error("Upload failed", err);
    return res.status(500).json({ error: "The upload failed. Please try again." });
  }
}
