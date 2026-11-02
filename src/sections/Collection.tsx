import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  CATEGORIES,
  CATEGORY_LABEL,
  COLLECTIONS,
  PRODUCTS,
  matchesFilter,
  type CategoryId,
  type FilterId,
  type Product,
} from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";
import { Reveal, SectionHeading } from "@/components/ui";
import { cn } from "@/utils/cn";

type SortKey = "featured" | "price-asc" | "price-desc" | "az";

const SORTS: { id: SortKey; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price · Low to high" },
  { id: "price-desc", label: "Price · High to low" },
  { id: "az", label: "A – Z" },
];

type FilterOption = { id: FilterId; label: string; blurb: string };

const isFilterId = (v: string | null): v is FilterId =>
  !!v && (v === "all" || v in COLLECTIONS || CATEGORIES.some((c) => c.id === v));

export function Collection({
  id = "collection",
  eyebrow = "The Collection",
  title = "Find Your Western Signature",
  copy = "Explore distinctive hats and handcrafted accessories that bring character to your Western style.",
  limit,
  showHeading = true,
  syncUrl = true,
  initialCategory = "all",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  copy?: string;
  limit?: number;
  showHeading?: boolean;
  syncUrl?: boolean;
  initialCategory?: FilterId;
}) {
  const [params, setParams] = useSearchParams();
  const fromUrl = params.get("c");
  const [category, setCategory] = useState<FilterId>(
    isFilterId(fromUrl) ? fromUrl : initialCategory,
  );
  const [sort, setSort] = useState<SortKey>("featured");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (isFilterId(fromUrl)) setCategory(fromUrl);
  }, [fromUrl]);

  const setCat = (next: FilterId) => {
    setCategory(next);
    if (syncUrl) {
      const p = new URLSearchParams(params);
      if (next === "all") p.delete("c");
      else p.set("c", next);
      setParams(p, { replace: true });
    }
  };

  const visibleCategories = useMemo<FilterOption[]>(() => {
    const present = new Set<string>(PRODUCTS.map((p) => p.category));
    const base: FilterOption[] = CATEGORIES.filter(
      (c) => c.id === "all" || present.has(c.id),
    );
    if (category in COLLECTIONS) {
      const group = COLLECTIONS[category];
      return [
        ...base.filter(
          (c) => c.id === "all" || !group.categories.includes(c.id as CategoryId),
        ),
        { id: category, label: group.label, blurb: group.blurb },
      ];
    }
    return base;
  }, [category]);

  const results = useMemo(() => {
    let list: Product[] = PRODUCTS.filter(matchesFilter(category));
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((p) =>
        [p.name, p.description, CATEGORY_LABEL[p.category], p.colour ?? ""]
          .join(" ")
          .toLowerCase()
          .includes(q),
      );
    }
    const priced = (p: Product) => (p.price === null ? Number.POSITIVE_INFINITY : p.price);
    switch (sort) {
      case "price-asc":
        return [...list].sort((a, b) => priced(a) - priced(b));
      case "price-desc":
        return [...list].sort((a, b) => priced(b) - priced(a));
      case "az":
        return [...list].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return list;
    }
  }, [category, sort, query]);

  const shown = limit ? results.slice(0, limit) : results;
  const active = visibleCategories.find((c) => c.id === category);

  return (
    <section
      id={id}
      className="parchment-wash grain relative scroll-mt-28 overflow-hidden py-20 sm:py-24 lg:py-32"
    >
      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        {showHeading && (
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            copy={copy}
            action={
              <Reveal delay={240} className="shrink-0">
                <p className="max-w-[15rem] border-l border-brass/40 pl-4 font-display text-[1.05rem] italic leading-snug text-saddle">
                  {active?.blurb}
                </p>
              </Reveal>
            }
          />
        )}

        {/* Filters */}
        <div className="mt-12 flex flex-col gap-4 border-y border-espresso/12 py-4 lg:mt-16 lg:flex-row lg:items-center lg:justify-between">
          <div className="no-scrollbar -mx-1 flex items-center gap-1 overflow-x-auto px-1 pb-1 lg:pb-0">
            {visibleCategories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCat(c.id)}
                aria-pressed={category === c.id}
                className={cn(
                  "relative shrink-0 px-4 py-2.5 text-[0.62rem] font-bold uppercase tracking-[0.2em] transition-all duration-300",
                  category === c.id
                    ? "bg-espresso text-brasslite"
                    : "text-charcoal/60 hover:bg-espresso/8 hover:text-espresso",
                )}
              >
                {c.label}
                <span className="ml-2 text-[0.55rem] tracking-normal opacity-55 tabular">
                  {PRODUCTS.filter(matchesFilter(c.id)).length}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <label className="relative flex flex-1 items-center lg:w-64 lg:flex-none">
              <Search
                className="pointer-events-none absolute left-3 h-4 w-4 text-charcoal/40"
                strokeWidth={1.6}
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter this collection…"
                className="w-full border border-espresso/15 bg-ivory/70 py-2.5 pl-9 pr-8 text-[0.8rem] text-espresso placeholder:text-charcoal/40 transition-colors focus:border-brass focus:outline-none"
                aria-label="Filter products in this collection"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-2 text-charcoal/45 transition-colors hover:text-espresso"
                  aria-label="Clear collection filter"
                >
                  <X className="h-4 w-4" strokeWidth={1.7} />
                </button>
              )}
            </label>

            <label className="relative flex items-center">
              <SlidersHorizontal
                className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-charcoal/45"
                strokeWidth={1.6}
              />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="appearance-none border border-espresso/15 bg-ivory/70 py-2.5 pl-9 pr-8 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-charcoal/75 transition-colors hover:text-espresso focus:border-brass focus:outline-none"
                aria-label="Sort products"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <p className="mt-4 text-[0.6rem] uppercase tracking-[0.24em] text-charcoal/45 tabular">
          Showing {shown.length} of {results.length}
          {query && <> for “{query}”</>}
        </p>

        {/* Grid */}
        {shown.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-9 min-[480px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {shown.map((product, i) => (
              <ProductCard key={product.slug} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="mt-16 border border-dashed border-espresso/25 bg-ivory/60 px-6 py-20 text-center">
            <p className="font-display text-[1.7rem] text-espresso">Nothing matches that yet</p>
            <p className="mx-auto mt-3 max-w-md text-[0.88rem] leading-relaxed text-charcoal/65">
              Try another word, or browse everything currently listed in the shop.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCat("all");
              }}
              className="mt-7 inline-flex items-center gap-2 border border-espresso/30 px-6 py-3 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-espresso transition-colors hover:bg-espresso hover:text-brasslite"
            >
              <X className="h-3.5 w-3.5" strokeWidth={2.2} /> Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
