import { neon } from "@neondatabase/serverless";

let client = null;
let schemaReady = null;

export function hasDb() {
  return Boolean(process.env.DATABASE_URL || process.env.POSTGRES_URL);
}

export function getSql() {
  if (!client) client = neon(process.env.DATABASE_URL || process.env.POSTGRES_URL);
  return client;
}

export async function ensureSchema() {
  if (!schemaReady) {
    schemaReady = (async () => {
      const sql = getSql();
      await sql`create table if not exists settings (
        key text primary key,
        value jsonb not null,
        updated_at timestamptz default now()
      )`;
      await sql`create table if not exists admin_users (
        id serial primary key,
        email text unique not null,
        password_hash text not null,
        created_at timestamptz default now()
      )`;
      await sql`alter table admin_users add column if not exists reset_token text`;
      await sql`alter table admin_users add column if not exists reset_expires timestamptz`;
    })();
    schemaReady.catch(() => {
      schemaReady = null;
    });
  }
  return schemaReady;
}

export async function getSettings() {
  if (!hasDb()) return {};
  await ensureSchema();
  const rows = await getSql()`select key, value from settings`;
  const out = {};
  for (const r of rows) out[r.key] = r.value;
  return out;
}

export async function setSetting(key, value) {
  await ensureSchema();
  await getSql()`insert into settings (key, value, updated_at)
    values (${key}, ${JSON.stringify(value)}::jsonb, now())
    on conflict (key) do update set value = excluded.value, updated_at = now()`;
}
