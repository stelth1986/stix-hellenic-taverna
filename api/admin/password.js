import { hasDb, getSql, ensureSchema } from "../_lib/db.js";
import { requireAdmin, checkPassword, hashPassword } from "../_lib/auth.js";

export default async function handler(req, res) {
  const session = requireAdmin(req, res);
  if (!session) return;
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!hasDb()) return res.status(503).json({ error: "Admin is not configured yet." });

  const { current, next } = req.body ?? {};
  if (!current || !next || String(next).length < 8) {
    return res
      .status(400)
      .json({ error: "New password needs to be at least 8 characters." });
  }

  try {
    await ensureSchema();
    const sql = getSql();
    const rows = await sql`select password_hash from admin_users
      where email = ${session.sub} limit 1`;
    const user = rows[0];
    if (!user || !checkPassword(current, user.password_hash)) {
      return res.status(401).json({ error: "Current password is wrong." });
    }
    await sql`update admin_users set password_hash = ${hashPassword(String(next))}
      where email = ${session.sub}`;
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Password change failed", err);
    return res.status(500).json({ error: "Could not change password. Please try again." });
  }
}
