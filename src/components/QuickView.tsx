import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Minus, Plus, X } from "lucide-react";
import { CATEGORY_LABEL, formatPrice } from "@/data/catalog";
import { useStore } from "@/store/StoreContext";
import { cn } from "@/utils/cn";
import { Overlay, SmartImage } from "@/components/ui";

export function QuickView() {
  const { quickView, closeQuickView, addToCart } = useStore();
  const [imageIndex, setImageIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setImageIndex(0);
    setQty(1);
    setAdded(false);
  }, [quickView?.slug]);

  const product = quickView;
  const isInquiry = product?.kind === "inquiry";

  return (
    <Overlay
      open={!!product}
      onClose={closeQuickView}
      label={product ? `Quick view: ${product.name}` : "Quick view"}
      align="center"
      className="max-h-[92svh] w-full max-w-[62rem] overflow-hidden bg-parchment shadow-[0_50px_120px_-50px_rgba(0,0,0,0.9)] animate-[fade-up_.45s_cubic-bezier(.22,1,.36,1)]"
    >
      {product && (
        <div className="grid max-h-[92svh] grid-cols-1 overflow-y-auto md:grid-cols-[1.05fr_1fr] md:overflow-hidden">
          {/* Gallery */}
          <div className="relative bg-espresso/8 p-4 md:p-6">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-parchment md:aspect-[4/4.6]">
              {product.images.map((src, i) => (
                <SmartImage
                  key={src}
                  src={src}
                  alt={i === 0 ? product.alt : `${product.name} — view ${i + 1}`}
                  wrapperClassName={cn(
                    "absolute inset-0 h-full w-full transition-opacity duration-700",
                    i === imageIndex ? "opacity-100" : "opacity-0",
                  )}
                  eager
                />
              ))}
            </div>
            {product.images.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
                {product.images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setImageIndex(i)}
                    aria-label={`Show image ${i + 1} of ${product.name}`}
                    aria-current={i === imageIndex}
                    className={cn(
                      "h-16 w-14 shrink-0 overflow-hidden border transition-all duration-300",
                      i === imageIndex
                        ? "border-brass opacity-100"
                        : "border-espresso/15 opacity-60 hover:opacity-100",
                    )}
                  >
                    <SmartImage src={src} alt="" wrapperClassName="h-full w-full" eager />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="relative flex flex-col p-6 md:max-h-[92svh] md:overflow-y-auto md:p-9">
            <button
              type="button"
              onClick={closeQuickView}
              className="absolute right-4 top-4 rounded-full p-2 text-charcoal/45 transition-colors hover:bg-espresso hover:text-parchment md:right-6 md:top-6"
              aria-label="Close quick view"
            >
              <X className="h-5 w-5" strokeWidth={1.6} />
            </button>

            <p className="text-[0.55rem] font-semibold uppercase tracking-[0.3em] text-tobacco">
              {CATEGORY_LABEL[product.category]}
              {product.badge ? ` · ${product.badge}` : ""}
            </p>
            <h2 className="mt-3 max-w-[16ch] pr-10 font-display text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.05] text-espresso">
              {product.name}
            </h2>

            <div className="mt-4 flex items-baseline gap-3">
              {isInquiry ? (
                <span className="font-display text-[1.3rem] italic text-saddle">
                  Quoted individually
                </span>
              ) : (
                <>
                  <span className="tabular font-display text-[1.9rem] leading-none text-espresso">
                    {formatPrice(product.price)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="tabular text-[0.9rem] text-charcoal/40 line-through">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                  )}
                  <span className="text-[0.55rem] uppercase tracking-[0.2em] text-charcoal/40">
                    USD
                  </span>
                </>
              )}
            </div>

            <span aria-hidden="true" className="my-6 block h-px w-full bg-espresso/12" />

            <p className="text-[0.92rem] leading-[1.85] text-charcoal/75">
              {product.description}
            </p>

            <ul className="mt-5 space-y-2">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-[0.85rem] text-charcoal/70">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brass" strokeWidth={2.2} />
                  {h}
                </li>
              ))}
            </ul>

            {product.colour && (
              <p className="mt-5 flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.2em] text-charcoal/55">
                {product.swatch && (
                  <span className="flex gap-1">
                    {product.swatch.map((c) => (
                      <span
                        key={c}
                        className="h-3.5 w-3.5 rounded-full ring-1 ring-espresso/15"
                        style={{ background: c }}
                        aria-hidden="true"
                      />
                    ))}
                  </span>
                )}
                {product.colour}
              </p>
            )}

            {/* Purchase row */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              {!isInquiry && (
                <div className="flex items-center border border-espresso/20 bg-ivory/70">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="px-3.5 py-3.5 text-espresso/70 transition-colors hover:bg-espresso hover:text-parchment"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" strokeWidth={2} />
                  </button>
                  <span
                    className="min-w-[2.6rem] text-center text-[0.9rem] font-semibold tabular text-espresso"
                    aria-live="polite"
                  >
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.min(99, q + 1))}
                    className="px-3.5 py-3.5 text-espresso/70 transition-colors hover:bg-espresso hover:text-parchment"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" strokeWidth={2} />
                  </button>
                </div>
              )}

              {isInquiry ? (
                <Link
                  to="/contact"
                  onClick={closeQuickView}
                  className="group flex flex-1 items-center justify-center gap-2 bg-espresso px-6 py-4 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-parchment transition-colors hover:bg-brass hover:text-espresso"
                >
                  Inquire about this work
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
                    "flex flex-1 items-center justify-center gap-2 px-6 py-4 text-[0.68rem] font-bold uppercase tracking-[0.2em] transition-colors duration-300",
                    added
                      ? "bg-saddle text-parchment"
                      : "bg-espresso text-parchment hover:bg-brass hover:text-espresso",
                  )}
                >
                  {added ? (
                    <>
                      <Check className="h-4 w-4" strokeWidth={2.4} /> Added to bag
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" strokeWidth={2.4} /> Add to Cart
                    </>
                  )}
                </button>
              )}
            </div>

            <Link
              to={`/products/${product.slug}`}
              onClick={closeQuickView}
              className="sweep-link mt-5 inline-flex w-fit items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-saddle transition-colors hover:text-brass"
            >
              View full details <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
            </Link>

            <p className="mt-6 border-t border-espresso/10 pt-4 text-[0.68rem] leading-relaxed text-charcoal/50">
              Demo storefront — questions about fit, shipping or returns? Send an inquiry
              and the shop will confirm the details before you order.
            </p>
          </div>
        </div>
      )}
    </Overlay>
  );
}
