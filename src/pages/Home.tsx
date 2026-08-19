import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { SITE, HOURS, WHATS_ON } from "@/data/site";
import { BookButton } from "@/components/Layout";

const MENU_CARDS = [
  {
    title: "Lunch Menu",
    when: `${HOURS.lunchMenu.days} · ${HOURS.lunchMenu.time}`,
    desc: "Souvla wraps, burgers, salads and pita with dips.",
    image: "./images/haloumi-wrap.jpg",
  },
  {
    title: "Dinner Menu",
    when: `${HOURS.dinnerMenu.days} · ${HOURS.dinnerMenu.time}`,
    desc: "The full taverna menu. Dips, salads, skewers, slow roasts and the fish of the day.",
    image: "./images/dinner-menu.jpg",
  },
  {
    title: "Beverage Menu",
    when: "Wine, ouzo, beer and cocktails",
    desc: "Greek wines, ouzo, tsipouro, cocktails and our own Mediterranean lager on tap.",
    image: "./images/wine-bar.jpg",
  },
];

export default function Home() {
  return (
    <>
      {/* ------------------------------ HERO ------------------------------ */}
      <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-aegean-ink">
        <video
          src="./videos/hero.mp4"
          poster="./images/hero-flatlay.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="A full table of Greek dishes at Stix Hellenic Taverna"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-aegean-ink/55" />
        <div className="relative mx-auto max-w-4xl px-5 py-28 text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-gold-light md:text-xs">
            Greek food, cooked over charcoal
          </p>
          <h1 className="sr-only">Stix Hellenic Taverna</h1>
          <img
            src="./images/stix-logo.png"
            alt="Stix Hellenic Taverna"
            className="mx-auto mt-8 h-24 w-auto drop-shadow-[0_6px_28px_rgba(0,0,0,0.65)] md:h-36"
          />
          <span className="key-divider mt-8 bg-gold-light" />
          <p className="mx-auto mt-8 max-w-2xl text-balance text-lg font-light leading-relaxed text-cream/90 md:text-xl">
            {SITE.tagline}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <BookButton />
            <Link
              to="/menu"
              className="inline-block border border-cream/60 px-6 py-3 text-[12px] font-medium uppercase tracking-[0.25em] text-cream transition-colors hover:border-cream hover:bg-cream hover:text-aegean-ink"
            >
              See the Menu
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------- INTRO ------------------------------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-semibold leading-tight text-aegean-ink md:text-5xl">
              A Greek kitchen inside your local pub.
            </h2>
            <p className="mt-6 text-base font-light leading-relaxed text-foreground/75 md:text-lg">
              Stix is the kitchen inside the Riverview Hotel on the Princes
              Highway. The menu works the way dinner in Greece works. Dips and
              pita first, a few salads, then skewers and slow roasts off the
              charcoal for the table to share.
            </p>
            <p className="mt-4 text-base font-light leading-relaxed text-foreground/75 md:text-lg">
              There is no entrée and main here. Plates come out when they are
              ready and everyone shares. Order a few more than you think you
              need and take your time.
            </p>
            <Link
              to="/menu"
              className="mt-8 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.25em] text-aegean transition-colors hover:text-gold"
            >
              See the menu <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="./images/bbq-octopus.jpg"
              alt="Chargrilled BBQ octopus with lemon"
              className="aspect-[3/4] w-full object-cover"
            />
            <img
              src="./images/lamb-shoulder.jpg"
              alt="Slow roasted lamb shoulder with tzatziki"
              className="mt-10 aspect-[3/4] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ---------------------------- MENUS ------------------------------- */}
      <section className="bg-secondary/60 py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-4xl font-semibold text-aegean-ink md:text-5xl">
              See our menus
            </h2>
            <span className="key-divider mt-6" />
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {MENU_CARDS.map((card) => (
              <Link
                key={card.title}
                to="/menu"
                className="group flex flex-col bg-card shadow-[0_1px_3px_rgba(16,31,69,0.08)] transition-shadow hover:shadow-[0_12px_32px_rgba(16,31,69,0.14)]"
              >
                <div className="overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-gold">
                    {card.when}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-aegean-ink">
                    {card.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm font-light leading-relaxed text-foreground/70">
                    {card.desc}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-aegean">
                    View menu <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------- PHOTO STRIP / WHAT'S ON --------------------- */}
      <section className="bg-aegean-ink py-24 text-cream">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <img
                src="./images/souvla-wrap-fix.jpg"
                alt="Souvla wrap with chips and a cold Fix beer"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
                Bouzouki night, every Wednesday.
              </h2>
              <div className="mt-8 space-y-8">
                {WHATS_ON.map((item) => (
                  <div key={item.title} className="border-l-2 border-gold pl-6">
                    <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold-light">
                      {item.when}
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-semibold">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-md text-sm font-light leading-relaxed text-cream/75">
                      {item.blurb}
                    </p>
                  </div>
                ))}
              </div>
              <BookButton className="mt-10" />
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------- FIND US ------------------------------ */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-semibold leading-tight text-aegean-ink md:text-5xl">
              Your Tempe local, with a Greek kitchen.
            </h2>
            <p className="mt-6 max-w-lg text-base font-light leading-relaxed text-foreground/75">
              We are inside the Riverview Hotel on the Princes Highway. The bar
              pours from 10am, seven days a week, and the kitchen runs lunch
              and dinner.
            </p>
            <dl className="mt-8 space-y-4 text-sm">
              <div className="flex gap-6 border-b border-border pb-4">
                <dt className="w-28 shrink-0 text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/50">
                  Address
                </dt>
                <dd className="font-light">{SITE.address}</dd>
              </div>
              <div className="flex gap-6 border-b border-border pb-4">
                <dt className="w-28 shrink-0 text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/50">
                  Kitchen
                </dt>
                <dd className="font-light">
                  Mon to Fri 12 to 3pm and 5 to 10pm
                  <br />
                  Sat and Sun 12 to 10pm
                </dd>
              </div>
              <div className="flex gap-6">
                <dt className="w-28 shrink-0 text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/50">
                  Phone
                </dt>
                <dd className="font-light">
                  <a href={SITE.phoneHref} className="text-aegean hover:text-gold">
                    {SITE.phoneDisplay}
                  </a>
                </dd>
              </div>
            </dl>
            <Link
              to="/location"
              className="mt-8 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.25em] text-aegean transition-colors hover:text-gold"
            >
              Location and hours <ArrowRight size={15} />
            </Link>
          </div>
          <div className="overflow-hidden shadow-[0_12px_40px_rgba(16,31,69,0.12)]">
            <iframe
              title="Map of Stix Hellenic Taverna, 900 Princes Hwy Tempe"
              src={SITE.mapEmbed}
              className="h-[420px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
