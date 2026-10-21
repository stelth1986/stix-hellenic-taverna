const SENDER = "Stix Hellenic Taverna <stix@vjbgroup.com.au>";

export async function sendMail({ to, subject, html, text }) {
  const r = await fetch("https://api.smtp2go.com/v3/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: process.env.SMTP2GO_API_KEY,
      to: [to],
      sender: SENDER,
      subject,
      html_body: html,
      text_body: text,
    }),
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok || !(data?.data?.succeeded > 0)) {
    console.error("SMTP2Go error", r.status, JSON.stringify(data));
    throw new Error("The email could not be sent.");
  }
}

export function adminOrigin(req) {
  const proto = req.headers["x-forwarded-proto"] || "https";
  return `${proto}://${req.headers.host}`;
}
