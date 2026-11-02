import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryItem } from "@/data/site";
import { cn } from "@/utils/cn";

export function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const open = index !== null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(((index as number) + 1) % items.length);
      if (e.key === "ArrowLeft")
        onNavigate(((index as number) - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, index, items.length, onClose, onNavigate]);

  if (!open || index === null) return null;
  const item = items[index];

  return (
    <div
      className="fixed inset-0 z-[97] flex flex-col bg-espresso/96 backdrop-blur-md animate-[fade-up_.3s_ease-out]"
      role="dialog"
      aria-modal="true"
      aria-label={`Gallery image ${index + 1} of ${items.length}: ${item.caption}`}
    >
      {/* click-outside-to-close surface (sits beneath the content, above the backdrop) */}
      <button
        type="button"
        aria-label="Close gallery viewer"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-zoom-out"
        tabIndex={-1}
      />

      <div className="relative z-10 flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <p className="text-[0.55rem] font-semibold uppercase tracking-[0.3em] text-brass tabular">
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </p>
        <button
          type="button"
          onClick={onClose}
          autoFocus
          className="rounded-full p-2.5 text-parchment/70 transition-colors hover:bg-parchment/10 hover:text-brasslite"
          aria-label="Close gallery viewer (Esc)"
        >
          <X className="h-6 w-6" strokeWidth={1.4} />
        </button>
      </div>

      {/* click-outside-to-close surface */}
      <button
        type="button"
        aria-label="Close gallery viewer"
        onClick={onClose}
        className="absolute inset-0 -z-10 h-full w-full cursor-zoom-out"
        tabIndex={-1}
      />

      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-4 sm:px-16">
        <button
          type="button"
          onClick={() => onNavigate((index - 1 + items.length) % items.length)}
          className="absolute left-2 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-parchment/25 text-parchment/80 transition-all duration-300 hover:border-brass hover:bg-brass hover:text-espresso sm:left-6"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={1.6} />
        </button>

        <figure
          key={item.src}
          className="flex max-h-full flex-col items-center animate-[fade-up_.45s_cubic-bezier(.22,1,.36,1)]"
        >
          <img
            src={item.src}
            alt={item.alt}
            className="max-h-[68svh] w-auto max-w-full border border-parchment/10 object-contain shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]"
          />
          <figcaption className="mt-4 text-center">
            <span className="block font-display text-[1.3rem] italic text-parchment">
              {item.caption}
            </span>
            <span className="mt-1.5 block text-[0.55rem] uppercase tracking-[0.26em] text-parchment/45">
              {item.source === "shop" ? "Real shop photography" : "Editorial imagery"}
            </span>
          </figcaption>
        </figure>

        <button
          type="button"
          onClick={() => onNavigate((index + 1) % items.length)}
          className="absolute right-2 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-parchment/25 text-parchment/80 transition-all duration-300 hover:border-brass hover:bg-brass hover:text-espresso sm:right-6"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={1.6} />
        </button>
      </div>

      <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 pb-5 sm:justify-center sm:px-8">
        {items.map((g, i) => (
          <button
            key={g.src}
            type="button"
            onClick={() => onNavigate(i)}
            aria-label={`View ${g.caption}`}
            aria-current={i === index}
            className={cn(
              "h-12 w-11 shrink-0 overflow-hidden border transition-all duration-300",
              i === index
                ? "border-brass opacity-100"
                : "border-parchment/15 opacity-45 hover:opacity-90",
            )}
          >
            <img src={g.src} alt="" loading="lazy" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
