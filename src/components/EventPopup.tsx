import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { SITE } from "@/data/site";
import { PANIGYRI, panigyriIsUpcoming } from "@/data/panigyri";

const SEEN_KEY = "stix-panigyri-popup-seen";
const DELAY_MS = 1800;

// Pages where the pop-up would get in the way.
const QUIET_PATHS = [PANIGYRI.path, "/christmas/thank-you"];

function alreadySeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    // Private browsing: it will simply show again on the next page load.
  }
}

/**
 * Site-wide pop-up for the Christmas Panigyri. Shows once per visit, a moment
 * after the page loads, and switches itself off when the event day is over.
 */
export default function EventPopup() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const quiet = QUIET_PATHS.includes(pathname);

  useEffect(() => {
    if (quiet || !panigyriIsUpcoming() || alreadySeen()) return;
    const t = window.setTimeout(() => {
      // Re-check: another tab or page may have shown it in the meantime.
      if (!alreadySeen()) setOpen(true);
    }, DELAY_MS);
    return () => window.clearTimeout(t);
  }, [quiet]);

  // Remember it as soon as it has been shown, not only when it is closed.
  useEffect(() => {
    if (open) markSeen();
  }, [open]);

  // Following a link out of the pop-up closes it.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        {/* The overlay is the scroll container and centres the card, so the
            card never relies on transforms for its position. */}
        <Dialog.Overlay className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-aegean-ink/75 p-4 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0">
        <Dialog.Content
          aria-describedby="panigyri-popup-desc"
          className="relative w-full max-w-md bg-cream text-center shadow-[0_24px_80px_rgba(0,0,0,0.45)] focus:outline-none"
        >
          <div className="h-1.5 bg-[#9f2d2d]" />

          <Dialog.Close
            aria-label="Close"
            className="absolute right-2 top-3 flex h-10 w-10 items-center justify-center text-aegean-ink/60 transition-colors hover:text-aegean-ink"
          >
            <X size={22} />
          </Dialog.Close>

          <div className="px-6 pb-7 pt-9 sm:px-9">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-gold">
              Riverview Hotel <span className="mx-1 text-foreground/30">|</span> Stix
            </p>
            <Dialog.Title className="mt-3 font-display text-[2.6rem] font-semibold leading-[0.95] text-[#9f2d2d] sm:text-5xl">
              Christmas
              <span className="block text-gold">Panigyri</span>
            </Dialog.Title>
            <p
              id="panigyri-popup-desc"
              className="mt-3 font-display text-lg italic text-aegean-ink sm:text-xl"
            >
              {PANIGYRI.tagline}
            </p>

            <div className="mt-5 grid grid-cols-3 gap-2">
              {PANIGYRI.highlights.map((h) => (
                <figure key={h.title}>
                  <img
                    src={h.image}
                    alt={h.alt}
                    className="aspect-square w-full object-cover"
                  />
                  <figcaption className="mt-2 text-[9px] font-semibold uppercase leading-snug tracking-[0.12em] text-aegean-ink sm:text-[10px] sm:tracking-[0.16em]">
                    {h.title}
                  </figcaption>
                </figure>
              ))}
            </div>

            <p className="mt-6 font-display text-4xl font-bold uppercase tracking-[0.06em] text-aegean-ink sm:text-5xl">
              {PANIGYRI.dateShort}
            </p>
            <p className="mt-1 font-display text-xl text-gold sm:text-2xl">
              {PANIGYRI.time}
            </p>
          </div>

          <p className="bg-gold py-2.5 text-[13px] font-medium uppercase tracking-[0.34em] text-cream">
            {PANIGYRI.entry}
          </p>

          <div className="flex flex-col gap-3 px-6 py-6 sm:flex-row sm:px-9">
            <Link
              to={PANIGYRI.path}
              className="flex-1 bg-aegean px-4 py-3 text-[12px] font-medium uppercase tracking-[0.22em] text-cream transition-colors hover:bg-aegean-deep"
            >
              See the Details
            </Link>
            <a
              href={SITE.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 border border-aegean/40 px-4 py-3 text-[12px] font-medium uppercase tracking-[0.22em] text-aegean transition-colors hover:border-aegean hover:bg-aegean hover:text-cream"
            >
              Book a Table
            </a>
          </div>
        </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
