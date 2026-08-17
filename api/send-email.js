const RECIPIENT = "stelios@vjbgroup.com.au";
const SENDER = "Stix Hellenic Taverna <stix@vjbgroup.com.au>";

const esc = (s) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body ?? {};
  const { type, name, email, phone, date, guests, message, company } = body;

  // Honeypot: bots fill hidden fields, humans never see this one.
  if (company) {
    return res.status(200).json({ ok: true });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email and message are required." });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(email))) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  const isFunction = type === "function";
  const subject = isFunction
    ? `Function enquiry: ${name}`
    : `Website contact: ${name}`;

  const rows = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone],
    isFunction && ["Event date", date],
    isFunction && ["Guests", guests],
    ["Message", message],
  ]
    .filter(Boolean)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 16px 8px 0;font-weight:600;vertical-align:top;white-space:nowrap">${label}</td><td style="padding:8px 0">${esc(value).replace(/\n/g, "<br>")}</td></tr>`
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;color:#222;max-width:600px">
      <h2 style="color:#1e3a8c;margin-bottom:4px">${isFunction ? "Function enquiry" : "Contact message"}</h2>
      <p style="color:#666;margin-top:0">Sent from the Stix Hellenic Taverna website.</p>
      <table style="border-collapse:collapse">${rows}</table>
    </div>`;

  const text = [
    isFunction ? "Function enquiry" : "Contact message",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    isFunction && date ? `Event date: ${date}` : null,
    isFunction && guests ? `Guests: ${guests}` : null,
    "",
    String(message),
  ]
    .filter((l) => l !== null && l !== false)
    .join("\n");

  try {
    const r = await fetch("https://api.smtp2go.com/v3/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: process.env.SMTP2GO_API_KEY,
        to: [RECIPIENT],
        sender: SENDER,
        reply_to: [String(email)],
        subject,
        html,
        text,
      }),
    });
    const data = await r.json().catch(() => ({}));
    if (r.ok && data?.data?.succeeded > 0) {
      return res.status(200).json({ ok: true });
    }
    console.error("SMTP2Go error", r.status, JSON.stringify(data));
    return res.status(502).json({ error: "The email could not be sent. Please call us instead." });
  } catch (err) {
    console.error("Email send failed", err);
    return res.status(500).json({ error: "The email could not be sent. Please call us instead." });
  }
}
