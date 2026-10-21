import crypto from "node:crypto";
import { hasDb, getSql, ensureSchema } from "../_lib/db.js";
import { sendMail, adminOrigin } from "../_lib/mailer.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!hasDb()) return res.status(503).json({ error: "Admin is not configured yet." });

  const clean = String(req.body?.email || "").trim().toLowerCase();

  try {
    await ensureSchema();
    const sql = getSql();
    const rows = await sql`select email from admin_users where email = ${clean} limit 1`;

    // Always answer ok so the form can't be used to check which emails have accounts.
    if (rows.length) {
      const token = crypto.randomBytes(32).toString("hex");
      const hash = crypto.createHash("sha256").update(token).digest("hex");
      await sql`update admin_users
        set reset_token = ${hash}, reset_expires = now() + interval '1 hour'
        where email = ${clean}`;
      const link = `${adminOrigin(req)}/admin?reset=${token}`;
      await sendMail({
        to: clean,
        subject: "Reset your Stix admin password",
        text: [
          "Hi,",
          "",
          "We got a request to reset the password for this admin account.",
          "",
          `Reset it here: ${link}`,
          "",
          "The link works for one hour. If you didn't ask for this, you can ignore this email.",
          "",
          "Stix Hellenic Taverna",
        ].join("\n"),
        html: `
          <div style="font-family:Arial,sans-serif;color:#222;max-width:600px">
            <h2 style="color:#1e3a8c;margin-bottom:4px">Reset your password</h2>
            <p style="color:#666;margin-top:0">Stix Hellenic Taverna website admin</p>
            <p>We got a request to reset the password for this account.</p>
            <p><a href="${link}" style="color:#1e3a8c">Click here to choose a new password</a></p>
            <p>The link works for one hour. If you didn't ask for this, you can ignore this email.</p>
          </div>`,
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Forgot password failed", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
