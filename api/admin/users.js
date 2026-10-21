import crypto from "node:crypto";
import { hasDb, getSql, ensureSchema } from "../_lib/db.js";
import { requireAdmin, hashPassword } from "../_lib/auth.js";
import { sendMail, adminOrigin } from "../_lib/mailer.js";

const esc = (s) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export default async function handler(req, res) {
  const session = requireAdmin(req, res);
  if (!session) return;
  if (!hasDb()) return res.status(503).json({ error: "Admin is not configured yet." });

  try {
    await ensureSchema();
    const sql = getSql();

    if (req.method === "GET") {
      const rows =
        await sql`select id, email, created_at from admin_users order by created_at`;
      return res.status(200).json({ users: rows, you: session.sub });
    }

    if (req.method === "POST") {
      const clean = String(req.body?.email || "").trim().toLowerCase();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(clean)) {
        return res.status(400).json({ error: "Please enter a valid email address." });
      }
      const existing = await sql`select id from admin_users where email = ${clean}`;
      if (existing.length) {
        return res.status(409).json({ error: "That email already has an account." });
      }
      const password = crypto.randomBytes(9).toString("base64url");
      await sql`insert into admin_users (email, password_hash)
        values (${clean}, ${hashPassword(password)})`;

      const loginUrl = `${adminOrigin(req)}/admin`;
      await sendMail({
        to: clean,
        subject: "Your Stix website admin account",
        text: [
          "Hi,",
          "",
          "An admin account has been created for you on the Stix Hellenic Taverna website.",
          "",
          `Log in here: ${loginUrl}`,
          `Email: ${clean}`,
          `Password: ${password}`,
          "",
          "You can change your password after you log in, under Account.",
          "",
          "Stix Hellenic Taverna",
        ].join("\n"),
        html: `
          <div style="font-family:Arial,sans-serif;color:#222;max-width:600px">
            <h2 style="color:#1e3a8c;margin-bottom:4px">Your admin account</h2>
            <p style="color:#666;margin-top:0">Stix Hellenic Taverna website</p>
            <p>An admin account has been created for you. Here are your login details:</p>
            <table style="border-collapse:collapse">
              <tr><td style="padding:8px 16px 8px 0;font-weight:600">Login page</td><td><a href="${esc(loginUrl)}">${esc(loginUrl)}</a></td></tr>
              <tr><td style="padding:8px 16px 8px 0;font-weight:600">Email</td><td>${esc(clean)}</td></tr>
              <tr><td style="padding:8px 16px 8px 0;font-weight:600">Password</td><td>${esc(password)}</td></tr>
            </table>
            <p>You can change your password after you log in, under Account.</p>
          </div>`,
      });
      return res.status(200).json({ ok: true });
    }

    if (req.method === "DELETE") {
      const clean = String(req.body?.email || "").trim().toLowerCase();
      if (!clean) return res.status(400).json({ error: "Email is required." });
      if (clean === session.sub) {
        return res.status(400).json({ error: "You can't remove your own account." });
      }
      const rows = await sql`select id from admin_users`;
      if (rows.length <= 1) {
        return res
          .status(400)
          .json({ error: "There needs to be at least one admin account." });
      }
      await sql`delete from admin_users where email = ${clean}`;
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("Users API failed", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
