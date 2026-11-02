import { Link } from "react-router-dom";
import { ArrowRight, Compass } from "lucide-react";
import { px } from "@/data/site";
import { PageHeader } from "@/components/PageHeader";
import { BrassRule, Reveal } from "@/components/ui";

export function NotFound() {
  return (
    <section className="grain relative isolate flex min-h-[86svh] items-center overflow-hidden bg-espresso pt-32">
      <div className="absolute inset-0 -z-10 opacity-40">
        <img
          src={px(27962443, 1600, 1000)}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/70 to-espresso/40" />
      </div>

      <div className="mx-auto w-full max-w-[1600px] px-5 py-16 sm:px-8 lg:px-12">
        <p className="text-[0.58rem] font-semibold uppercase tracking-[0.34em] text-brass">
          Error 404 · Off the trail
        </p>
        <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.6rem,8vw,6rem)] font-light leading-[0.96] text-parchment">
          This page rode off
          <span className="block italic text-brasslite">without its hat.</span>
        </h1>
        <p className="mt-6 max-w-lg text-[0.95rem] leading-[1.85] text-parchment/65">
          The link you followed doesn't exist on this concept site. Everything currently
          listed in the shop is one click away.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/shop"
            className="group inline-flex items-center justify-center gap-3 bg-brass px-7 py-4 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-espresso transition-colors hover:bg-brasslite"
          >
            Browse the shop
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2}
            />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-3 border border-parchment/30 px-7 py-4 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-parchment transition-colors hover:border-brass hover:text-brasslite"
          >
            <Compass className="h-4 w-4" strokeWidth={1.7} /> Back home
          </Link>
        </div>
      </div>
    </section>
  );
}

const LEGAL_COPY: Record<
  "privacy-policy" | "terms",
  { title: string; eyebrow: string; intro: string; sections: { h: string; p: string }[] }
> = {
  "privacy-policy": {
    title: "Privacy Policy",
    eyebrow: "Mockup Page",
    intro:
      "This is a front-end concept site. The page below is an editable placeholder — no personal data is collected, stored or transmitted by this demo, and the final policy must be written for the live store before launch.",
    sections: [
      {
        h: "Placeholder · Information collected on the live store",
        p: "Replace with the merchant's real policy. On a production Shopify store this typically covers order and contact details submitted at checkout, plus standard analytics configured by the store owner.",
      },
      {
        h: "Placeholder · This demo",
        p: "The inquiry form on this concept does not send data anywhere. The shopping bag is stored in your own browser's local storage and never leaves your device.",
      },
      {
        h: "Placeholder · Contact",
        p: "Insert the confirmed business contact details here. None have been published on the current storefront, so nothing has been invented for this mockup.",
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    eyebrow: "Mockup Page",
    intro:
      "Editable placeholder terms for the concept build. Live terms — including pricing, shipping, returns and custom-order conditions — must be supplied by the business before the store goes live.",
    sections: [
      {
        h: "Placeholder · Orders & pricing",
        p: "All prices shown on this concept are taken from the merchant's live Shopify listing at the time of design and may change. Custom hat work is quoted individually and has no published online price.",
      },
      {
        h: "Placeholder · Custom work",
        p: "Describe lead times, deposits, approvals and cancellation terms for made-to-order hats once confirmed with the business.",
      },
      {
        h: "Placeholder · Shipping & returns",
        p: "Insert the confirmed shipping and returns policy. Nothing has been assumed for this mockup.",
      },
    ],
  },
};

export function LegalPage({ kind }: { kind: "privacy-policy" | "terms" }) {
  const copy = LEGAL_COPY[kind];
  return (
    <>
      <PageHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        copy={copy.intro}
        image={px(40080053, 1600, 1000)}
        imageAlt="Leather crafting tools and materials on a workshop bench"
        trail={[{ label: "Home", to: "/" }, { label: copy.title }]}
      />
      <section className="parchment-wash grain relative py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:px-12">
          <Reveal>
            <div className="border-l-2 border-brass bg-ivory/70 p-6">
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.24em] text-saddle">
                Development note
              </p>
              <p className="mt-3 text-[0.9rem] leading-[1.85] text-charcoal/75">
                This page exists so no footer link is dead. Swap the placeholder sections
                below for the merchant's approved legal copy during production.
              </p>
            </div>
          </Reveal>

          {copy.sections.map((section, i) => (
            <Reveal key={section.h} delay={i * 80}>
              <div className="mt-12">
                <div className="flex items-center gap-4">
                  <span className="font-display text-[1.1rem] text-brass tabular">
                    0{i + 1}
                  </span>
                  <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] text-espresso">
                    {section.h}
                  </h2>
                </div>
                <BrassRule className="mt-4 justify-start [&>span:last-child]:hidden [&>span:nth-child(2)]:hidden" />
                <p className="mt-5 text-[0.95rem] leading-[1.95] text-charcoal/75">
                  {section.p}
                </p>
              </div>
            </Reveal>
          ))}

          <Reveal delay={200}>
            <div className="mt-16 border-t border-espresso/12 pt-8">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 bg-espresso px-7 py-4 text-[0.66rem] font-bold uppercase tracking-[0.2em] text-parchment transition-colors hover:bg-brass hover:text-espresso"
              >
                Questions? Contact the shop
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2}
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
