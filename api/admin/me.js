import { readSession } from "../_lib/auth.js";

export default function handler(req, res) {
  const session = readSession(req);
  if (!session) return res.status(401).json({ error: "Not logged in." });
  return res.status(200).json({ email: session.sub });
}
