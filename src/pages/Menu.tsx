import { useState } from "react";
import { Download } from "lucide-react";
import PageHero from "@/components/PageHero";
import { BookButton } from "@/components/Layout";
import { dinnerMenu, lunchMenu, drinksMenu, type MenuSection } from "@/data/menu";
import { useConfig, useHours, img } from "@/lib/config";

type TabKey = "dinner" | "lunch" | "drinks";

const TABS: { key: TabKey; label: string; pdf: string; sections: MenuSection[] }[] = [
  { key: "lunch", label: "Lunch", pdf: "./menus/stix-lunch-menu.pdf", sections: lunchMenu },
  { key: "dinner", label: "Dinner", pdf: "./menus/stix-dinner-menu.pdf", sections: dinnerMenu },
  { key: "drinks", label: "Beverages", pdf: "./menus/stix-beverage-menu.pdf", sections: drinksMenu },
];

function Section({ section }: { section: MenuSection }) {
  return (
    <div className="break-inside-avoid">
      <h3 className="font-display text-2xl font-semibold text-aegean md:text-[1.7rem]">
        {section.title}
      </h3>
      {section.note && (
        <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.22em] text-gold">
          {section.note}
        </p>
      )}
      <ul className="mt-5 space-y-5">
        {section.items.map((item) => (
          <li key={item.name}>
            <div className="menu-item">
              <span className="font-display text-lg font-semibold leading-snug text-foreground">
                {item.name}
                {item.tags && (
                  <span className="ml-2 align-middle text-[10px] font-sans font-medium uppercase tracking-[0.15em] text-olive">
                    {item.tags}
                  </span>
                )}
              </span>
              {item.price && (
                <>
                  <span className="leader" />
                  <span className="font-display text-lg font-semibold text-aegean">
                    {item.price}
                  </span>
                </>
              )}
            </div>
            {item.desc && (
              <p className="mt-1 max-w-md text-sm font-light leading-relaxed text-foreground/60">
                {item.desc}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function MenuPage() {
  const [tab, setTab] = useState<TabKey>("dinner");
  const cfg = useConfig();
  const hours = useHours();
  const tabs = TABS.map((t) => ({
    ...t,
    availability:
      t.key === "lunch"
        ? `Available ${hours.lunchMenu.days}, ${hours.lunchMenu.time}`
        : t.key === "dinner"
          ? `Available ${hours.dinnerMenu.days}, ${hours.dinnerMenu.time}`
          : "Greek wines, beers, spirits & cocktails",
  }));
  const active = tabs.find((t) => t.key === tab)!;

  return (
    <>
      <PageHero
        title="Our menu."
        intro="Dips, salads, charcoal souvla and slow roasts, with Greek wine, ouzo and a lager we pour on tap."
        image={img(cfg, "heroMenu", "./images/menu-hero.jpg")}
      />

      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
        {/* Tabs */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex w-full max-w-md border border-aegean/25">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex-1 px-4 py-3.5 text-[12px] font-medium uppercase tracking-[0.22em] transition-colors ${
                  tab === t.key
                    ? "bg-aegean text-cream"
                    : "bg-transparent text-aegean hover:bg-aegean/5"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <p className="text-[12px] font-medium uppercase tracking-[0.25em] text-gold">
            {active.availability}
          </p>
        </div>

        {/* Menu body */}
        <div className="mt-14 columns-1 gap-14 md:columns-2 [&>*]:mb-14">
          {active.sections.map((s) => (
            <Section key={s.title} section={s} />
          ))}
        </div>

        <div className="mt-4 flex flex-col items-center gap-6 border-t border-border pt-10 text-center">
          <p className="text-xs font-light uppercase tracking-[0.2em] text-foreground/50">
            v vegetarian · gf gluten free · 10% surcharge on weekends
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <a
              href={active.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-aegean px-6 py-3 text-[12px] font-medium uppercase tracking-[0.25em] text-aegean transition-colors hover:bg-aegean hover:text-cream"
            >
              <Download size={14} /> Download {active.label} Menu
            </a>
            <BookButton />
          </div>
        </div>
      </section>
    </>
  );
}
