import crypto from "node:crypto";
import { hasDb, getSql, ensureSchema } from "../_lib/db.js";
import { hashPassword } from "../_lib/auth.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!hasDb()) return res.status(503).json({ error: "Admin is not configured yet." });

  const { token, password } = req.body ?? {};
  if (!token || !password || String(password).length < 8) {
    return res
      .status(400)
      .json({ error: "Your new password needs to be at least 8 characters." });
  }

  try {
    await ensureSchema();
    const sql = getSql();
    const hash = crypto.createHash("sha256").update(String(token)).digest("hex");
    const rows = await sql`select email from admin_users
      where reset_token = ${hash} and reset_expires > now() limit 1`;
    const user = rows[0];
    if (!user) {
      return res
        .status(400)
        .json({ error: "That reset link has expired. Please request a new one." });
    }
    await sql`update admin_users
      set password_hash = ${hashPassword(String(password))},
          reset_token = null,
          reset_expires = null
      where email = ${user.email}`;
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Password reset failed", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
