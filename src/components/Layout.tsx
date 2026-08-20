import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { Menu, X, MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";
import { SITE, HOURS } from "@/data/site";

const NAV_LEFT = [
  { to: "/", label: "Home" },
  { to: "/location", label: "Location" },
  { to: "/menu", label: "Our Menu" },
];

const NAV_RIGHT = [
  { to: "/functions", label: "Functions" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

const NAV_ALL = [...NAV_LEFT, ...NAV_RIGHT];

function BookButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={SITE.bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block bg-aegean px-6 py-3 text-[12px] font-medium uppercase tracking-[0.25em] text-cream transition-colors hover:bg-aegean-deep ${className}`}
    >
      Book a Table
    </a>
  );
}

export { BookButton };

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-[12px] font-medium uppercase tracking-[0.22em] transition-colors hover:text-aegean ${
          isActive
            ? "text-aegean underline decoration-gold decoration-2 underline-offset-8"
            : "text-foreground/70"
        }`
      }
    >
      {label}
    </NavLink>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Utility strip: real info, not marketing */}
      <div className="hidden border-b border-border bg-cream md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/55 lg:px-8">
          <span className="flex items-center gap-2">
            <MapPin size={12} className="text-gold" /> 900 Princes Hwy, Tempe
          </span>
          <span className="text-aegean">Bouzouki night every Wednesday from 7pm</span>
          <a
            href={SITE.phoneHref}
            className="flex items-center gap-2 transition-colors hover:text-aegean"
          >
            <Phone size={12} className="text-gold" /> {SITE.phoneDisplay}
          </a>
        </div>
      </div>

      {/* Header: split nav around a centred logo */}
      <header className="sticky top-0 z-50 border-b border-border bg-cream/95 backdrop-blur">
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-5 py-5 lg:px-8">
          {/* Left nav (desktop) / spacer (mobile) */}
          <nav className="hidden items-center justify-end gap-9 xl:flex">
            {NAV_LEFT.map((item) => (
              <NavItem key={item.to} {...item} />
            ))}
          </nav>
          <span className="xl:hidden" />

          <Link to="/" className="justify-self-center">
            <img
              src="./images/stix-logo.png"
              alt="Stix Hellenic Taverna"
              className="h-14 w-auto mix-blend-multiply md:h-16"
            />
          </Link>

          <div className="hidden items-center gap-9 xl:flex">
            {NAV_RIGHT.map((item) => (
              <NavItem key={item.to} {...item} />
            ))}
            <BookButton className="!px-5 !py-2.5 ml-auto" />
          </div>

          <button
            className="justify-self-end text-aegean xl:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile nav */}
        {open && (
          <nav className="border-t border-border bg-cream px-5 pb-6 pt-2 xl:hidden">
            {NAV_ALL.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block border-b border-border/60 py-3.5 text-[13px] font-medium uppercase tracking-[0.22em] ${
                    isActive ? "text-aegean" : "text-foreground/70"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <BookButton className="mt-5 w-full text-center" />
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-aegean-ink text-cream">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-3 lg:px-8">
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-wide text-gold-light">
              Find Us
            </h3>
            <div className="mt-5 space-y-3 text-sm text-cream/80">
              <p className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
                <span>
                  {SITE.address}
                  <br />
                  <span className="text-cream/60">{SITE.addressNote}</span>
                </span>
              </p>
              <p className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-gold" />
                <a href={SITE.phoneHref} className="transition-colors hover:text-gold-light">
                  {SITE.phoneDisplay}
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Mail size={16} className="shrink-0 text-gold" />
                <a
                  href={`mailto:${SITE.email}`}
                  className="transition-colors hover:text-gold-light"
                >
                  {SITE.email}
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Instagram size={16} className="shrink-0 text-gold" />
                <a
                  href={SITE.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gold-light"
                >
                  @stixhellenictaverna
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Facebook size={16} className="shrink-0 text-gold" />
                <a
                  href={SITE.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gold-light"
                >
                  Stix Hellenic Taverna
                </a>
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-display text-2xl font-semibold tracking-wide text-gold-light">
              Kitchen Hours
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-cream/80">
              {HOURS.kitchen.map((h) => (
                <li key={h.days} className="flex items-start gap-3">
                  <Clock size={16} className="mt-0.5 shrink-0 text-gold" />
                  <span>
                    {h.days}
                    <br />
                    <span className="text-cream/60">{h.time}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-2xl font-semibold tracking-wide text-gold-light">
              The Hotel
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-cream/80">
              {HOURS.hotel.map((h) => (
                <li key={h.days} className="flex items-start gap-3">
                  <Clock size={16} className="mt-0.5 shrink-0 text-gold" />
                  <span>
                    {h.days}
                    <br />
                    <span className="text-cream/60">{h.time}</span>
                  </span>
                </li>
              ))}
            </ul>
            <a
              href={SITE.hotelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block border border-gold/50 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.25em] text-gold-light transition-colors hover:border-gold hover:bg-gold hover:text-aegean-ink"
            >
              Riverview Hotel Tempe
            </a>
          </div>
        </div>

        <div className="border-t border-cream/10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-[11px] uppercase tracking-[0.2em] text-cream/50 md:flex-row lg:px-8">
            <p>© {new Date().getFullYear()} Stix Hellenic Taverna</p>
            <p>900 Princes Hwy, Tempe NSW 2044</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
