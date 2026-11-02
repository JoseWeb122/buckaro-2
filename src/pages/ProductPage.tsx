import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Hand,
  MessageCircle,
  Minus,
  Plus,
  ShieldCheck,
} from "lucide-react";
import {
  CATEGORY_LABEL,
  formatPrice,
  getProduct,
  getRelated,
  liveProductUrl,
} from "@/data/catalog";
import { useStore } from "@/store/StoreContext";
import { Breadcrumbs } from "@/components/PageHeader";
import { ProductCard } from "@/components/ProductCard";
import { Reveal, SmartImage } from "@/components/ui";
import { cn } from "@/utils/cn";
import { NotFound } from "@/pages/Misc";

export function ProductPage() {
  const { slug } = useParams();
  const product = getProduct(slug);
  const { addToCart, openCart } = useStore();
  const [imageIndex, setImageIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setImageIndex(0);
    setQty(1);
    setAdded(false);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  if (!product) return <NotFound />;

  const related = getRelated(product, 4);
  const isInquiry = product.kind === "inquiry";

  const step = (dir: number) =>
    setImageIndex(
      (i) => (i + dir + product.images.length) % product.images.length,
    );

  return (
    <>
      {/* Breadcrumb strip */}
      <div className="border-b border-espresso/10 bg-parchment pb-4 pt-28 sm:pt-32 lg:pt-36">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
          <Breadcrumbs
            tone="dark"
            trail={[
              { label: "Home", to: "/" },
              { label: "Shop", to: "/shop" },
              { label: CATEGORY_LABEL[product.category], to: `/shop?c=${product.category}` },
              { label: product.name },
            ]}
          />
        </div>
      </div>

      <section className="parchment-wash grain relative overflow-hidden py-12 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-5 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:px-12">
          {/* Gallery */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="group relative aspect-[4/5] w-full overflow-hidden bg-ivory sm:aspect-[4/4.4]">
              {product.images.map((src, i) => (
                <SmartImage
                  key={src}
                  src={src}
                  alt={i === 0 ? product.alt : `${product.name} — view ${i + 1}`}
                  wrapperClassName={cn(
                    "absolute inset-0 h-full w-full transition-opacity duration-700",
                    i === imageIndex ? "opacity-100" : "opacity-0",
                  )}
                  eager={i === 0}
                />
              ))}

              {product.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-espresso/20 bg-parchment/85 text-espresso opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-brass group-hover:opacity-100 focus-visible:opacity-100"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5" strokeWidth={1.7} />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-espresso/20 bg-parchment/85 text-espresso opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-brass group-hover:opacity-100 focus-visible:opacity-100"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" strokeWidth={1.7} />
                  </button>
                </>
              )}

              {product.badge && (
                <span
                  className={cn(
                    "absolute left-4 top-4 px-3 py-1.5 text-[0.55rem] font-bold uppercase tracking-[0.22em]",
                    product.badge === "Sale"
                      ? "bg-brass text-espresso"
                      : product.badge === "Made to order"
                        ? "bg-espresso text-brasslite"
                        : "bg-parchment/90 text-saddle",
                  )}
                >
                  {product.badge}
                </span>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="no-scrollbar mt-3 flex gap-2.5 overflow-x-auto pb-1">
                {product.images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setImageIndex(i)}
                    aria-label={`Show image ${i + 1} of ${product.images.length}`}
                    aria-current={i === imageIndex}
                    className={cn(
                      "h-20 w-16 shrink-0 overflow-hidden border transition-all duration-300 sm:h-24 sm:w-20",
                      i === imageIndex
                        ? "border-brass opacity-100"
                        : "border-espresso/15 opacity-55 hover:opacity-95",
                    )}
                  >
                    <SmartImage src={src} alt="" wrapperClassName="h-full w-full" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <p className="text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-tobacco">
              {CATEGORY_LABEL[product.category]}
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.2rem,5vw,3.6rem)] font-light leading-[1.02] tracking-[-0.015em] text-espresso">
              {product.name}
            </h1>

            <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-2">
              {isInquiry ? (
                <span className="font-display text-[1.5rem] italic text-saddle">
                  Quoted individually · made to order
                </span>
              ) : (
                <>
                  <span className="tabular font-display text-[2.2rem] leading-none text-espresso">
                    {formatPrice(product.price)}
                  </span>
                  {product.compareAtPrice && (
                    <>
                      <span className="tabular text-[1rem] text-charcoal/40 line-through">
                        {formatPrice(product.compareAtPrice)}
                      </span>
                      <span className="bg-brass px-2 py-1 text-[0.55rem] font-bold uppercase tracking-[0.2em] text-espresso">
                        Sale
                      </span>
                    </>
                  )}
                  <span className="text-[0.55rem] uppercase tracking-[0.2em] text-charcoal/40">
                    USD
                  </span>
                </>
              )}
            </div>

            <span aria-hidden="true" className="my-7 block h-px w-full bg-espresso/12" />

            <p className="max-w-xl text-[1rem] leading-[1.9] text-charcoal/78">
              {product.description}
            </p>

            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {product.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2.5 text-[0.86rem] leading-relaxed text-charcoal/72"
                >
                  <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-brass" strokeWidth={2.2} />
                  {h}
                </li>
              ))}
            </ul>

            {product.colour && (
              <p className="mt-7 flex items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-charcoal/60">
                {product.swatch && (
                  <span className="flex gap-1.5">
                    {product.swatch.map((c) => (
                      <span
                        key={c}
                        className="h-4 w-4 rounded-full ring-1 ring-espresso/15"
                        style={{ background: c }}
                        aria-hidden="true"
                      />
                    ))}
                  </span>
                )}
                Colourway — {product.colour}
              </p>
            )}

            {/* Purchase */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              {!isInquiry && (
                <div className="flex items-center border border-espresso/20 bg-ivory/70">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="px-4 py-4 text-espresso/70 transition-colors hover:bg-espresso hover:text-parchment"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" strokeWidth={2} />
                  </button>
                  <span
                    className="min-w-[3rem] text-center text-[0.95rem] font-semibold tabular text-espresso"
                    aria-live="polite"
                  >
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.min(99, q + 1))}
                    className="px-4 py-4 text-espresso/70 transition-colors hover:bg-espresso hover:text-parchment"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" strokeWidth={2} />
                  </button>
                </div>
              )}

              {isInquiry ? (
                <Link
                  to={`/contact?interest=${product.slug}`}
                  className="group flex flex-1 items-center justify-center gap-3 bg-espresso px-8 py-4.5 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-parchment transition-colors hover:bg-brass hover:text-espresso"
                >
                  Start a custom hat inquiry
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={2}
                  />
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    addToCart(product, qty);
                    setAdded(true);
                    window.setTimeout(() => setAdded(false), 2200);
                  }}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-3 px-8 py-4.5 text-[0.7rem] font-bold uppercase tracking-[0.2em] transition-colors duration-300",
                    added
                      ? "bg-saddle text-parchment"
                      : "bg-espresso text-parchment hover:bg-brass hover:text-espresso",
                  )}
                >
                  {added ? (
                    <>
                      <Check className="h-4 w-4" strokeWidth={2.4} /> Added — view bag
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" strokeWidth={2.4} /> Add to Cart
                    </>
                  )}
                </button>
              )}
            </div>

            {added && !isInquiry && (
              <button
                type="button"
                onClick={openCart}
                className="sweep-link mt-4 w-fit text-[0.62rem] font-bold uppercase tracking-[0.2em] text-saddle transition-colors hover:text-brass"
              >
                Open your bag →
              </button>
            )}

            {/* Info rows */}
            <dl className="mt-10 divide-y divide-espresso/12 border-y border-espresso/12">
              {[
                {
                  icon: Hand,
                  term: "Handmade",
                  detail:
                    "Each piece is made by hand at Buckaroo Hatters. Photographs show the actual item listed.",
                },
                {
                  icon: ShieldCheck,
                  term: "Shipping & returns",
                  detail:
                    "Rates and returns are confirmed at checkout on the live store. Ask us anything before you order and we'll answer directly.",
                },
                {
                  icon: MessageCircle,
                  term: "Questions or custom work",
                  detail: "Send an inquiry with the shape, colour and details you have in mind.",
                },
              ].map(({ icon: Icon, term, detail }) => (
                <div key={term} className="flex gap-4 py-5">
                  <Icon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brass" strokeWidth={1.5} />
                  <div>
                    <dt className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-espresso">
                      {term}
                    </dt>
                    <dd className="mt-1.5 max-w-lg text-[0.85rem] leading-[1.8] text-charcoal/68">
                      {detail}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to={`/contact?interest=${product.slug}`}
                className="group inline-flex items-center justify-center gap-2 border border-espresso/25 px-6 py-3.5 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-espresso transition-colors hover:border-brass hover:bg-brass"
              >
                Ask about this piece
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2}
                />
              </Link>
              {product.shopifyHandle && (
                <a
                  href={liveProductUrl(product.shopifyHandle)}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center justify-center gap-2 px-2 py-3.5 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-charcoal/55 transition-colors hover:text-brass"
                >
                  View on the live store
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-ivory py-16 sm:py-20 lg:py-24" aria-label="Related products">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <Reveal>
              <div className="flex flex-col gap-4 border-b border-espresso/12 pb-6 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="font-display text-[clamp(1.8rem,3.6vw,2.7rem)] leading-tight text-espresso">
                  Pairs well with
                </h2>
                <Link
                  to="/shop"
                  className="sweep-link inline-flex items-center gap-2 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-saddle transition-colors hover:text-brass"
                >
                  View the whole shop <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
                </Link>
              </div>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-9 min-[480px]:grid-cols-2 lg:grid-cols-4">
              {related.map((p, i) => (
                <ProductCard key={p.slug} product={p} index={i} compact />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mobile sticky buy bar */}
      {!isInquiry && (
        <div className="fixed inset-x-0 bottom-0 z-[70] flex items-center gap-3 border-t border-brass/25 bg-espresso/97 px-4 py-3 backdrop-blur-md sm:hidden">
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-[1rem] text-parchment">{product.name}</p>
            <p className="tabular text-[0.72rem] text-brass">{formatPrice(product.price)}</p>
          </div>
          <button
            type="button"
            onClick={() => addToCart(product, qty)}
            className="shrink-0 bg-brass px-5 py-3 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-espresso transition-colors active:bg-brasslite"
          >
            Add to Cart
          </button>
        </div>
      )}
    </>
  );
}
