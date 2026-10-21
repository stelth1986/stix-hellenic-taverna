import crypto from "node:crypto";
import { requireAdmin } from "../_lib/auth.js";

export default function handler(req, res) {
  if (!requireAdmin(req, res)) return;

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    return res.status(503).json({ error: "Photo uploads are not configured yet." });
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "stix";
  const signature = crypto
    .createHash("sha1")
    .update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`)
    .digest("hex");

  return res.status(200).json({ cloudName, apiKey, timestamp, folder, signature });
}
