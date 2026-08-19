import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import { BookButton } from "@/components/Layout";

const PHOTOS = [
  { src: "./images/hero-flatlay.jpg", caption: "A full table at dinner" },
  { src: "./images/bbq-octopus.jpg", caption: "BBQ octopus, lemon EVOO emulsion" },
  { src: "./images/lamb-shoulder.jpg", caption: "11-hour slow roasted lamb shoulder" },
  { src: "./images/stix-plates.jpg", caption: "Stix skewers with tzatziki and lemon" },
  { src: "./images/pork-belly-stix.jpg", caption: "Crispy pork belly off the charcoal" },
  { src: "./images/souvla-wrap-fix.jpg", caption: "Souvla wrap, chips and a cold Fix" },
  { src: "./images/haloumi-wrap.jpg", caption: "Haloumi souvla wrap" },
  { src: "./images/chicken-wings.jpg", caption: "Chargrilled chicken wings" },
  { src: "./images/greek-salad.jpg", caption: "Greek salad, barrel feta" },
  { src: "./images/haloumi.jpg", caption: "Chargrilled haloumi" },
  { src: "./images/greek-potatoes.jpg", caption: "Greek potatoes, lemon & oregano" },
  { src: "./images/horta.jpg", caption: "Horta, seasonal greens with Greek EVOO" },
  { src: "./images/tomato-salad.jpg", caption: "Chargrilled tomato salad" },
  { src: "./images/chargrilled-corn.jpg", caption: "Chargrilled corn and Mediterranean slaw" },
  { src: "./images/wine-bar.jpg", caption: "The bar and its Greek wines" },
];

export default function GalleryPage() {
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (index === null) return;
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") setIndex((i) => (i! + 1) % PHOTOS.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i! - 1 + PHOTOS.length) % PHOTOS.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  return (
    <>
      <PageHero
        title="Gallery."
        intro="Plates from the kitchen, the bar and the room at the Riverview Hotel Tempe."
        image="./images/hero-flatlay.jpg"
      />

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="columns-2 gap-4 md:columns-3 [&>figure]:mb-4">
          {PHOTOS.map((photo, i) => (
            <figure
              key={photo.src}
              className="group relative cursor-pointer break-inside-avoid overflow-hidden"
              onClick={() => setIndex(i)}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                loading="lazy"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-aegean-ink/85 to-transparent p-4 pt-10 text-[12px] font-light tracking-wide text-cream opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="font-display text-2xl font-semibold text-aegean-ink">
            Hungry yet?
          </p>
          <BookButton className="mt-6" />
        </div>
      </section>

      {/* Lightbox */}
      {index !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-aegean-ink/95 p-4"
          onClick={() => setIndex(null)}
        >
          <button
            className="absolute right-5 top-5 text-cream/80 transition-colors hover:text-gold-light"
            onClick={() => setIndex(null)}
            aria-label="Close"
          >
            <X size={30} />
          </button>
          <button
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 text-cream/70 transition-colors hover:text-gold-light md:left-8"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((index - 1 + PHOTOS.length) % PHOTOS.length);
            }}
            aria-label="Previous photo"
          >
            <ChevronLeft size={38} />
          </button>
          <figure
            className="max-h-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={PHOTOS[index].src}
              alt={PHOTOS[index].caption}
              className="max-h-[80vh] w-auto max-w-full object-contain"
            />
            <figcaption className="mt-4 text-center text-sm font-light tracking-wide text-cream/80">
              {PHOTOS[index].caption}
              <span className="ml-3 text-cream/40">
                {index + 1} / {PHOTOS.length}
              </span>
            </figcaption>
          </figure>
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-cream/70 transition-colors hover:text-gold-light md:right-8"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((index + 1) % PHOTOS.length);
            }}
            aria-label="Next photo"
          >
            <ChevronRight size={38} />
          </button>
        </div>
      )}
    </>
  );
}
