import { useEffect, useRef, useState } from "react";
import {
  BarChart3,
  Clock,
  ExternalLink,
  Images,
  KeyRound,
  LayoutGrid,
  Loader2,
  Mail,
  Plus,
  Search,
  Trash2,
  Upload,
  UserPlus,
  Users,
} from "lucide-react";
import { IMAGE_SLOTS } from "@/data/images";
import { DEFAULT_GALLERY } from "@/data/gallery";
import { HOURS } from "@/data/site";
import {
  DEFAULT_SEO,
  SEO_PAGES,
  type PageSeo,
  type SeoSettings,
} from "@/data/seo";
import { absPath, type GalleryItem } from "@/lib/config";

type HoursShape = typeof HOURS;

type Settings = {
  images: Record<string, string>;
  forms: { contactTo?: string; functionsTo?: string };
  analytics: { gaId?: string; enabled?: boolean };
  hours: HoursShape | null;
  gallery: GalleryItem[] | null;
  seo: SeoSettings | null;
};

const EMPTY: Settings = {
  images: {},
  forms: {},
  analytics: {},
  hours: null,
  gallery: null,
  seo: null,
};

/* ------------------------------ helpers ------------------------------ */

async function api(path: string, options?: RequestInit) {
  const r = await fetch(path, options);
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.error || "Something went wrong.");
  return data;
}

async function resizeImage(file: File, maxW = 2000, quality = 0.85): Promise<Blob> {
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, maxW / bmp.width);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bmp.width * scale);
  canvas.height = Math.round(bmp.height * scale);
  canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Could not read that image."))),
      "image/jpeg",
      quality
    )
  );
}

async function uploadPhoto(file: File): Promise<string> {
  const blob = await resizeImage(file);
  const base64 = await new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(",")[1]);
    r.onerror = () => reject(new Error("Could not read that file."));
    r.readAsDataURL(blob);
  });
  const data = await api("/api/admin/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: base64 }),
  });
  return data.url as string;
}

/* --------------------------- shared UI bits --------------------------- */

const inputCls =
  "w-full border border-border bg-background px-4 py-2.5 text-sm font-light text-foreground placeholder:text-foreground/40 focus:border-aegean focus:outline-none";
const labelCls =
  "mb-1 block text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/60";

