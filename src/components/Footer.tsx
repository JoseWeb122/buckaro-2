import { Link } from "react-router-dom";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { PRODUCTS } from "@/data/catalog";
import { BRAND, BUSINESS, FOOTER_LINKS, SOCIALS } from "@/data/site";
import { FacebookIcon, InstagramIcon, Monogram } from "@/components/ui";

const BAND_LINKS = PRODUCTS.filter((p) => p.category === "hat-bands").slice(0, 4);
const GEAR_LINKS = PRODUCTS.filter((p) => p.category !== "hat-bands" && p.kind === "product");

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="leather grain relative overflow-hidden">
      <div className="relative mx-auto max-w-[1600px] px-5 pb-10 pt-16 sm:px-8 lg:px-12 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="group flex items-center gap-3" aria-label="Buckaroo Hatters — home">
              <Monogram className="h-10 w-10 text-brass transition-transform duration-500 group-hover:-rotate-6" />
              <span className="flex flex-col leading-none">
                <span className="font-display text-[1.5rem] uppercase tracking-[0.24em] text-parchment transition-colors group-hover:text-brasslite">
                  Buckaroo
                </span>
                <span className="mt-1.5 text-[0.52rem] uppercase tracking-[0.32em] text-parchment/50">
                  Hatters · Custom Hand Made Hats
                </span>
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-[0.88rem] leading-[1.9] text-parchment/60">
              Handmade Western hat bands, leather accessories and custom hat work — shaped
              by tradition, individuality and a passion for authentic Western style.
            </p>
            <p className="mt-5 text-[0.58rem] uppercase tracking-[0.26em] text-brass/80">
              {BRAND.tagline}
            </p>

            <div className="mt-7 flex items-center gap-3">
              <a
                href={SOCIALS.instagram}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Buckaroo Hatters on Instagram (opens in a new tab)"
                className="flex h-10 w-10 items-center justify-center border border-parchment/20 text-parchment/70 transition-all duration-300 hover:border-brass hover:bg-brass hover:text-espresso"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={SOCIALS.facebook}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Buckaroo Hatters on Facebook (opens in a new tab)"
                className="flex h-10 w-10 items-center justify-center border border-parchment/20 text-parchment/70 transition-all duration-300 hover:border-brass hover:bg-brass hover:text-espresso"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href={SOCIALS.shopify}
                target="_blank"
                rel="noreferrer noopener"
                className="group ml-1 inline-flex items-center gap-2 text-[0.58rem] font-bold uppercase tracking-[0.2em] text-parchment/60 transition-colors hover:text-brasslite"
              >
                Live Shopify store
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-[0.58rem] font-bold uppercase tracking-[0.28em] text-brass">
                {col.title}
              </h2>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.to}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="sweep-link inline-block text-[0.85rem] text-parchment/65 transition-colors hover:text-parchment"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.to}
                        className="sweep-link inline-block text-[0.85rem] text-parchment/65 transition-colors hover:text-parchment"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Direct product links */}
          <nav aria-label="Hat bands and accessories">
            <h2 className="text-[0.58rem] font-bold uppercase tracking-[0.28em] text-brass">
              Hat Bands &amp; Gear
            </h2>
            <ul className="mt-5 space-y-3">
              {[...BAND_LINKS, ...GEAR_LINKS].map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/products/${p.slug}`}
                    className="sweep-link inline-block text-[0.85rem] text-parchment/65 transition-colors hover:text-parchment"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-1.5 pt-1 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-brass transition-colors hover:text-brasslite"
                >
                  View everything <ArrowUpRight className="h-3 w-3" strokeWidth={2.2} />
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <span aria-hidden="true" className="rule-brass mt-14 block h-px w-full opacity-60" />

        <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.68rem] leading-relaxed text-parchment/45">
            © {year} {BUSINESS.legalName}. All rights reserved. Front-end concept — live
            checkout connects to Shopify during production.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              to="/privacy-policy"
              className="sweep-link text-[0.62rem] uppercase tracking-[0.2em] text-parchment/55 transition-colors hover:text-brasslite"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="sweep-link text-[0.62rem] uppercase tracking-[0.2em] text-parchment/55 transition-colors hover:text-brasslite"
            >
              Terms
            </Link>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.2em] text-parchment/55 transition-colors hover:text-brasslite"
            >
              Back to top
              <ArrowUp
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-1"
                strokeWidth={2}
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
