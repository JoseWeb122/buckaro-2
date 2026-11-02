import { useState } from "react";
import { ArrowUpRight, Expand } from "lucide-react";
import { GALLERY, SOCIALS } from "@/data/site";
import { Lightbox } from "@/components/Lightbox";
import { Eyebrow, Reveal, SectionHeading } from "@/components/ui";
import { cn } from "@/utils/cn";
import { FacebookIcon, InstagramIcon } from "@/components/ui";

const ASPECT = {
  tall: "aspect-[3/4]",
  wide: "aspect-[4/3]",
  normal: "aspect-square",
} as const;

export function GallerySection({ withSocial = true }: { withSocial?: boolean }) {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-ivory py-20 sm:py-24 lg:py-28"
      aria-label="Western lifestyle gallery"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="The Western Life"
          title={
            <>
              Worn Out There,
              <span className="italic text-saddle"> Made In Here.</span>
            </>
          }
          copy="Bench work, open country, and the pieces that come out of the shop. Images marked “shop photography” are the real product photos from the live storefront."
          action={
            <p className="text-[0.6rem] uppercase tracking-[0.24em] text-charcoal/45">
              {GALLERY.length} frames · click to expand
            </p>
          }
        />


        <div className="mt-12 gap-5 [column-fill:_balance] sm:columns-2 lg:columns-3 xl:columns-4">
          {GALLERY.map((item, i) => (
            <Reveal
              key={item.src}
              delay={(i % 4) * 80}
              direction="scale"
              className="mb-5 break-inside-avoid"
            >
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group relative block w-full overflow-hidden bg-espresso/10 text-left"
                aria-label={`Open image: ${item.caption}`}
              >
                <span className={cn("relative block w-full overflow-hidden", ASPECT[item.span])}>
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.09]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95"
                  />
                  <span className="absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between gap-3 p-4 transition-transform duration-500 group-hover:translate-y-0">
                    <span className="block font-display text-[1.1rem] italic leading-snug text-parchment">
                      {item.caption}
                    </span>
                    <Expand
                      className="h-4 w-4 shrink-0 text-brass opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      strokeWidth={1.6}
                    />
                  </span>
                  {item.source === "shop" && (
                    <span className="absolute left-3 top-3 bg-espresso/85 px-2 py-1 text-[0.5rem] font-bold uppercase tracking-[0.2em] text-brass backdrop-blur-sm">
                      Shop photo
                    </span>
                  )}
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        {withSocial && (
          <Reveal delay={120}>
            <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-espresso/12 pt-9 md:flex-row md:items-center">
              <div>
                <Eyebrow>Follow the Shop</Eyebrow>
                <p className="mt-4 max-w-lg text-[0.92rem] leading-relaxed text-charcoal/70">
                  New bands, bench work and finished hats are posted on the shop's social
                  pages. Links below open the live profiles in a new tab.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={SOCIALS.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-center gap-3 border border-espresso/20 px-6 py-4 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-espresso transition-all duration-300 hover:border-brass hover:bg-brass hover:text-espresso"
                >
                  <InstagramIcon className="h-4 w-4" />
                  @buckaroohatterscustom
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2}
                  />
                </a>
                <a
                  href={SOCIALS.facebook}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-center gap-3 border border-espresso/20 px-6 py-4 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-espresso transition-all duration-300 hover:border-brass hover:bg-brass hover:text-espresso"
                >
                  <FacebookIcon className="h-4 w-4" />
                  Facebook
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2}
                  />
                </a>
              </div>
            </div>
          </Reveal>
        )}
      </div>

      <Lightbox items={GALLERY} index={index} onClose={() => setIndex(null)} onNavigate={setIndex} />
    </section>
  );
}
