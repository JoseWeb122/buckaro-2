import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Eye, Plus } from "lucide-react";
import { CATEGORY_LABEL, formatPrice, type Product } from "@/data/catalog";
import { useStore } from "@/store/StoreContext";
import { cn } from "@/utils/cn";
import { Reveal, SmartImage } from "@/components/ui";

export function ProductCard({
  product,
  index = 0,
  compact = false,
}: {
  product: Product;
  index?: number;
  compact?: boolean;
}) {
  const { addToCart, openQuickView } = useStore();
  const [hover, setHover] = useState(false);
  const isInquiry = product.kind === "inquiry";
  const onSale = product.compareAtPrice != null && product.price != null;

  return (
    <Reveal
      delay={Math.min(index, 7) * 70}
      direction="scale"
      className="group relative flex h-full flex-col"
    >
      <article
        className="relative flex h-full flex-col bg-ivory transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-32px_rgba(33,23,17,0.55)]"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* Image */}
        <div
          className={cn(
            "relative overflow-hidden bg-parchment",
            compact ? "aspect-[4/3.4]" : "aspect-[4/5]",
          )}
        >
          <Link
            to={`/products/${product.slug}`}
            className="absolute inset-0 z-10"
            aria-label={`View ${product.name}`}
          >
            <span className="sr-only">{product.name}</span>
          </Link>

          <SmartImage
            src={product.images[0]}
            alt={product.alt}
            wrapperClassName="absolute inset-0 h-full w-full"
            className={cn(
              "transition-all duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)]",
              hover ? "scale-[1.07] opacity-0" : "scale-100 opacity-100",
            )}
          />
          {product.images[1] && (
            <SmartImage
              src={product.images[1]}
              alt={`${product.name} — alternate view`}
              wrapperClassName="absolute inset-0 h-full w-full"
              className={cn(
                "transition-all duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)]",
                hover ? "scale-105 opacity-100" : "scale-100 opacity-0",
              )}
            />
          )}

          {/* badges */}
          <div className="pointer-events-none absolute left-0 top-0 z-20 flex flex-col items-start gap-1.5 p-3">
            {product.badge && (
              <span
                className={cn(
                  "px-2.5 py-1 text-[0.52rem] font-bold uppercase tracking-[0.22em]",
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

          {product.swatch && !isInquiry && (
            <span className="pointer-events-none absolute right-3 top-3 z-20 flex gap-1">
              {product.swatch.map((c) => (
                <span
                  key={c}
                  className="h-2.5 w-2.5 rounded-full ring-1 ring-espresso/20"
                  style={{ background: c }}
                  aria-hidden="true"
                />
              ))}
            </span>
          )}

          {/* actions */}
          <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col gap-2 p-3 opacity-100 transition-all duration-500 lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100">
            {isInquiry ? (
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 bg-espresso px-4 py-3 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-brasslite transition-colors duration-300 hover:bg-saddle"
              >
                Start a custom hat inquiry
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
              </Link>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => addToCart(product)}
                  className="flex flex-1 items-center justify-center gap-2 bg-espresso px-4 py-3 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-parchment transition-colors duration-300 hover:bg-brass hover:text-espresso"
                >
                  <Plus className="h-3.5 w-3.5" strokeWidth={2.4} />
                  Add to Cart
                </button>
                <button
                  type="button"
                  onClick={() => openQuickView(product)}
                  className="flex items-center justify-center border border-espresso/25 bg-parchment/95 px-3.5 py-3 text-espresso transition-colors duration-300 hover:border-brass hover:bg-brass hover:text-espresso"
                  aria-label={`Quick view ${product.name}`}
                  title="Quick view"
                >
                  <Eye className="h-4 w-4" strokeWidth={1.6} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-1 flex-col border-t border-espresso/10 px-4 py-4">
          <p className="text-[0.55rem] font-semibold uppercase tracking-[0.28em] text-tobacco">
            {CATEGORY_LABEL[product.category]}
          </p>
          <h3 className="mt-2 font-display text-[1.3rem] leading-snug text-espresso">
            <Link to={`/products/${product.slug}`} className="sweep-link">
              {product.name}
            </Link>
          </h3>
          {!compact && (
            <p className="mt-2 line-clamp-2 text-[0.8rem] leading-relaxed text-charcoal/65">
              {product.description}
            </p>
          )}
          <div className="mt-auto flex items-baseline gap-2.5 pt-4">
            {isInquiry ? (
              <span className="font-display text-[1.05rem] italic text-saddle">
                Quoted individually
              </span>
            ) : (
              <>
                <span className="tabular font-display text-[1.35rem] text-espresso">
                  {formatPrice(product.price)}
                </span>
                {onSale && (
                  <span className="tabular text-[0.78rem] text-charcoal/40 line-through">
                    {formatPrice(product.compareAtPrice ?? null)}
                  </span>
                )}
                <span className="ml-auto text-[0.52rem] uppercase tracking-[0.2em] text-charcoal/40">
                  USD
                </span>
              </>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