function Section({
  title,
  help,
  children,
}: {
  title: string;
  help?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border border-border bg-card p-6 md:p-8">
      <h2 className="font-display text-2xl font-semibold text-aegean-ink">{title}</h2>
      {help && <p className="mt-2 text-sm font-light text-foreground/60">{help}</p>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

function SaveButton({ busy, label = "Save" }: { busy: boolean; label?: string }) {
  return (
    <button
      type="submit"
      disabled={busy}
      className="bg-aegean px-6 py-3 text-[12px] font-medium uppercase tracking-[0.25em] text-cream transition-colors hover:bg-aegean-deep disabled:opacity-60"
    >
      {busy ? "Saving..." : label}
    </button>
  );
}

function SavedNote({ show }: { show: boolean }) {
  if (!show) return null;
  return <span className="ml-4 text-sm text-aegean">Saved.</span>;
}

function UploadButton({
  onUploaded,
  busy,
  setBusy,
  label = "Replace photo",
}: {
  onUploaded: (url: string) => void;
  busy: boolean;
  setBusy: (b: boolean) => void;
  label?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      onUploaded(await uploadPhoto(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : "The upload failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <span className="inline-flex flex-col gap-1">
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={onPick} />
      <button
        type="button"
        disabled={busy}
        onClick={() => ref.current?.click()}
        className="inline-flex items-center gap-2 border border-aegean px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-aegean transition-colors hover:bg-aegean hover:text-cream disabled:opacity-60"
      >
        {busy ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
        {busy ? "Uploading..." : label}
      </button>
      {error && <span className="text-xs text-terracotta">{error}</span>}
    </span>
  );
}

/* ------------------------------ sections ------------------------------ */

function PhotosSection({
  settings,
  onChange,
}: {
  settings: Settings;
  onChange: (s: Settings) => void;
}) {
  const [busyKey, setBusyKey] = useState("");
  const [savedKey, setSavedKey] = useState("");

  async function save(slot: string, url: string) {
    const images = { ...settings.images, [slot]: url };
    await api("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ images }),
    });
    onChange({ ...settings, images });
    setSavedKey(slot);
    setTimeout(() => setSavedKey(""), 2500);
  }

  return (
    <Section
      title="Photos"
      help="Click a photo to replace it. The new one goes live on the website straight away."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {IMAGE_SLOTS.map((slot) => {
          const current = settings.images[slot.key] || absPath(slot.fallback);
          return (
            <div key={slot.key} className="border border-border bg-background">
              <img
                src={current}
                alt={slot.label}
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="p-4">
                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-gold">
                  {slot.page}
                </p>
                <p className="mt-1 text-sm font-medium text-aegean-ink">{slot.label}</p>
                <div className="mt-3 flex items-center gap-3">
                  <UploadButton
                    busy={busyKey === slot.key}
                    setBusy={(b) => setBusyKey(b ? slot.key : "")}
                    onUploaded={(url) => void save(slot.key, url)}
                  />
                  {savedKey === slot.key && (
                    <span className="text-xs text-aegean">Saved.</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function GallerySection({
  settings,
  onChange,
}: {
  settings: Settings;
  onChange: (s: Settings) => void;
}) {
  const [list, setList] = useState<GalleryItem[]>(
    settings.gallery && settings.gallery.length ? settings.gallery : DEFAULT_GALLERY
  );
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function update(i: number, patch: Partial<GalleryItem>) {
    setList((l) => l.map((it, j) => (j === i ? { ...it, ...patch } : it)));
  }

  async function save(next: GalleryItem[] | null) {
    setBusy(true);
    setError("");
    try {
      await api("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gallery: next }),
      });
      onChange({ ...settings, gallery: next });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Section
      title="Gallery photos"
      help="Replace photos, edit captions, add new ones or remove them. Remember to save."
    >
      <div className="space-y-4">
        {list.map((item, i) => (
          <div key={i} className="flex flex-wrap items-center gap-4 border border-border p-3">
            <img
              src={item.src}
              alt={item.caption}
              className="h-16 w-24 object-cover"
            />
            <input
              value={item.caption}
              onChange={(e) => update(i, { caption: e.target.value })}
              placeholder="Caption"
              className={`${inputCls} min-w-40 flex-1`}
            />
            <UploadButton
              busy={busy}
              setBusy={setBusy}
              onUploaded={(url) => update(i, { src: url })}
            />
            <button
              type="button"
              onClick={() => setList((l) => l.filter((_, j) => j !== i))}
              className="p-2 text-foreground/50 transition-colors hover:text-terracotta"
              aria-label="Remove photo"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <UploadButton
          busy={busy}
          setBusy={setBusy}
          label="Add a photo"
          onUploaded={(url) => setList((l) => [...l, { src: url, caption: "" }])}
        />
        <button
          type="button"
          disabled={busy}
          onClick={() => void save(list)}
          className="bg-aegean px-6 py-2.5 text-[12px] font-medium uppercase tracking-[0.25em] text-cream transition-colors hover:bg-aegean-deep disabled:opacity-60"
        >
          {busy ? "Saving..." : "Save gallery"}
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => {
            setList(DEFAULT_GALLERY);
            void save(null);
          }}
          className="text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/50 underline underline-offset-4 hover:text-terracotta"
        >
          Reset to original
        </button>
        <SavedNote show={saved} />
        {error && <span className="text-sm text-terracotta">{error}</span>}
      </div>
    </Section>
  );
}

function FormsSection({
  settings,
  onChange,
}: {
  settings: Settings;
  onChange: (s: Settings) => void;
}) {
  const [contactTo, setContactTo] = useState(settings.forms.contactTo || "");
  const [functionsTo, setFunctionsTo] = useState(settings.forms.functionsTo || "");
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const forms = {
      contactTo: contactTo.trim() || "stelios@vjbgroup.com.au",
      functionsTo: functionsTo.trim() || "stelios@vjbgroup.com.au",
    };
    try {
      await api("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ forms }),
      });
      onChange({ ...settings, forms });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Section
      title="Where form messages go"
      help="Messages from the website forms are emailed to these addresses."
    >
      <form onSubmit={onSubmit} className="max-w-xl space-y-5">
        <div>
          <label className={labelCls}>Contact form messages go to</label>
          <input
            type="email"
            value={contactTo}
            onChange={(e) => setContactTo(e.target.value)}
            placeholder="stelios@vjbgroup.com.au"
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Function enquiries go to</label>
          <input
            type="email"
            value={functionsTo}
            onChange={(e) => setFunctionsTo(e.target.value)}
            placeholder="stelios@vjbgroup.com.au"
            className={inputCls}
          />
        </div>
        <div className="flex items-center">
          <SaveButton busy={busy} />
          <SavedNote show={saved} />
          {error && <span className="ml-4 text-sm text-terracotta">{error}</span>}
        </div>
      </form>
    </Section>
  );
}

function AnalyticsSection({
  settings,
  onChange,
}: {
  settings: Settings;
  onChange: (s: Settings) => void;
}) {
  const [gaId, setGaId] = useState(settings.analytics.gaId || "");
  const [enabled, setEnabled] = useState(Boolean(settings.analytics.enabled));
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const analytics = { gaId: gaId.trim(), enabled };
    try {
      await api("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ analytics }),
      });
      onChange({ ...settings, analytics });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Section
      title="Google Analytics"
      help="Paste your GA4 Measurement ID (looks like G-XXXXXXX). You find it in Google Analytics under Admin, then Data Streams. Tracking starts as soon as you save."
    >
      <form onSubmit={onSubmit} className="max-w-xl space-y-5">
        <div>
          <label className={labelCls}>Measurement ID</label>
          <input
            value={gaId}
            onChange={(e) => setGaId(e.target.value)}
            placeholder="G-XXXXXXX"
            className={inputCls}
          />
        </div>
        <label className="flex items-center gap-3 text-sm font-light text-foreground/75">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            className="h-4 w-4 accent-aegean"
          />
          Turn on Google Analytics tracking
        </label>
        <div className="flex items-center">
          <SaveButton busy={busy} />
          <SavedNote show={saved} />
          {error && <span className="ml-4 text-sm text-terracotta">{error}</span>}
        </div>
      </form>
    </Section>
  );
}

function HoursRows({
  rows,
  onChange,
}: {
  rows: { days: string; time: string }[];
  onChange: (rows: { days: string; time: string }[]) => void;
}) {
  return (
    <div className="space-y-3">
      {rows.map((row, i) => (
        <div key={i} className="flex flex-wrap items-center gap-3">
          <input
            value={row.days}
            onChange={(e) =>
              onChange(rows.map((r, j) => (j === i ? { ...r, days: e.target.value } : r)))
            }
            placeholder="Monday to Friday"
            className={`${inputCls} flex-1`}
          />
          <input
            value={row.time}
            onChange={(e) =>
              onChange(rows.map((r, j) => (j === i ? { ...r, time: e.target.value } : r)))
            }
            placeholder="12pm to 10pm"
            className={`${inputCls} flex-1`}
          />
          {rows.length > 1 && (
            <button
              type="button"
              onClick={() => onChange(rows.filter((_, j) => j !== i))}
              className="p-2 text-foreground/50 hover:text-terracotta"
              aria-label="Remove row"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...rows, { days: "", time: "" }])}
        className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-aegean hover:text-gold"
      >
        <Plus size={14} /> Add a row
      </button>
    </div>
  );
}

function HoursSection({
  settings,
  onChange,
}: {
  settings: Settings;
  onChange: (s: Settings) => void;
}) {
  const current = settings.hours || HOURS;
  const [kitchen, setKitchen] = useState(current.kitchen);
  const [hotel, setHotel] = useState(current.hotel);
  const [lunch, setLunch] = useState(current.lunchMenu);
  const [dinner, setDinner] = useState(current.dinnerMenu);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  async function save(hours: HoursShape | null) {
    setBusy(true);
    setError("");
    try {
      await api("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hours }),
      });
      onChange({ ...settings, hours });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Section
      title="Opening hours"
      help="These show on the Location page and in the footer of every page."
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void save({
            kitchen: kitchen.filter((r) => r.days && r.time),
            hotel: hotel.filter((r) => r.days && r.time),
            lunchMenu: lunch,
            dinnerMenu: dinner,
          });
        }}
        className="space-y-8"
      >
        <div>
          <p className={labelCls}>Kitchen</p>
          <HoursRows rows={kitchen} onChange={setKitchen} />
        </div>
        <div>
          <p className={labelCls}>Hotel bar</p>
          <HoursRows rows={hotel} onChange={setHotel} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <p className={labelCls}>Lunch menu: days</p>
            <input
              value={lunch.days}
              onChange={(e) => setLunch({ ...lunch, days: e.target.value })}
              className={inputCls}
            />
            <p className={`${labelCls} mt-3`}>Lunch menu: time</p>
            <input
              value={lunch.time}
              onChange={(e) => setLunch({ ...lunch, time: e.target.value })}
              className={inputCls}
            />
          </div>
          <div>
            <p className={labelCls}>Dinner menu: days</p>
            <input
              value={dinner.days}
              onChange={(e) => setDinner({ ...dinner, days: e.target.value })}
              className={inputCls}
            />
            <p className={`${labelCls} mt-3`}>Dinner menu: time</p>
            <input
              value={dinner.time}
              onChange={(e) => setDinner({ ...dinner, time: e.target.value })}
              className={inputCls}
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <SaveButton busy={busy} />
          <button
            type="button"
            disabled={busy}
            onClick={() => {
              setKitchen(HOURS.kitchen);
              setHotel(HOURS.hotel);
              setLunch(HOURS.lunchMenu);
              setDinner(HOURS.dinnerMenu);
              void save(null);
            }}
            className="text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/50 underline underline-offset-4 hover:text-terracotta"
          >
            Reset to original
          </button>
          <SavedNote show={saved} />
          {error && <span className="text-sm text-terracotta">{error}</span>}
        </div>
      </form>
    </Section>
  );
}

function AccountSection({ email }: { email: string }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api("/api/admin/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ current, next }),
      });
      setCurrent("");
      setNext("");
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Section title="Account" help={`You are logged in as ${email}.`}>
      <form onSubmit={onSubmit} className="max-w-xl space-y-5">
        <div>
          <label className={labelCls}>Current password</label>
          <input
            type="password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            required
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>New password (8+ characters)</label>
          <input
            type="password"
            value={next}
            onChange={(e) => setNext(e.target.value)}
            required
            minLength={8}
            className={inputCls}
          />
        </div>
        <div className="flex items-center">
          <SaveButton busy={busy} label="Change password" />
          <SavedNote show={saved} />
          {error && <span className="ml-4 text-sm text-terracotta">{error}</span>}
        </div>
      </form>
    </Section>
  );
}

function SeoSection({
  settings,
  onChange,
}: {
  settings: Settings;
  onChange: (s: Settings) => void;
}) {
  const [pages, setPages] = useState<Record<string, Partial<PageSeo>>>(
    settings.seo?.pages || {}
  );
  const [defaultOgImage, setDefaultOgImage] = useState(
    settings.seo?.defaultOgImage || ""
  );
  const [googleVerify, setGoogleVerify] = useState(
    settings.seo?.googleVerify || ""
  );
  const [bingVerify, setBingVerify] = useState(settings.seo?.bingVerify || "");
  const [openPage, setOpenPage] = useState<string>("home");
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function updatePage(key: string, patch: Partial<PageSeo>) {
    setPages((p) => ({ ...p, [key]: { ...p[key], ...patch } }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const seo: SeoSettings = {
      pages,
      defaultOgImage: defaultOgImage || undefined,
      googleVerify: googleVerify.trim() || undefined,
      bingVerify: bingVerify.trim() || undefined,
    };
    try {
      await api("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seo }),
      });
      onChange({ ...settings, seo });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setBusy(false);
    }
  }

  const current = pages[openPage] || {};
  const def = DEFAULT_SEO[openPage];
  const pageMeta = SEO_PAGES.find((p) => p.key === openPage)!;
  const titleVal = current.title ?? def.title;
  const descVal = current.description ?? def.description;

  return (
    <Section
      title="SEO"
      help="Controls what shows in Google results and when a page is shared on Facebook or messaged to someone. Leave a field on the suggested text if you don't want to change it."
    >
      <form onSubmit={onSubmit} className="space-y-10">
        {/* Site-wide */}
        <div className="max-w-xl space-y-5">
          <p className={labelCls}>Site verification</p>
          <div>
            <label className={labelCls}>Google Search Console code</label>
            <input
              value={googleVerify}
              onChange={(e) => setGoogleVerify(e.target.value)}
              placeholder="Paste just the code, not the whole tag"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Bing verification code</label>
            <input
              value={bingVerify}
              onChange={(e) => setBingVerify(e.target.value)}
              placeholder="Optional"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Default share image</label>
            <p className="mb-2 text-xs font-light text-foreground/60">
              Used when a page doesn't have its own. This is the image people
              see when a link is shared.
            </p>
            <div className="flex items-center gap-4">
              <img
                src={defaultOgImage || "/images/hero-flatlay.jpg"}
                alt="Default share image"
                className="h-20 w-32 border border-border object-cover"
              />
              <UploadButton
                busy={busy}
                setBusy={setBusy}
                onUploaded={(url) => setDefaultOgImage(url)}
              />
              {defaultOgImage && (
                <button
                  type="button"
                  onClick={() => setDefaultOgImage("")}
                  className="text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/50 underline underline-offset-4 hover:text-terracotta"
                >
                  Use original
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Per page */}
        <div>
          <p className={labelCls}>Pages</p>
          <div className="mb-6 flex flex-wrap gap-2">
            {SEO_PAGES.map((p) => (
              <button
                key={p.key}
                type="button"
                onClick={() => setOpenPage(p.key)}
                className={`border px-4 py-2 text-[11px] font-medium uppercase tracking-[0.15em] transition-colors ${
                  openPage === p.key
                    ? "border-aegean bg-aegean text-cream"
                    : "border-border bg-background text-foreground/60 hover:text-aegean"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="max-w-2xl space-y-5">
            <div>
              <label className={labelCls}>
                Google title for {pageMeta.label}
                <span
                  className={`ml-3 normal-case tracking-normal ${
                    titleVal.length > 60 ? "text-terracotta" : "text-foreground/40"
                  }`}
                >
                  {titleVal.length}/60
                </span>
              </label>
              <input
                value={titleVal}
                onChange={(e) => updatePage(openPage, { title: e.target.value })}
                className={inputCls}
              />
              <p className="mt-1 text-xs font-light text-foreground/50">
                Google shows about the first 60 characters.
              </p>
            </div>
            <div>
              <label className={labelCls}>
                Google description
                <span
                  className={`ml-3 normal-case tracking-normal ${
                    descVal.length > 160 ? "text-terracotta" : "text-foreground/40"
                  }`}
                >
                  {descVal.length}/160
                </span>
              </label>
              <textarea
                value={descVal}
                rows={3}
                onChange={(e) =>
                  updatePage(openPage, { description: e.target.value })
                }
                className={inputCls}
              />
              <p className="mt-1 text-xs font-light text-foreground/50">
                The line or two under the title in search results. Aim for
                under 160 characters.
              </p>
            </div>
            <div>
              <label className={labelCls}>Share image for this page</label>
              <div className="flex items-center gap-4">
                {(current.ogImage || "") && (
                  <img
                    src={current.ogImage}
                    alt=""
                    className="h-20 w-32 border border-border object-cover"
                  />
                )}
                <UploadButton
                  busy={busy}
                  setBusy={setBusy}
                  label={current.ogImage ? "Replace photo" : "Set a photo"}
                  onUploaded={(url) => updatePage(openPage, { ogImage: url })}
                />
                {current.ogImage && (
                  <button
                    type="button"
                    onClick={() => updatePage(openPage, { ogImage: undefined })}
                    className="text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/50 underline underline-offset-4 hover:text-terracotta"
                  >
                    Use default
                  </button>
                )}
              </div>
            </div>
            <label className="flex items-center gap-3 text-sm font-light text-foreground/75">
              <input
                type="checkbox"
                checked={Boolean(current.noindex)}
                onChange={(e) =>
                  updatePage(openPage, { noindex: e.target.checked || undefined })
                }
                className="h-4 w-4 accent-aegean"
              />
              Hide this page from Google
            </label>
          </div>
        </div>

        <div className="flex items-center">
          <SaveButton busy={busy} />
          <SavedNote show={saved} />
          {error && <span className="ml-4 text-sm text-terracotta">{error}</span>}
        </div>
      </form>
    </Section>
  );
}

function UsersSection({ you }: { you: string }) {
  const [users, setUsers] = useState<
    { id: number; email: string; created_at: string }[] | null
  >(null);
  const [newEmail, setNewEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [note, setNote] = useState("");

  async function load() {
    try {
      const d = await api("/api/admin/users");
      setUsers(d.users);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load accounts.");
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function addUser(e: React.FormEvent) {
    e.preventDefault();
    const email = newEmail.trim().toLowerCase();
    setBusy(true);
    setError("");
    setNote("");
    try {
      await api("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setNewEmail("");
      setNote(`Account created. We've emailed ${email} their login details.`);
      void load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create the account.");
    } finally {
      setBusy(false);
    }
  }

  async function removeUser(email: string) {
    if (!window.confirm(`Remove the admin account for ${email}?`)) return;
    setBusy(true);
    setError("");
    setNote("");
    try {
      await api("/api/admin/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setNote(`Removed ${email}.`);
      void load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not remove the account.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Section
      title="Admin accounts"
      help="Everyone listed here can log in and change the website. When you add someone, they get an email with the login page and a password."
    >
      <form onSubmit={addUser} className="max-w-xl">
        <label className={labelCls}>Add an admin</label>
        <div className="flex flex-wrap items-stretch gap-3">
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="their@email.com"
            required
            className={`${inputCls} flex-1`}
          />
          <button
            type="submit"
            disabled={busy}
            className="inline-flex items-center gap-2 bg-aegean px-6 py-3 text-[12px] font-medium uppercase tracking-[0.25em] text-cream transition-colors hover:bg-aegean-deep disabled:opacity-60"
          >
            {busy ? <Loader2 size={14} className="animate-spin" /> : <UserPlus size={14} />}
            Create account
          </button>
        </div>
      </form>

      <div className="mt-8 max-w-xl">
        <p className={labelCls}>Current admins</p>
        {!users && (
          <p className="flex items-center gap-3 text-sm text-foreground/60">
            <Loader2 size={14} className="animate-spin" /> Loading...
          </p>
        )}
        {users && (
          <ul className="divide-y divide-border border border-border bg-background">
            {users.map((u) => (
              <li key={u.id} className="flex items-center justify-between gap-4 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-aegean-ink">
                    {u.email}
                    {u.email === you && (
                      <span className="ml-2 text-[10px] font-medium uppercase tracking-[0.2em] text-gold">
                        You
                      </span>
                    )}
                  </p>
                  <p className="text-xs font-light text-foreground/50">
                    Added {new Date(u.created_at).toLocaleDateString("en-AU", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                {u.email !== you && (
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void removeUser(u.email)}
                    className="p-2 text-foreground/50 transition-colors hover:text-terracotta"
                    aria-label={`Remove ${u.email}`}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
        {note && <p className="mt-3 text-sm text-aegean">{note}</p>}
        {error && <p className="mt-3 text-sm text-terracotta">{error}</p>}
      </div>
    </Section>
  );
}

/* ------------------------------ dashboard ------------------------------ */

const SECTIONS = [
  { id: "photos", label: "Photos", icon: Images },
  { id: "gallery", label: "Gallery", icon: LayoutGrid },
  { id: "forms", label: "Form emails", icon: Mail },
  { id: "analytics", label: "Google Analytics", icon: BarChart3 },
  { id: "seo", label: "SEO", icon: Search },
  { id: "hours", label: "Opening hours", icon: Clock },
  { id: "users", label: "Admin accounts", icon: Users },
  { id: "account", label: "Account", icon: KeyRound },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

function Dashboard({ email, onLogout }: { email: string; onLogout: () => void }) {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loadError, setLoadError] = useState("");
  const [section, setSection] = useState<SectionId>("photos");

  useEffect(() => {
    api("/api/admin/settings")
      .then((d) => setSettings({ ...EMPTY, ...d }))
      .catch((err) => setLoadError(err.message));
  }, []);

  return (
    <div className="min-h-screen bg-secondary/40">
      <header className="border-b border-border bg-cream">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <img src="/images/stix-logo.png" alt="Stix" className="h-9 w-auto" />
            <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-foreground/60">
              Website admin
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-aegean hover:text-gold"
            >
              View site <ExternalLink size={12} />
            </a>
            <button
              onClick={onLogout}
              className="text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/60 hover:text-terracotta"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10">
        {loadError && (
          <p className="mb-6 border border-terracotta/40 bg-terracotta/10 px-4 py-3 text-sm text-terracotta">
            {loadError}
          </p>
        )}
        {!settings && !loadError && (
          <p className="flex items-center gap-3 text-sm text-foreground/60">
            <Loader2 size={16} className="animate-spin" /> Loading settings...
          </p>
        )}
        {settings && (
          <div className="md:flex md:items-start md:gap-10">
            {/* Mobile: horizontal section picker */}
            <nav className="mb-6 flex gap-2 overflow-x-auto pb-1 md:hidden">
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSection(s.id)}
                  className={`flex shrink-0 items-center gap-2 border px-4 py-2 text-[11px] font-medium uppercase tracking-[0.15em] transition-colors ${
                    section === s.id
                      ? "border-aegean bg-aegean text-cream"
                      : "border-border bg-card text-foreground/60 hover:text-aegean"
                  }`}
                >
                  <s.icon size={14} /> {s.label}
                </button>
              ))}
            </nav>

            {/* Desktop: sticky sidebar */}
            <aside className="hidden w-52 shrink-0 md:block">
              <nav className="sticky top-10 space-y-1">
                {SECTIONS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSection(s.id)}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left text-[12px] font-medium uppercase tracking-[0.15em] transition-colors ${
                      section === s.id
                        ? "bg-aegean text-cream"
                        : "text-foreground/60 hover:bg-secondary hover:text-aegean"
                    }`}
                  >
                    <s.icon size={15} /> {s.label}
                  </button>
                ))}
              </nav>
            </aside>

            <div className="min-w-0 flex-1">
              {section === "photos" && (
                <PhotosSection settings={settings} onChange={setSettings} />
              )}
              {section === "gallery" && (
                <GallerySection settings={settings} onChange={setSettings} />
              )}
              {section === "forms" && (
                <FormsSection settings={settings} onChange={setSettings} />
              )}
              {section === "analytics" && (
                <AnalyticsSection settings={settings} onChange={setSettings} />
              )}
              {section === "seo" && (
                <SeoSection settings={settings} onChange={setSettings} />
              )}
              {section === "hours" && (
                <HoursSection settings={settings} onChange={setSettings} />
              )}
              {section === "users" && <UsersSection you={email} />}
              {section === "account" && <AccountSection email={email} />}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

/* -------------------------------- login -------------------------------- */

function Login({ onSuccess }: { onSuccess: (email: string) => void }) {
  const [mode, setMode] = useState<"login" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const d = await api("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      onSuccess(d.email);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setBusy(false);
    }
  }

  async function onForgot(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api("/api/admin/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setForgotSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/40 px-5">
      {mode === "forgot" ? (
        <form
          onSubmit={onForgot}
          className="w-full max-w-sm border border-border bg-card p-8 shadow-[0_12px_40px_rgba(16,31,69,0.12)]"
        >
          <img src="/images/stix-logo.png" alt="Stix Hellenic Taverna" className="mx-auto h-14 w-auto" />
          <h1 className="mt-6 text-center font-display text-2xl font-semibold text-aegean-ink">
            Reset your password
          </h1>
          {forgotSent ? (
            <div className="mt-6 space-y-5">
              <p className="text-sm font-light leading-relaxed text-foreground/70">
                If that email has an account, we've sent a link to reset the
                password. The link works for one hour.
              </p>
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setForgotSent(false);
                }}
                className="w-full border border-aegean px-6 py-3 text-[12px] font-medium uppercase tracking-[0.25em] text-aegean transition-colors hover:bg-aegean hover:text-cream"
              >
                Back to login
              </button>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              <p className="text-sm font-light leading-relaxed text-foreground/70">
                Enter your email and we'll send you a link to choose a new
                password.
              </p>
              <div>
                <label className={labelCls}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="username"
                  className={inputCls}
                />
              </div>
              {error && <p className="text-sm text-terracotta">{error}</p>}
              <button
                type="submit"
                disabled={busy}
                className="w-full bg-aegean px-6 py-3.5 text-[12px] font-medium uppercase tracking-[0.25em] text-cream transition-colors hover:bg-aegean-deep disabled:opacity-60"
              >
                {busy ? "Sending..." : "Send reset link"}
              </button>
              <button
                type="button"
                onClick={() => setMode("login")}
                className="w-full text-center text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/50 underline underline-offset-4 hover:text-aegean"
              >
                Back to login
              </button>
            </div>
          )}
        </form>
      ) : (
        <form
          onSubmit={onSubmit}
          className="w-full max-w-sm border border-border bg-card p-8 shadow-[0_12px_40px_rgba(16,31,69,0.12)]"
        >
          <img src="/images/stix-logo.png" alt="Stix Hellenic Taverna" className="mx-auto h-14 w-auto" />
          <h1 className="mt-6 text-center font-display text-2xl font-semibold text-aegean-ink">
            Website admin
          </h1>
          <div className="mt-6 space-y-4">
            <div>
              <label className={labelCls}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className={inputCls}
              />
            </div>
            {error && <p className="text-sm text-terracotta">{error}</p>}
            <button
              type="submit"
              disabled={busy}
              className="w-full bg-aegean px-6 py-3.5 text-[12px] font-medium uppercase tracking-[0.25em] text-cream transition-colors hover:bg-aegean-deep disabled:opacity-60"
            >
              {busy ? "Logging in..." : "Log in"}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("forgot");
                setError("");
              }}
              className="w-full text-center text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/50 underline underline-offset-4 hover:text-aegean"
            >
              Forgot your password?
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function ResetPassword({ token }: { token: string }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setError("The passwords don't match.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      await api("/api/admin/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/40 px-5">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm border border-border bg-card p-8 shadow-[0_12px_40px_rgba(16,31,69,0.12)]"
      >
        <img src="/images/stix-logo.png" alt="Stix Hellenic Taverna" className="mx-auto h-14 w-auto" />
        <h1 className="mt-6 text-center font-display text-2xl font-semibold text-aegean-ink">
          Choose a new password
        </h1>
        {done ? (
          <div className="mt-6 space-y-5">
            <p className="text-sm font-light leading-relaxed text-foreground/70">
              Your password has been updated. You can log in with it now.
            </p>
            <a
              href="/admin"
              className="block w-full bg-aegean px-6 py-3.5 text-center text-[12px] font-medium uppercase tracking-[0.25em] text-cream transition-colors hover:bg-aegean-deep"
            >
              Go to login
            </a>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            <div>
              <label className={labelCls}>New password (8+ characters)</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Type it again</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
                className={inputCls}
              />
            </div>
            {error && <p className="text-sm text-terracotta">{error}</p>}
            <button
              type="submit"
              disabled={busy}
              className="w-full bg-aegean px-6 py-3.5 text-[12px] font-medium uppercase tracking-[0.25em] text-cream transition-colors hover:bg-aegean-deep disabled:opacity-60"
            >
              {busy ? "Saving..." : "Save new password"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

/* --------------------------------- page --------------------------------- */

export default function AdminPage() {
  const [resetToken] = useState(() =>
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("reset")
      : null
  );
  const [state, setState] = useState<
    { status: "checking" } | { status: "out" } | { status: "in"; email: string }
  >({ status: "checking" });

  useEffect(() => {
    if (resetToken) return;
    fetch("/api/admin/me")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setState({ status: "in", email: d.email }))
      .catch(() => setState({ status: "out" }));
  }, [resetToken]);

  if (resetToken) {
    return <ResetPassword token={resetToken} />;
  }

  if (state.status === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary/40">
        <Loader2 size={22} className="animate-spin text-aegean" />
      </div>
    );
  }

  if (state.status === "out") {
    return <Login onSuccess={(email) => setState({ status: "in", email })} />;
  }

  return (
    <Dashboard
      email={state.email}
      onLogout={() => {
        void api("/api/admin/logout", { method: "POST" }).finally(() =>
          setState({ status: "out" })
        );
      }}
    />
  );
}
