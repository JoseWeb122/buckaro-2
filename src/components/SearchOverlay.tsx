import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CornerDownLeft, Search, X } from "lucide-react";
import {
  CATEGORIES,
  CATEGORY_LABEL,
  formatPrice,
  searchProducts,
  type CategoryId,
} from "@/data/catalog";
import { useStore } from "@/store/StoreContext";
import { cn } from "@/utils/cn";
import { SmartImage } from "@/components/ui";

const POPULAR = ["Bandera", "basket weave", "black leather", "Herman Oak", "ear warmers"];

export function SearchOverlay() {
  const { searchOpen, closeSearch } = useStore();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();

  const results = useMemo(() => searchProducts(query), [query]);

  useEffect(() => {
    if (searchOpen) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 90);
      return () => window.clearTimeout(t);
    }
    setQuery("");
    setActive(0);
  }, [searchOpen]);

  useEffect(() => setActive(0), [query]);

  const go = (slug: string) => {
    closeSearch();
    navigate(`/products/${slug}`);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active].slug);
    }
  };

  useEffect(() => {
    const el = listRef.current?.querySelectorAll("li")[active];
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[96]",
        searchOpen ? "pointer-events-auto" : "pointer-events-none invisible",
      )}
      aria-hidden={!searchOpen}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close search"
        onClick={closeSearch}
        className={cn(
          "absolute inset-0 h-full w-full cursor-default bg-espresso/85 backdrop-blur-md transition-opacity duration-400",
          searchOpen ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        role="dialog"
        aria-modal={searchOpen}
        aria-label="Search the shop"
        className={cn(
          "grain leather absolute inset-x-0 top-0 max-h-[92svh] overflow-hidden border-b border-brass/25 transition-transform duration-[520ms] ease-[cubic-bezier(.22,1,.36,1)]",
          searchOpen ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <div className="mx-auto flex max-h-[92svh] max-w-[1100px] flex-col px-5 pb-8 pt-10 sm:px-8 lg:pt-14">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[0.58rem] font-semibold uppercase tracking-[0.34em] text-brass">
              Search the shop
            </p>
            <button
              type="button"
              onClick={closeSearch}
              className="rounded-full p-2 text-parchment/70 transition-colors hover:bg-parchment/10 hover:text-brasslite"
              aria-label="Close search (Esc)"
            >
              <X className="h-5 w-5" strokeWidth={1.6} />
            </button>
          </div>

          <div className="relative mt-5 flex items-center border-b border-parchment/25 pb-4 focus-within:border-brass">
            <Search
              className="mr-4 h-6 w-6 shrink-0 text-brass"
              strokeWidth={1.4}
              aria-hidden="true"
            />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKey}
              placeholder="Search hats, bands, leather…"
              className="w-full bg-transparent font-display text-[clamp(1.5rem,4.6vw,2.7rem)] leading-tight text-parchment placeholder:text-parchment/25 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
              aria-label="Search products"
              aria-controls="search-results"
              aria-activedescendant={
                results[active] ? `search-result-${results[active].slug}` : undefined
              }
              tabIndex={searchOpen ? 0 : -1}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="ml-3 shrink-0 text-[0.6rem] uppercase tracking-[0.2em] text-parchment/50 transition-colors hover:text-brasslite"
                tabIndex={searchOpen ? 0 : -1}
              >
                Clear
              </button>
            )}
          </div>

          {/* Suggestions */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[0.55rem] uppercase tracking-[0.24em] text-parchment/40">
              Popular
            </span>
            {POPULAR.map((term) => (
              <button
                key={term}
                type="button"
                tabIndex={searchOpen ? 0 : -1}
                onClick={() => setQuery(term)}
                className={cn(
                  "border px-3 py-1.5 text-[0.62rem] tracking-wide transition-all duration-300",
                  query.toLowerCase() === term.toLowerCase()
                    ? "border-brass bg-brass text-espresso"
                    : "border-parchment/20 text-parchment/70 hover:border-brass/70 hover:text-brasslite",
                )}
              >
                {term}
              </button>
            ))}
            <span className="mx-1 hidden h-4 w-px bg-parchment/20 sm:block" />
            {CATEGORIES.filter((c) => c.id !== "all").map((c) => (
              <button
                key={c.id}
                type="button"
                tabIndex={searchOpen ? 0 : -1}
                onClick={() => {
                  closeSearch();
                  navigate(`/shop?c=${c.id as CategoryId}`);
                }}
                className="text-[0.62rem] uppercase tracking-[0.18em] text-parchment/45 underline-offset-4 transition-colors hover:text-brasslite hover:underline"
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Results */}
          <div className="mt-7 min-h-[10rem] flex-1 overflow-y-auto overscroll-contain pr-1">
            {!query ? (
              <p className="max-w-md font-display text-[1.35rem] italic leading-relaxed text-parchment/50">
                Start typing — search covers product names, categories, colourways and
                descriptions across the whole shop.
              </p>
            ) : results.length === 0 ? (
              <div className="py-8">
                <p className="font-display text-[1.6rem] text-parchment">
                  No match for “{query}”
                </p>
                <p className="mt-2 max-w-md text-[0.88rem] leading-relaxed text-parchment/55">
                  The shop currently lists hand-tooled hat bands, a Herman Oak leather hat
                  holder, and custom hat ear warmers. Custom hats are made to order.
                </p>
                <button
                  type="button"
                  tabIndex={searchOpen ? 0 : -1}
                  onClick={() => {
                    closeSearch();
                    navigate("/contact");
                  }}
                  className="mt-5 inline-flex items-center gap-2 border border-brass/60 px-5 py-3 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-brasslite transition-colors hover:bg-brass hover:text-espresso"
                >
                  Ask about a custom hat <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                </button>
              </div>
            ) : (
              <>
                <p className="mb-3 text-[0.55rem] uppercase tracking-[0.26em] text-parchment/40 tabular">
                  {results.length} result{results.length === 1 ? "" : "s"} · ↑↓ to browse, ↵ to open
                </p>
                <ul ref={listRef} id="search-results" role="listbox" aria-label="Search results">
                  {results.map((p, i) => (
                    <li key={p.slug} id={`search-result-${p.slug}`} role="option" aria-selected={i === active}>
                      <button
                        type="button"
                        tabIndex={searchOpen ? 0 : -1}
                        onMouseEnter={() => setActive(i)}
                        onClick={() => go(p.slug)}
                        className={cn(
                          "flex w-full items-center gap-4 border-b border-parchment/10 px-2 py-3.5 text-left transition-colors duration-300",
                          i === active ? "bg-parchment/8" : "hover:bg-parchment/5",
                        )}
                      >
                        <SmartImage
                          src={p.images[0]}
                          alt={p.alt}
                          wrapperClassName="h-16 w-14 shrink-0 border border-parchment/10"
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-display text-[1.2rem] text-parchment">
                            {p.name}
                          </span>
                          <span className="mt-1 block text-[0.58rem] uppercase tracking-[0.22em] text-brass/80">
                            {CATEGORY_LABEL[p.category]}
                          </span>
                        </span>
                        <span className="shrink-0 text-right">
                          <span className="block tabular font-display text-[1.1rem] text-parchment">
                            {formatPrice(p.price)}
                          </span>
                          {p.compareAtPrice && (
                            <span className="block text-[0.68rem] text-parchment/40 line-through">
                              {formatPrice(p.compareAtPrice)}
                            </span>
                          )}
                        </span>
                        <CornerDownLeft
                          className={cn(
                            "h-4 w-4 shrink-0 transition-opacity",
                            i === active ? "text-brass opacity-100" : "opacity-0",
                          )}
                          strokeWidth={1.6}
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
