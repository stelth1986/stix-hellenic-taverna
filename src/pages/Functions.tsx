import { Mail, Phone, Cake, Briefcase, Heart, Users } from "lucide-react";
import PageHero from "@/components/PageHero";
import { SITE } from "@/data/site";

const OCCASIONS = [
  {
    icon: Cake,
    title: "Milestones & Birthdays",
    desc: "Big tables, sharing plates and a room that is already in the mood.",
  },
  {
    icon: Heart,
    title: "Engagements & Christenings",
    desc: "Family style menus for the days that bring everyone together.",
  },
  {
    icon: Briefcase,
    title: "Corporate Events",
    desc: "Set food and drinks packages, sorted with our events team.",
  },
  {
    icon: Users,
    title: "Family Gatherings",
    desc: "Anything from a long Sunday lunch to taking over the whole taverna.",
  },
];

export default function FunctionsPage() {
  return (
    <>
      <PageHero
        title="Host your next event at Stix."
        intro="Greek hospitality, shared feasting menus and a room inside the Riverview Hotel, with food and drinks packages planned around your occasion."
        image="./images/hero-flatlay.jpg"
      />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-semibold leading-tight text-aegean-ink md:text-5xl">
              Big tables are our favourite tables.
            </h2>
            <p className="mt-6 text-base font-light leading-relaxed text-foreground/75 md:text-lg">
              Everything on our menu is made to be shared, which makes Stix an
              easy place to feed a crowd. Our team will help you plan the food
              and drinks around your occasion, whether it is a small family
              lunch or a bigger function.
            </p>
            <p className="mt-4 text-base font-light leading-relaxed text-foreground/75 md:text-lg">
              Birthdays, engagements, christenings, work events or just a big
              get together. Tell us what you are celebrating and we will help
              you plan it.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href={`mailto:${SITE.email}?subject=Function%20enquiry%20at%20Stix%20Hellenic%20Taverna`}
                className="inline-flex items-center justify-center gap-2 bg-aegean px-6 py-3 text-[12px] font-medium uppercase tracking-[0.25em] text-cream transition-colors hover:bg-aegean-deep"
              >
                <Mail size={14} /> Make an Enquiry
              </a>
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center justify-center gap-2 border border-aegean px-6 py-3 text-[12px] font-medium uppercase tracking-[0.25em] text-aegean transition-colors hover:bg-aegean hover:text-cream"
              >
                <Phone size={14} /> {SITE.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="./images/chicken-wings.jpg"
              alt="Chargrilled chicken wings shared plate"
              className="aspect-[3/4] w-full object-cover"
            />
            <img
              src="./images/tomato-salad.jpg"
              alt="Chargrilled tomato salad"
              className="mt-10 aspect-[3/4] w-full object-cover"
            />
          </div>
        </div>

        {/* Occasions */}
        <div className="mt-24">
          <div className="text-center">
            <h2 className="font-display text-4xl font-semibold text-aegean-ink">
              Birthdays, christenings, work dos and everything in between.
            </h2>
            <span className="key-divider mt-6" />
          </div>
          <div className="mt-14 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {OCCASIONS.map((o) => (
              <div key={o.title} className="bg-card p-8">
                <o.icon size={26} className="text-gold" strokeWidth={1.5} />
                <h3 className="mt-5 font-display text-xl font-semibold text-aegean-ink">
                  {o.title}
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-foreground/65">
                  {o.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry band */}
      <section className="bg-aegean-ink py-20 text-center text-cream">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="font-display text-4xl font-semibold md:text-5xl">
            Tell us the date and we will sort the rest.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base font-light leading-relaxed text-cream/80">
            Email{" "}
            <a href={`mailto:${SITE.email}`} className="text-gold-light underline underline-offset-4">
              {SITE.email}
            </a>{" "}
            or call {SITE.phoneDisplay} to start planning.
          </p>
        </div>
      </section>
    </>
  );
}
