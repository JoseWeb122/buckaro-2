import { Check, Info, ShoppingBag, X } from "lucide-react";
import { useStore } from "@/store/StoreContext";
import { cn } from "@/utils/cn";

export function Toaster() {
  const { toasts, dismissToast, openCart } = useStore();

  return (
    <div
      className="pointer-events-none fixed bottom-4 right-4 z-[99] flex w-[min(23rem,calc(100vw-2rem))] flex-col gap-2.5 sm:bottom-6 sm:right-6"
      role="status"
      aria-live="polite"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "pointer-events-auto flex items-start gap-3 border-l-2 bg-espresso/96 p-3.5 pr-3 shadow-[0_24px_50px_-24px_rgba(0,0,0,0.85)] backdrop-blur-md animate-[fade-up_.4s_cubic-bezier(.22,1,.36,1)]",
            t.tone === "success" && "border-brass",
            t.tone === "info" && "border-tobacco",
            t.tone === "warn" && "border-saddle",
          )}
        >
          {t.image ? (
            <img
              src={t.image}
              alt=""
              loading="lazy"
              className="h-12 w-11 shrink-0 border border-parchment/15 object-cover"
            />
          ) : (
            <span
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border",
                t.tone === "success"
                  ? "border-brass/50 text-brass"
                  : "border-parchment/25 text-parchment/70",
              )}
            >
              {t.tone === "success" ? (
                <Check className="h-4 w-4" strokeWidth={2} />
              ) : (
                <Info className="h-4 w-4" strokeWidth={1.6} />
              )}
            </span>
          )}

          <div className="min-w-0 flex-1">
            <p className="font-display text-[1.05rem] leading-tight text-parchment">{t.title}</p>
            {t.body && (
              <p className="mt-1 truncate text-[0.76rem] leading-snug text-parchment/60">
                {t.body}
              </p>
            )}
            {t.tone === "success" && (
              <button
                type="button"
                onClick={() => {
                  dismissToast(t.id);
                  openCart();
                }}
                className="mt-2 inline-flex items-center gap-1.5 text-[0.55rem] font-bold uppercase tracking-[0.2em] text-brass transition-colors hover:text-brasslite"
              >
                <ShoppingBag className="h-3 w-3" strokeWidth={2} /> View bag
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => dismissToast(t.id)}
            className="shrink-0 p-1 text-parchment/40 transition-colors hover:text-parchment"
            aria-label="Dismiss notification"
          >
            <X className="h-4 w-4" strokeWidth={1.7} />
          </button>
        </div>
      ))}
    </div>
  );
}
