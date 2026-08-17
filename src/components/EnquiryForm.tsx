import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const inputCls =
  "w-full border border-border bg-background px-4 py-3 text-sm font-light text-foreground placeholder:text-foreground/40 focus:border-aegean focus:outline-none";

const labelCls =
  "mb-1.5 block text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/60";

function Field({
  label,
  children,
  required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div>
      <label className={labelCls}>
        {label} {required && <span className="text-terracotta">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function EnquiryForm({ type }: { type: "contact" | "function" }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const r = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, ...data }),
      });
      const json = await r.json().catch(() => ({}));
      if (r.ok && json.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setErrorMsg(json.error || "Something went wrong. Please call us instead.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Something went wrong. Please call us instead.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="border border-gold/40 bg-card p-10 text-center">
        <p className="font-display text-3xl font-semibold text-aegean-ink">
          Thanks, we got it.
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm font-light leading-relaxed text-foreground/70">
          {type === "function"
            ? "Your enquiry is on its way. Our events team will get back to you shortly."
            : "Your message is on its way. We will get back to you shortly."}
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-[11px] font-medium uppercase tracking-[0.25em] text-aegean underline underline-offset-4 hover:text-gold"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Honeypot: hidden from humans, catches bots */}
      <div className="absolute -left-[9999px] -top-[9999px]" aria-hidden="true">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" required>
          <input name="name" required className={inputCls} placeholder="Your name" />
        </Field>
        <Field label="Email" required>
          <input
            name="email"
            type="email"
            required
            className={inputCls}
            placeholder="you@email.com"
          />
        </Field>
      </div>

      <div className={`grid gap-5 ${type === "function" ? "sm:grid-cols-3" : ""}`}>
        <Field label="Phone">
          <input name="phone" type="tel" className={inputCls} placeholder="Optional" />
        </Field>
        {type === "function" && (
          <>
            <Field label="Event date">
              <input name="date" type="date" className={inputCls} />
            </Field>
            <Field label="Guests">
              <input
                name="guests"
                type="number"
                min="1"
                className={inputCls}
                placeholder="Approx. number"
              />
            </Field>
          </>
        )}
      </div>

      <Field label={type === "function" ? "Tell us about your event" : "Message"} required>
        <textarea
          name="message"
          required
          rows={5}
          className={inputCls}
          placeholder={
            type === "function"
              ? "What are you celebrating, and roughly how many people?"
              : "How can we help?"
          }
        />
      </Field>

      {status === "error" && (
        <p className="border border-terracotta/40 bg-terracotta/10 px-4 py-3 text-sm text-terracotta">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-aegean px-6 py-4 text-[12px] font-medium uppercase tracking-[0.25em] text-cream transition-colors hover:bg-aegean-deep disabled:opacity-60 sm:w-auto"
      >
        {status === "sending"
          ? "Sending..."
          : type === "function"
            ? "Send Enquiry"
            : "Send Message"}
      </button>
    </form>
  );
}
