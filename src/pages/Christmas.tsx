import {
  CalendarDays,
  Clock3,
  Phone,
  Sparkles,
  Users,
  UtensilsCrossed,
  Wine,
} from "lucide-react";
import EnquiryForm from "@/components/EnquiryForm";
import { SITE } from "@/data/site";
import { useConfig, img } from "@/lib/config";

const GROUP_FEATURES = [
  {
    icon: UtensilsCrossed,
    title: "Made for sharing",
    desc: "Dips, salads, skewers and slow roasts come out for the table, so everyone eats well without a complicated order.",
  },
  {
    icon: CalendarDays,
    title: "Set menus, sorted",
    desc: "Tell us your date, group size and style of celebration and the team will suggest a menu that fits.",
  },
  {
    icon: Wine,
    title: "Drinks kept simple",
    desc: "Greek wines, beer, cocktails and hotel bar options can be planned around your group and timing.",
  },
];

const OCCASIONS = [
  "Work Christmas parties",
  "End-of-year team lunches",
  "Family gatherings",
  "Client entertaining",
  "Festive dinners with friends",
  "December catch-ups",
];

const FAQS = [
  {
    q: "Do you offer set menus for groups?",
    a: "Yes. Tell us your group size, timing and style of function and we’ll suggest a menu that fits.",
  },
  {
    q: "Can you cater for dietary requirements?",
    a: "Yes. Add them to the enquiry and the team will confirm options when they come back to you.",
  },
  {
    q: "Can we book lunch and dinner?",
    a: "Yes, subject to kitchen and venue availability. Include your preferred time and we’ll confirm what’s open.",
  },
  {
    q: "Can we book a large group?",
    a: "Yes. Send through your expected numbers and preferred date and we’ll advise the best setup.",
  },
];

export default function ChristmasPage() {
  const cfg = useConfig();
  const heroImage = img(cfg, "heroChristmas", "./images/functions-hero.jpg");
  const staffImage = img(
    cfg,
    "christmasStaff",
    "./images/jim-elvis-christmas.webp"
  );

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-aegean-ink text-cream">
        <img
          src={heroImage}
          alt="A packed dining room at Stix Hellenic Taverna"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-aegean-ink/75 via-aegean-ink/60 to-aegean-ink/90" />
        <div className="absolute inset-x-0 top-0 h-2 bg-[#9f2d2d]" />
        <div className="relative mx-auto max-w-5xl px-5 py-28 text-center">
          <h1 className="font-display text-5xl font-semibold leading-tight md:text-7xl">
            Christmas at Stix.
          </h1>
          <span className="key-divider mt-8 bg-gold-light" />
          <p className="mx-auto mt-8 max-w-3xl text-balance text-lg font-light leading-relaxed text-cream/90 md:text-xl">
            Bring your crew together for a long lunch, festive dinner or
            end-of-year celebration built around generous food, good wine and
            proper Greek hospitality.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#enquiry"
              className="inline-flex items-center justify-center gap-2 bg-[#9f2d2d] px-6 py-3 text-[12px] font-medium uppercase tracking-[0.25em] text-cream transition-colors hover:bg-[#7f2424]"
            >
              Enquire About Your Christmas Party
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

      {/* Intro */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-semibold leading-tight text-aegean-ink md:text-5xl">
              A Christmas party that feels like a proper gathering.
            </h2>
            <p className="mt-6 text-base font-light leading-relaxed text-foreground/75 md:text-lg">
              From work parties to family get-togethers, Stix is made for
              Christmas celebrations that feel relaxed, generous and easy to
              organise. Tell us what you’re planning, how many people you’re
              bringing and the kind of lunch or dinner you want.
            </p>
            <p className="mt-4 text-base font-light leading-relaxed text-foreground/75 md:text-lg">
              We’ll help shape the food, drinks and timing around it, with
              share-style starters, charcoal favourites, fresh salads, seafood,
              desserts and drinks packages that keep the table moving.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {OCCASIONS.map((item) => (
                <span
                  key={item}
                  className="border border-gold/50 bg-secondary/60 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-aegean-ink"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div>
            <img
              src={staffImage}
              alt="Jim Kospetas and Elvis Korsovitis wearing Santa hats at the charcoal grill"
              className="aspect-[4/3] w-full object-cover shadow-[0_12px_40px_rgba(16,31,69,0.14)]"
            />
          </div>
        </div>
      </section>

      {/* Group features */}
      <section className="bg-secondary/60 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-4xl font-semibold text-aegean-ink md:text-5xl">
              Big tables are our favourite tables.
            </h2>
            <span className="key-divider mt-6" />
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {GROUP_FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="bg-card p-8 shadow-[0_1px_3px_rgba(16,31,69,0.08)]"
              >
                <feature.icon size={28} className="text-[#9f2d2d]" strokeWidth={1.5} />
                <h3 className="mt-5 font-display text-2xl font-semibold text-aegean-ink">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-foreground/70">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Details band */}
      <section className="bg-[#173f2c] py-20 text-cream">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-3 lg:px-8">
          <div>
            <Sparkles size={26} className="text-gold-light" strokeWidth={1.5} />
            <h3 className="mt-5 font-display text-2xl font-semibold">
              Festive without the fuss
            </h3>
            <p className="mt-3 text-sm font-light leading-relaxed text-cream/75">
              A warm room, generous food and a team that knows how to run group
              bookings without making it feel over-produced.
            </p>
          </div>
          <div>
            <Users size={26} className="text-gold-light" strokeWidth={1.5} />
            <h3 className="mt-5 font-display text-2xl font-semibold">
              Small groups to full functions
            </h3>
            <p className="mt-3 text-sm font-light leading-relaxed text-cream/75">
              From a long table lunch to a bigger end-of-year celebration, send
              through your numbers and we’ll recommend the best setup.
            </p>
          </div>
          <div>
            <Clock3 size={26} className="text-gold-light" strokeWidth={1.5} />
            <h3 className="mt-5 font-display text-2xl font-semibold">
              Lunch or dinner
            </h3>
            <p className="mt-3 text-sm font-light leading-relaxed text-cream/75">
              Include your preferred date and time in the enquiry and we’ll
              confirm availability, menu options and next steps.
            </p>
          </div>
        </div>
      </section>

      {/* Enquiry form */}
      <section id="enquiry" className="scroll-mt-32 bg-aegean-ink py-20 text-cream">
        <div className="mx-auto max-w-3xl px-5">
          <div className="text-center">
            <h2 className="font-display text-4xl font-semibold md:text-5xl">
              Tell us what you’re planning.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base font-light leading-relaxed text-cream/80">
              Send through the details below and our events team will come back
              with availability, menu options and next steps. Prefer to talk?
              Call {SITE.phoneDisplay}.
            </p>
          </div>
          <div className="mt-10 bg-cream p-7 text-foreground shadow-[0_20px_60px_rgba(0,0,0,0.35)] md:p-10">
            <EnquiryForm type="christmas" />
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-4xl font-semibold text-aegean-ink md:text-5xl">
            Christmas function FAQs
          </h2>
          <span className="key-divider mt-6" />
        </div>
        <div className="mt-14 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
          {FAQS.map((faq) => (
            <div key={faq.q} className="bg-card p-8">
              <h3 className="font-display text-2xl font-semibold text-aegean-ink">
                {faq.q}
              </h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-foreground/70">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
