import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { EDITORIAL, PRODUCTS } from "@/data/catalog";
import { px } from "@/data/site";
import { PageHeader } from "@/components/PageHeader";
import { CraftProcess, Story } from "@/sections/Editorial";
import { GallerySection } from "@/sections/GallerySection";
import { Eyebrow, Reveal, SmartImage } from "@/components/ui";

/** Motifs that genuinely appear in the current listings. */
const MOTIFS = [
  {
    name: "Basket weave",
    note: "Woven leather detail, tight or wide.",
    slugs: ["the-denver-hat-band", "the-midland-hat-band", "the-sedona-hat-band"],
  },
  {
    name: "Hand embossed",
    note: "Tooled pattern pressed into the leather.",
    slugs: ["the-bandera-hat-band", "the-oatman-hat-band", "the-cristo-hat-band"],
  },
  {
    name: "Floral & paisley",
    note: "Leaf, flower and paisley shaping.",
    slugs: ["the-marfa-hat-band", "the-covington-hat-band"],
  },
  {
    name: "Silver accents",
    note: "Every band closes with a silver buckle.",
    slugs: ["the-silverton-hat-band"],
  },
];

const bySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

export function OurCraft() {
  return (
    <>
      <PageHeader
        eyebrow="Our Craft"
        title={
          <>
            Made by hand,
            <span className="italic text-brasslite"> one piece at a time.</span>
          </>
        }
        copy="Buckaroo Hatters is a handmade Western hat business. The shop lists hand-tooled hat bands, premium Herman Oak leather goods and hat accessories — and takes custom hat inquiries for work made to order."
        image={px(5894242, 1900, 1100)}
        imageAlt="A craftsman sharpening a tool at a workbench in warm light"
        trail={[{ label: "Home", to: "/" }, { label: "Our Craft" }]}
      />

      <Story />

      {/* Motifs found in the current listings */}
      <section className="relative overflow-hidden bg-parchment py-20 lg:py-28">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <Reveal direction="left">
              <div className="lg:sticky lg:top-28">
                <Eyebrow>In the Listings</Eyebrow>
                <h2 className="mt-5 font-display text-[clamp(2rem,4.6vw,3.4rem)] font-light leading-[1.03] text-espresso">
                  The details worth
                  <span className="italic text-saddle"> noticing.</span>
                </h2>
                <p className="mt-5 max-w-md text-[0.95rem] leading-[1.9] text-charcoal/72">
                  These are the motifs that actually appear across the bands in the shop
                  today. Each one links straight to the pieces that use it.
                </p>
                <div className="mt-8 aspect-[4/3] overflow-hidden bg-espresso/10">
                  <SmartImage
                    src={EDITORIAL.craft[1]}
                    alt="Close-up of leather crafting materials and hand-sewing threads"
                    wrapperClassName="h-full w-full"
                    className="motion-safe:animate-drift"
                  />
                </div>
              </div>
            </Reveal>

            <div className="grid gap-px bg-espresso/12 sm:grid-cols-2">
              {MOTIFS.map((motif, i) => (
                <Reveal key={motif.name} delay={i * 90}>
                  <div className="group flex h-full flex-col bg-parchment p-7 transition-colors duration-500 hover:bg-ivory">
                    <span className="font-display text-[1.05rem] text-brass tabular">
                      0{i + 1}
                    </span>
                    <h3 className="mt-3 font-display text-[1.7rem] leading-tight text-espresso">
                      {motif.name}
                    </h3>
                    <p className="mt-2 text-[0.86rem] leading-relaxed text-charcoal/65">
                      {motif.note}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-2 pt-6">
                      {motif.slugs.map((slug) => {
                        const p = bySlug(slug);
                        if (!p) return null;
                        return (
                          <Link
                            key={slug}
                            to={`/products/${slug}`}
                            className="flex items-center gap-2 border border-espresso/15 bg-ivory/60 py-1.5 pl-1.5 pr-3 text-[0.62rem] uppercase tracking-[0.12em] text-charcoal/70 transition-all duration-300 hover:border-brass hover:text-espresso"
                          >
                            <SmartImage
                              src={p.images[0]}
                              alt=""
                              wrapperClassName="h-8 w-7 shrink-0"
                            />
                            {p.name.replace("The ", "").replace(" Hat Band", "")}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CraftProcess />
      <GallerySection />

      <section className="leather grain relative overflow-hidden py-16 lg:py-20">
        <div className="relative mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-8 px-5 sm:px-8 lg:flex-row lg:items-center lg:px-12">
          <div>
            <Eyebrow tone="light">Next Step</Eyebrow>
            <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.9rem,4.2vw,3rem)] font-light leading-[1.05] text-parchment">
              Ready to put something of yours on the bench?
            </h2>
          </div>
          <Link
            to="/contact"
            className="group inline-flex shrink-0 items-center gap-3 bg-brass px-8 py-4.5 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-espresso transition-colors hover:bg-brasslite"
          >
            Start an inquiry
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2}
            />
          </Link>
        </div>
      </section>
    </>
  );
}
