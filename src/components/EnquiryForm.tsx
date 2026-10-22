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

export default function EnquiryForm({
  type,
}: {
  type: "contact" | "function" | "christmas";
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const isFunction = type !== "contact";
  const isChristmas = type === "christmas";

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
            : type === "christmas"
              ? "Your Christmas party enquiry is on its way. Our events team will get back to you shortly."
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

      <div className={`grid gap-5 ${isFunction ? "sm:grid-cols-3" : ""}`}>
        <Field label="Phone" required={isFunction}>
          <input
            name="phone"
            type="tel"
            required={isFunction}
            className={inputCls}
            placeholder={
              isFunction ? "Best number to call you on" : "Optional"
            }
          />
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
        {isChristmas && (
          <>
            <Field label="Preferred date" required>
              <input name="date" type="date" required className={inputCls} />
            </Field>
            <Field label="Preferred time" required>
              <select name="preferredTime" required className={inputCls} defaultValue="">
                <option value="" disabled>
                  Select a time
                </option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Either">Either</option>
              </select>
            </Field>
          </>
        )}
      </div>

      {isChristmas && (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Number of guests" required>
            <input
              name="guests"
              type="number"
              min="1"
              required
              className={inputCls}
              placeholder="Approx. number"
            />
          </Field>
          <Field label="Type of function">
            <select name="functionType" className={inputCls} defaultValue="">
              <option value="">Select one</option>
              <option value="Work Christmas party">Work Christmas party</option>
              <option value="End-of-year team lunch">End-of-year team lunch</option>
              <option value="Family gathering">Family gathering</option>
              <option value="Client entertaining">Client entertaining</option>
              <option value="Festive dinner with friends">Festive dinner with friends</option>
              <option value="Other">Other</option>
            </select>
          </Field>
        </div>
      )}

      {isChristmas && (
        <Field label="Dietary requirements">
          <textarea
            name="dietary"
            rows={3}
            className={inputCls}
            placeholder="Allergies, vegetarian, gluten-free or anything else we should cater for"
          />
        </Field>
      )}

      <Field
        label={
          isChristmas
            ? "Anything else we should know?"
            : type === "function"
              ? "Tell us about your event"
              : "Message"
        }
        required={!isChristmas}
      >
        <textarea
          name="message"
          required={!isChristmas}
          rows={5}
          className={inputCls}
          placeholder={
            isChristmas
              ? "Tell us what you are planning, the style of celebration and anything else that would help"
              : type === "function"
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
          : isChristmas
            ? "Send My Christmas Party Enquiry"
            : type === "function"
            ? "Send Enquiry"
            : "Send Message"}
      </button>
    </form>
  );
}
