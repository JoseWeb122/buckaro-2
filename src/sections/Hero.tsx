import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import { EDITORIAL, PRODUCTS, formatPrice } from "@/data/catalog";
import { BRAND } from "@/data/site";
import { SmartImage } from "@/components/ui";

const featured = PRODUCTS[0];

export function Hero() {
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setLoaded(true), 80);
    return () => window.clearTimeout(t);
  }, []);

  /* gentle parallax on desktop pointers only */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    if (reduce || coarse || !wide) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 900);
        if (imageRef.current) {
          imageRef.current.style.transform = `translate3d(0, ${y * 0.22}px, 0) scale(${
            1 + y * 0.00012
          })`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToCollection = () => {
    const el = document.getElementById("collection");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.location.hash = "#collection";
  };

  const stage = (delay: number) =>
    ({
      transitionDelay: `${delay}ms`,
      opacity: loaded ? 1 : 0,
      transform: loaded ? "none" : "translateY(26px)",
      transition:
        "opacity 1.05s cubic-bezier(.22,1,.36,1), transform 1.05s cubic-bezier(.22,1,.36,1)",
    }) as const;

  return (
    <section
      id="top"
      className="grain relative isolate flex min-h-[92svh] flex-col overflow-hidden bg-espresso lg:min-h-[94vh]"
      aria-label="Buckaroo Hatters introduction"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div ref={imageRef} className="absolute inset-x-0 -top-[6%] h-[115%] will-change-transform">
          <picture>
            <source media="(min-width: 768px)" srcSet={EDITORIAL.hero} />
            <img
              src={EDITORIAL.heroMobile}
              alt="A hatter in a beige western hat leaning on a wooden table, lit by a single window in a dark room"
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover object-[62%_38%]"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "scale(1)" : "scale(1.08)",
                transition:
                  "opacity 1.8s cubic-bezier(.22,1,.36,1), transform 2.4s cubic-bezier(.22,1,.36,1)",
              }}
            />
          </picture>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-espresso via-espresso/80 to-espresso/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-transparent to-espresso/70" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_20%_20%,transparent_20%,rgba(33,23,17,0.55)_78%)]" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center px-5 pb-28 pt-36 sm:px-8 lg:px-12 lg:pb-32 lg:pt-44">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4" style={stage(120)}>
            <span aria-hidden="true" className="h-px w-10 bg-brass sm:w-16" />
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.42em] text-brass sm:text-[0.68rem]">
              Handcrafted Western Heritage
            </p>
          </div>

          <h1
            className="mt-7 font-display text-[clamp(2.7rem,8.4vw,7.1rem)] font-light leading-[0.94] tracking-[-0.02em] text-parchment"
            style={stage(240)}
          >
            <span className="block">A Hat as Unique</span>
            <span className="block">
              as the <em className="font-normal italic text-brasslite">Man</em> Who
            </span>
            <span className="block">Wears It.</span>
          </h1>

          <p
            className="mt-8 max-w-xl text-[0.98rem] leading-[1.85] text-parchment/75 sm:text-[1.06rem]"
            style={stage(380)}
          >
            Discover distinctive Western hats and handcrafted accessories shaped by
            tradition, individuality, and a passion for authentic Western style.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4" style={stage(500)}>
            <button
              type="button"
              onClick={scrollToCollection}
              className="fill-btn group inline-flex items-center justify-center gap-3 bg-brass px-8 py-4.5 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-espresso transition-colors duration-300 hover:text-brasslite"
              style={{ ["--fill" as string]: "#211711" }}
            >
              <span className="relative z-10">Explore the Collection</span>
              <ArrowRight
                className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
              />
            </button>
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-3 border border-parchment/35 px-8 py-4.5 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-parchment transition-all duration-300 hover:border-brass hover:bg-parchment/5 hover:text-brasslite"
            >
              Discover Custom Hats
              <span
                aria-hidden="true"
                className="h-1 w-1 rotate-45 bg-brass transition-transform duration-300 group-hover:rotate-[135deg]"
              />
            </Link>
          </div>

          <p
            className="mt-9 text-[0.62rem] uppercase tracking-[0.3em] text-parchment/50"
            style={stage(620)}
          >
            {BRAND.tagline}
          </p>
        </div>
      </div>

      {/* Featured product chip */}
      <Link
        to={`/products/${featured.slug}`}
        className="group absolute bottom-24 right-5 hidden w-[19rem] items-center gap-4 border border-parchment/15 bg-espresso/70 p-3 backdrop-blur-md transition-all duration-500 hover:border-brass/60 hover:bg-espresso/85 lg:bottom-32 lg:right-12 lg:flex xl:w-[21rem]"
        style={stage(760)}
      >
        <SmartImage
          src={featured.images[0]}
          alt={featured.alt}
          wrapperClassName="h-20 w-20 shrink-0"
          className="transition-transform duration-700 group-hover:scale-110"
          eager
        />
        <span className="min-w-0 flex-1">
          <span className="block text-[0.55rem] uppercase tracking-[0.3em] text-brass">
            Now in the shop
          </span>
          <span className="mt-1.5 block truncate font-display text-[1.15rem] text-parchment">
            {featured.name}
          </span>
          <span className="mt-1 flex items-center gap-2 text-[0.72rem] text-parchment/60">
            {formatPrice(featured.price)}
            <ArrowRight
              className="h-3.5 w-3.5 text-brass transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2}
            />
          </span>
        </span>
      </Link>

      {/* Scroll hint */}
      <button
        type="button"
        onClick={scrollToCollection}
        className="absolute bottom-7 left-5 flex items-center gap-3 text-parchment/55 transition-colors hover:text-brass sm:left-8 lg:left-12"
        aria-label="Scroll to the collection"
      >
        <span className="relative flex h-11 w-6 items-start justify-center rounded-full border border-parchment/30 p-1.5">
          <span className="h-2 w-[3px] animate-scroll-hint rounded-full bg-brass" />
        </span>
        <span className="text-[0.55rem] uppercase tracking-[0.34em]">Scroll</span>
        <ChevronDown className="h-3.5 w-3.5 animate-scroll-hint" strokeWidth={1.6} />
      </button>
    </section>
  );
}

export function HeroMarquee() {
  const names = PRODUCTS.filter((p) => p.category === "hat-bands").map(
    (p) => p.name.replace("The ", "").replace(" Hat Band", ""),
  );
  const line = [...names, ...names];
  return (
    <div className="marquee-mask relative overflow-hidden border-y border-brass/20 bg-espresso py-4">
      <div className="marquee-track animate-marquee items-center gap-10 whitespace-nowrap will-change-transform">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center gap-10" aria-hidden={dup === 1}>
            {line.map((name, i) => (
              <span key={`${dup}-${i}`} className="flex items-center gap-10">
                <span className="font-display text-[1.15rem] italic tracking-wide text-parchment/70">
                  The {name}
                </span>
                <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-brass/70" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
