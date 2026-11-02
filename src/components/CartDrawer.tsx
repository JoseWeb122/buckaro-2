import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useStore } from "@/store/StoreContext";
import { formatPrice } from "@/data/catalog";
import { DEMO_NOTE } from "@/data/site";
import { cn } from "@/utils/cn";
import { SmartImage } from "@/components/ui";

export function CartDrawer() {
  const {
    cart,
    cartOpen,
    closeCart,
    updateQty,
    removeFromCart,
    subtotal,
    cartCount,
    hasUnpriced,
    pushToast,
  } = useStore();
  const panelRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!cartOpen) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cartOpen, closeCart]);

  /* Body scroll is locked centrally by <StoreProvider> while any overlay is open. */

  return (
    <div
      className={cn(
        "fixed inset-0 z-[95]",
        cartOpen ? "pointer-events-auto" : "pointer-events-none invisible",
      )}
      aria-hidden={!cartOpen}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close bag"
        onClick={closeCart}
        className={cn(
          "absolute inset-0 h-full w-full cursor-default bg-espresso/75 backdrop-blur-[3px] transition-opacity duration-500",
          cartOpen ? "opacity-100" : "opacity-0",
        )}
      />

      <aside
        ref={panelRef}
        role="dialog"
        aria-modal={cartOpen}
        aria-label="Shopping bag"
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-[27rem] flex-col bg-parchment shadow-[-30px_0_70px_-40px_rgba(0,0,0,0.9)] transition-transform duration-[550ms] ease-[cubic-bezier(.22,1,.36,1)]",
          cartOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Head */}
        <header className="leather grain relative flex items-center justify-between gap-4 px-6 py-5">
          <div className="relative flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-brass" strokeWidth={1.5} />
            <div>
              <p className="font-display text-[1.35rem] leading-none text-parchment">Your Bag</p>
              <p className="mt-1.5 text-[0.55rem] uppercase tracking-[0.28em] text-parchment/55 tabular">
                {cartCount} item{cartCount === 1 ? "" : "s"}
              </p>
            </div>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={closeCart}
            className="relative rounded-full p-2 text-parchment/70 transition-colors hover:bg-parchment/10 hover:text-brasslite"
            aria-label="Close bag"
          >
            <X className="h-5 w-5" strokeWidth={1.6} />
          </button>
        </header>

        {/* Lines */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-6">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-16 text-center">
              <span className="flex h-20 w-20 items-center justify-center rounded-full border border-dashed border-espresso/25">
                <ShoppingBag className="h-7 w-7 text-espresso/30" strokeWidth={1.3} />
              </span>
              <p className="mt-6 font-display text-[1.6rem] text-espresso">Your bag is empty</p>
              <p className="mt-2 max-w-[16rem] text-[0.85rem] leading-relaxed text-charcoal/60">
                Nine hand-tooled hat bands and a few leather goods are waiting in the shop.
              </p>
              <Link
                to="/shop"
                onClick={closeCart}
                className="group mt-7 inline-flex items-center gap-2 bg-espresso px-6 py-3.5 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-parchment transition-colors hover:bg-brass hover:text-espresso"
              >
                Return to shopping
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2}
                />
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-espresso/10">
              {cart.map((line) => (
                <li key={line.slug} className="flex gap-4 py-5 animate-fade-up">
                  <Link
                    to={`/products/${line.slug}`}
                    onClick={closeCart}
                    className="group shrink-0"
                    aria-label={`View ${line.name}`}
                  >
                    <SmartImage
                      src={line.image}
                      alt={line.alt}
                      wrapperClassName="h-24 w-20 border border-espresso/10"
                      className="transition-transform duration-700 group-hover:scale-110"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <Link
                        to={`/products/${line.slug}`}
                        onClick={closeCart}
                        className="sweep-link font-display text-[1.12rem] leading-snug text-espresso"
                      >
                        {line.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeFromCart(line.slug)}
                        className="shrink-0 p-1 text-charcoal/35 transition-colors hover:text-saddle"
                        aria-label={`Remove ${line.name} from bag`}
                      >
                        <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                      </button>
                    </div>

                    <p className="mt-1 text-[0.68rem] uppercase tracking-[0.16em] text-charcoal/45">
                      {line.price === null
                        ? "Price confirmed on inquiry"
                        : `${formatPrice(line.price)} each`}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center border border-espresso/15 bg-ivory/60">
                        <button
                          type="button"
                          onClick={() => updateQty(line.slug, line.qty - 1)}
                          className="px-2.5 py-2 text-espresso/70 transition-colors hover:bg-espresso hover:text-parchment"
                          aria-label={`Decrease quantity of ${line.name}`}
                        >
                          <Minus className="h-3.5 w-3.5" strokeWidth={2} />
                        </button>
                        <span className="min-w-[2.2rem] text-center text-[0.82rem] font-semibold tabular text-espresso">
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQty(line.slug, line.qty + 1)}
                          className="px-2.5 py-2 text-espresso/70 transition-colors hover:bg-espresso hover:text-parchment"
                          aria-label={`Increase quantity of ${line.name}`}
                        >
                          <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                        </button>
                      </div>
                      <span className="tabular font-display text-[1.2rem] text-espresso">
                        {line.price === null ? "—" : formatPrice(line.price * line.qty)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <footer className="border-t border-espresso/12 bg-ivory/70 px-6 py-5">
          <div className="flex items-baseline justify-between">
            <span className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-charcoal/60">
              Subtotal
            </span>
            <span className="tabular font-display text-[1.9rem] leading-none text-espresso">
              {formatPrice(subtotal)}
            </span>
          </div>

          {hasUnpriced && (
            <p className="mt-3 border-l-2 border-brass pl-3 text-[0.75rem] leading-relaxed text-charcoal/70">
              One item in your bag has no published price — its final price needs to be
              confirmed before checkout, so it is excluded from this subtotal.
            </p>
          )}

          <p className="mt-3 text-[0.68rem] leading-relaxed text-charcoal/55">
            {DEMO_NOTE} Taxes and shipping are calculated on the live store.
          </p>

          <div className="mt-5 flex flex-col gap-2.5">
            <button
              type="button"
              disabled={cart.length === 0}
              onClick={() =>
                pushToast({
                  tone: "info",
                  title: "Demo checkout",
                  body: "Live Shopify checkout is connected during production.",
                })
              }
              className="fill-btn group flex items-center justify-center gap-2 bg-espresso px-6 py-4 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-parchment transition-colors duration-300 hover:text-brasslite disabled:opacity-40"
              style={{ ["--fill" as string]: "#65432d" }}
            >
              <span className="relative z-10">Checkout · Demo Mode</span>
              <ArrowRight
                className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
              />
            </button>
            <button
              type="button"
              onClick={closeCart}
              className="border border-espresso/20 px-6 py-3.5 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-charcoal/75 transition-colors hover:border-espresso hover:text-espresso"
            >
              Continue Shopping
            </button>
          </div>
        </footer>
      </aside>
    </div>
  );
}
