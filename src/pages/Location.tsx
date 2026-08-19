import { MapPin, Phone, Mail, Clock, ExternalLink, TrainFront, Car } from "lucide-react";
import { Link } from "react-router";
import PageHero from "@/components/PageHero";
import EnquiryForm from "@/components/EnquiryForm";
import { BookButton } from "@/components/Layout";
import { SITE, HOURS } from "@/data/site";

export default function LocationPage() {
  return (
    <>
      <PageHero
        title="Find us in Tempe."
        intro="Stix is the kitchen inside the Riverview Hotel Tempe. Come in through the main hotel entrance and follow the smell of the charcoal."
        image="./images/greek-flag-wall.jpg"
      />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-5">
          {/* Contact + hours */}
          <div className="space-y-12 lg:col-span-2">
            <div>
              <h2 className="font-display text-3xl font-semibold text-aegean-ink">Contact</h2>
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
                      For functions and event enquiries.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-3xl font-semibold text-aegean-ink">Hours</h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.25em] text-aegean">
                    <Clock size={14} className="text-gold" /> Kitchen
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm font-light text-foreground/75">
                    {HOURS.kitchen.map((h) => (
                      <li key={h.days} className="flex justify-between gap-4 border-b border-border pb-2">
                        <span>{h.days}</span>
                        <span className="text-right">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.25em] text-aegean">
                    <Clock size={14} className="text-gold" /> Hotel Bar
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm font-light text-foreground/75">
                    {HOURS.hotel.map((h) => (
                      <li key={h.days} className="flex justify-between gap-4 border-b border-border pb-2">
                        <span>{h.days}</span>
                        <span className="text-right">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-secondary/60 p-5">
                  <p className="text-sm font-light leading-relaxed text-foreground/75">
                    <span className="font-medium text-aegean">Lunch menu:</span>{" "}
                    {HOURS.lunchMenu.days}, {HOURS.lunchMenu.time}.
                    <br />
                    <span className="font-medium text-aegean">Dinner menu:</span>{" "}
                    {HOURS.dinnerMenu.days}, {HOURS.dinnerMenu.time}.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-display text-3xl font-semibold text-aegean-ink">Getting here</h2>
              <ul className="mt-6 space-y-4 text-sm font-light leading-relaxed text-foreground/75">
                <li className="flex items-start gap-4">
                  <TrainFront size={18} className="mt-1 shrink-0 text-gold" />
                  <span>
                    Tempe Station (T4 Eastern Suburbs & Illawarra Line) is a short
                    walk from the hotel.
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <Car size={18} className="mt-1 shrink-0 text-gold" />
                  <span>
                    Right on the Princes Highway at Tempe, minutes from St Peters,
                    Marrickville and Sydney Airport.
                  </span>
                </li>
              </ul>
            </div>

            <BookButton />
          </div>

          {/* Map */}
          <div className="lg:col-span-3">
            <div className="sticky top-28 overflow-hidden shadow-[0_12px_40px_rgba(16,31,69,0.12)]">
              <iframe
                title="Map of Stix Hellenic Taverna, 900 Princes Hwy Tempe NSW 2044"
                src={SITE.mapEmbed}
                className="h-[560px] w-full border-0 lg:h-[720px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="bg-secondary/60 py-20">
        <div className="mx-auto max-w-3xl px-5">
          <div className="text-center">
            <h2 className="font-display text-4xl font-semibold text-aegean-ink md:text-5xl">
              Send us a message.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base font-light leading-relaxed text-foreground/70">
              Questions, feedback or a big table you can't book online. For
              functions, use the{" "}
              <Link to="/functions" className="text-aegean underline underline-offset-4 hover:text-gold">
                enquiry form
              </Link>{" "}
              instead.
            </p>
          </div>
          <div className="mt-10 bg-card p-7 shadow-[0_1px_3px_rgba(16,31,69,0.08)] md:p-10">
            <EnquiryForm type="contact" />
          </div>
        </div>
      </section>
    </>
  );
}
