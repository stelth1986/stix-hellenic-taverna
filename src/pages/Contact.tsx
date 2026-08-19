import { MapPin, Phone, Mail, ExternalLink, Instagram, Facebook } from "lucide-react";
import { Link } from "react-router";
import PageHero from "@/components/PageHero";
import EnquiryForm from "@/components/EnquiryForm";
import { SITE } from "@/data/site";

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact us."
        intro="Call the hotel, send us a message below, or come and find us on the Princes Highway in Tempe."
        image="./images/dinner-menu.jpg"
      />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-5">
          {/* Details */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-3xl font-semibold text-aegean-ink">
              Talk to us
            </h2>
            <ul className="mt-6 space-y-5">
              <li className="flex items-start gap-4">
                <MapPin size={18} className="mt-1 shrink-0 text-gold" />
                <div>
                  <p className="font-display text-xl font-semibold text-aegean-ink">
                    {SITE.address}
                  </p>
                  <p className="mt-1 text-sm font-light text-foreground/60">
                    {SITE.addressNote}. Enter via the main hotel entrance.
                  </p>
                  <a
                    href={SITE.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-aegean hover:text-gold"
                  >
                    Get directions <ExternalLink size={12} />
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Phone size={18} className="mt-1 shrink-0 text-gold" />
                <div>
                  <a
                    href={SITE.phoneHref}
                    className="font-display text-xl font-semibold text-aegean-ink transition-colors hover:text-gold"
                  >
                    {SITE.phoneDisplay}
                  </a>
                  <p className="mt-1 text-sm font-light text-foreground/60">
                    Call the hotel directly for bookings and large tables.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Mail size={18} className="mt-1 shrink-0 text-gold" />
                <div>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="font-display text-xl font-semibold text-aegean-ink transition-colors hover:text-gold"
                  >
                    {SITE.email}
                  </a>
                  <p className="mt-1 text-sm font-light text-foreground/60">
                    We check this daily and will get back to you.
                  </p>
                </div>
              </li>
            </ul>

            <h3 className="mt-10 text-[12px] font-medium uppercase tracking-[0.25em] text-aegean">
              Follow along
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={SITE.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-sm font-light text-foreground/75 transition-colors hover:text-aegean"
                >
                  <Instagram size={16} className="shrink-0 text-gold" />
                  @stixhellenictaverna on Instagram
                </a>
              </li>
              <li>
                <a
                  href={SITE.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-sm font-light text-foreground/75 transition-colors hover:text-aegean"
                >
                  <Facebook size={16} className="shrink-0 text-gold" />
                  Stix Hellenic Taverna on Facebook
                </a>
              </li>
            </ul>

            <div className="mt-10 bg-secondary/60 p-5">
              <p className="text-sm font-light leading-relaxed text-foreground/75">
                Planning a birthday, a christening or a work do? Use the{" "}
                <Link
                  to="/functions"
                  className="text-aegean underline underline-offset-4 hover:text-gold"
                >
                  function enquiry form
                </Link>{" "}
                so we get the details we need straight away.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-card p-7 shadow-[0_1px_3px_rgba(16,31,69,0.08)] md:p-10">
              <EnquiryForm type="contact" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
