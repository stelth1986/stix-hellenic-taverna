import { hasDb, getSql } from "../_lib/db.js";
import {
  ensureInitialAdmin,
  checkPassword,
  signToken,
  sessionCookie,
} from "../_lib/auth.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!hasDb()) return res.status(503).json({ error: "Admin is not configured yet." });

  const { email, password } = req.body ?? {};
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    await ensureInitialAdmin();
    const rows = await getSql()`select email, password_hash from admin_users
      where email = ${String(email).toLowerCase()} limit 1`;
    const user = rows[0];
    if (!user || !checkPassword(password, user.password_hash)) {
      return res.status(401).json({ error: "Wrong email or password." });
    }
    res.setHeader("Set-Cookie", sessionCookie(req, signToken({ sub: user.email })));
    return res.status(200).json({ ok: true, email: user.email });
  } catch (err) {
    console.error("Login failed", err);
    return res.status(500).json({ error: "Login failed. Please try again." });
  }
}
