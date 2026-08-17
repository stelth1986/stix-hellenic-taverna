type Props = {
  title: string;
  intro?: string;
  image: string;
};

/** Slim interior-page hero: full-bleed photo band with a dark Aegean wash. */
export default function PageHero({ title, intro, image }: Props) {
  return (
    <section className="relative flex min-h-[46vh] items-end overflow-hidden bg-aegean-ink">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-aegean-ink via-aegean-ink/40 to-transparent" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-14 pt-32 lg:px-8">
        <h1 className="font-display text-5xl font-semibold text-cream md:text-6xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-4 max-w-2xl text-base font-light leading-relaxed text-cream/85 md:text-lg">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
