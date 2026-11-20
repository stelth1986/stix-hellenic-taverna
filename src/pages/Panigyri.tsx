import { useEffect } from "react";
import { CalendarDays, CalendarPlus, Clock3, MapPin, Phone, Ticket } from "lucide-react";
import { SITE } from "@/data/site";
import { PANIGYRI } from "@/data/panigyri";

const XMAS_RED = "#9f2d2d";

const DETAILS = [
  { icon: CalendarDays, label: "When", value: PANIGYRI.dateLong },
  { icon: Clock3, label: "Time", value: PANIGYRI.time },
  { icon: Ticket, label: "Entry", value: "Free, everyone welcome" },
  { icon: MapPin, label: "Where", value: "Riverview Hotel, Tempe" },
];

/** Event structured data so Google can show the date and venue in search. */
function useEventSchema() {
  useEffect(() => {
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Christmas Panigyri at Stix Hellenic Taverna",
      description:
        "A Greek village Christmas at the Riverview Hotel, Tempe. Spits all day, live bouzouki, Santa and his elves. Free entry.",
      startDate: PANIGYRI.startIso,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      isAccessibleForFree: true,
      image: [`${window.location.origin}/images/panigyri-flyer.jpg`],
      location: {
        "@type": "Place",
        name: "Riverview Hotel",
        address: {
          "@type": "PostalAddress",
          streetAddress: "900 Princes Hwy",
          addressLocality: "Tempe",
          addressRegion: "NSW",
          postalCode: "2044",
          addressCountry: "AU",
        },
      },
      organizer: {
        "@type": "Organization",
        name: "Stix Hellenic Taverna",
        url: "https://www.stixtaverna.com.au/",
      },
    });
    document.head.appendChild(el);
    return () => el.remove();
  }, []);
}

export default function PanigyriPage() {
  useEventSchema();

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[84vh] items-center overflow-hidden bg-aegean-ink text-cream">
        <img
          src="./images/greek-flag-wall.jpg"
          alt="A full house at Stix Hellenic Taverna"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-aegean-ink/80 via-aegean-ink/70 to-aegean-ink/95" />
        <div className="absolute inset-x-0 top-0 h-2" style={{ backgroundColor: XMAS_RED }} />
        <div className="relative mx-auto max-w-5xl px-5 py-24 text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold-light">
            Riverview Hotel <span className="mx-1 text-cream/40">|</span> Stix Hellenic Taverna
          </p>
          <h1 className="mt-6 font-display text-6xl font-semibold leading-[0.95] md:text-8xl">
            Christmas
            <span className="block text-gold-light">Panigyri</span>
          </h1>
          <span className="key-divider mt-8 bg-gold-light" />
          <p className="mx-auto mt-8 max-w-2xl text-balance font-display text-2xl italic text-cream/90 md:text-3xl">
            {PANIGYRI.tagline}.
          </p>
          <p className="mt-8 text-[13px] font-medium uppercase tracking-[0.26em] text-cream md:text-sm">
            {PANIGYRI.dateLong}
            <span className="mx-2 text-gold-light">·</span>
            {PANIGYRI.time}
            <span className="mx-2 text-gold-light">·</span>
            {PANIGYRI.entry}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={SITE.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-[12px] font-medium uppercase tracking-[0.25em] text-cream transition-opacity hover:opacity-90"
              style={{ backgroundColor: XMAS_RED }}
            >
              Book a Table
            </a>
            <a
              href={PANIGYRI.calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-cream/60 px-6 py-3 text-[12px] font-medium uppercase tracking-[0.25em] text-cream transition-colors hover:border-cream hover:bg-cream hover:text-aegean-ink"
            >
              <CalendarPlus size={14} /> Add to Calendar
            </a>
          </div>
        </div>
      </section>

      {/* Details strip */}
      <section className="border-b border-border bg-cream">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-border lg:grid-cols-4">
          {DETAILS.map((d) => (
            <div key={d.label} className="bg-cream px-5 py-8 text-center">
              <d.icon size={22} className="mx-auto text-gold" strokeWidth={1.5} />
              <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.28em] text-foreground/55">
                {d.label}
              </p>
              <p className="mt-1 font-display text-xl font-semibold text-aegean-ink md:text-2xl">
                {d.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Intro + flyer */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="font-display text-4xl font-semibold leading-tight text-aegean-ink md:text-5xl">
              The whole village is invited.
            </h2>
            <p className="mt-6 text-base font-light leading-relaxed text-foreground/75 md:text-lg">
              In Greece, a panigyri is the village festival. Everyone turns up,
              the spits turn all day, the music starts and nobody is in a hurry
              to go home. This December we’re bringing one to Tempe, with a
              Christmas twist.
            </p>
            <p className="mt-4 text-base font-light leading-relaxed text-foreground/75 md:text-lg">
              Join us at the Riverview Hotel on {PANIGYRI.dateLong} from 12pm.
              Come for lunch and stay for the bouzouki, or wander in later with
              the family. Entry is free, so bring your parea.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={SITE.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-aegean px-6 py-3 text-[12px] font-medium uppercase tracking-[0.25em] text-cream transition-colors hover:bg-aegean-deep"
              >
                Book a Table
              </a>
              <a
                href={SITE.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-aegean/40 px-6 py-3 text-[12px] font-medium uppercase tracking-[0.25em] text-aegean transition-colors hover:border-aegean hover:bg-aegean hover:text-cream"
              >
                <MapPin size={14} /> Get Directions
              </a>
            </div>
          </div>
          <div className="mx-auto w-full max-w-md">
            <img
              src={PANIGYRI.flyer}
              alt="Christmas Panigyri flyer: Sunday 13 December, 12pm til late, spits all day, live bouzouki, Santa and his elves, free entry, Riverview Hotel Tempe"
              loading="lazy"
              className="w-full shadow-[0_12px_40px_rgba(16,31,69,0.18)]"
            />
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-secondary/60 py-20">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-4xl font-semibold text-aegean-ink md:text-5xl">
              What’s on, all day.
            </h2>
            <span className="key-divider mt-6" />
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {PANIGYRI.highlights.map((h) => (
              <div key={h.title} className="bg-card shadow-[0_1px_3px_rgba(16,31,69,0.08)]">
                <img
                  src={h.image}
                  alt={h.alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="p-7">
                  <h3 className="font-display text-2xl font-semibold text-aegean-ink">
                    {h.title}
                  </h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-foreground/70">
                    {h.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing call to action */}
      <section className="bg-aegean-ink py-20 text-cream">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <p
            className="inline-block px-5 py-2 text-[12px] font-medium uppercase tracking-[0.3em] text-aegean-ink"
            style={{ backgroundColor: "#d4b478" }}
          >
            {PANIGYRI.entry}
          </p>
          <h2 className="mt-8 text-balance font-display text-4xl font-semibold leading-tight md:text-6xl">
            {PANIGYRI.dateLong}, {PANIGYRI.time}.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-cream/80 md:text-lg">
            {SITE.address}. Entry is free. If you’d like a table for lunch or
            dinner on the day, book ahead or give us a call.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={SITE.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 text-[12px] font-medium uppercase tracking-[0.25em] text-cream transition-opacity hover:opacity-90"
              style={{ backgroundColor: XMAS_RED }}
            >
              Book a Table
            </a>
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center justify-center gap-2 border border-cream/60 px-6 py-3 text-[12px] font-medium uppercase tracking-[0.25em] text-cream transition-colors hover:border-cream hover:bg-cream hover:text-aegean-ink"
            >
              <Phone size={14} /> {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
