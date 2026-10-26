import { useEffect } from "react";
import { Link } from "react-router";
import { Phone } from "lucide-react";
import { SITE } from "@/data/site";
import { track } from "@/lib/pixel";

export default function ChristmasThanksPage() {
  useEffect(() => {
    track("CompleteRegistration", { content_name: "Christmas party enquiry" });
  }, []);

  return (
    <section className="flex min-h-[80vh] items-center bg-aegean-ink py-24 text-cream">
      <div className="mx-auto max-w-2xl px-5 text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold-light">
          Christmas at Stix
        </p>
        <h1 className="mt-6 font-display text-4xl font-semibold leading-tight md:text-6xl">
          Thanks, we got your enquiry.
        </h1>
        <span className="key-divider mt-8 bg-gold-light" />
        <p className="mx-auto mt-8 max-w-xl text-base font-light leading-relaxed text-cream/85 md:text-lg">
          Our events team will look over your date and group size and come back
          to you with availability, menu options and next steps. If your date is
          coming up quickly, call us on {SITE.phoneDisplay} and we'll sort it
          out over the phone.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={SITE.phoneHref}
            className="inline-flex items-center justify-center gap-2 bg-[#9f2d2d] px-6 py-3 text-[12px] font-medium uppercase tracking-[0.25em] text-cream transition-colors hover:bg-[#7f2424]"
          >
            <Phone size={14} /> {SITE.phoneDisplay}
          </a>
          <Link
            to="/menu"
            className="inline-flex items-center justify-center gap-2 border border-cream/60 px-6 py-3 text-[12px] font-medium uppercase tracking-[0.25em] text-cream transition-colors hover:border-cream hover:bg-cream hover:text-aegean-ink"
          >
            See our menus
          </Link>
        </div>
      </div>
    </section>
  );
}
