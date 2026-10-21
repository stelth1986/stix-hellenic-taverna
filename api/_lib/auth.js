import crypto from "node:crypto";
import { ensureSchema, getSql } from "./db.js";

const COOKIE = "stix_admin";
const MAX_AGE = 60 * 60 * 24 * 14; // two weeks

function secret() {
  return process.env.ADMIN_SECRET || process.env.SMTP2GO_API_KEY || "stix-dev-secret";
}

export function signToken(payload) {
  const body = Buffer.from(
    JSON.stringify({ ...payload, exp: Date.now() + MAX_AGE * 1000 })
  ).toString("base64url");
  const sig = crypto.createHmac("sha256", secret()).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function verifyToken(token) {
  if (!token || !token.includes(".")) return null;
  const [body, sig] = token.split(".");
  const expect = crypto.createHmac("sha256", secret()).update(body).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expect);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString());
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function readSession(req) {
  const header = req.headers.cookie || "";
  const m = header.match(new RegExp(`(?:^|;\\s*)${COOKIE}=([^;]+)`));
  return verifyToken(m && m[1]);
}

function isSecure(req) {
  const host = (req.headers.host || "").toLowerCase();
  return !host.includes("localhost") && !host.includes("127.0.0.1");
}

export function sessionCookie(req, token) {
  const parts = [
    `${COOKIE}=${token}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${MAX_AGE}`,
  ];
  if (isSecure(req)) parts.push("Secure");
  return parts.join("; ");
}

export function clearedCookie(req) {
  const parts = [`${COOKIE}=`, "Path=/", "HttpOnly", "SameSite=Lax", "Max-Age=0"];
  if (isSecure(req)) parts.push("Secure");
  return parts.join("; ");
}

export function requireAdmin(req, res) {
  const session = readSession(req);
  if (!session) {
    res.status(401).json({ error: "Not logged in." });
    return null;
  }
  return session;
}

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function checkPassword(password, stored) {
  const parts = String(stored || "").split(":");
  if (parts.length !== 2) return false;
  const [salt, hash] = parts;
  const test = crypto.scryptSync(String(password), salt, 64);
  const expect = Buffer.from(hash, "hex");
  return test.length === expect.length && crypto.timingSafeEqual(test, expect);
}

/** Creates the first admin account from env vars when the table is empty. */
export async function ensureInitialAdmin() {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`select id from admin_users limit 1`;
  if (rows.length > 0) return;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) return;
  await sql`insert into admin_users (email, password_hash)
    values (${String(email).toLowerCase()}, ${hashPassword(password)})`;
}
