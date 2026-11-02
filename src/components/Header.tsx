import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, Search, ShoppingBag, X, ArrowUpRight } from "lucide-react";
import { BRAND, NAV, SOCIALS } from "@/data/site";
import { useStore } from "@/store/StoreContext";
import { cn } from "@/utils/cn";
import { FacebookIcon, InstagramIcon, Monogram } from "@/components/ui";

const ANNOUNCEMENTS = [
  BRAND.announcement,
  "Hand-tooled hat bands, made one at a time",
  "Custom hat inquiries welcome",
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [note, setNote] = useState(0);
  const { cartCount, bump, openCart, openSearch } = useStore();
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const id = window.setInterval(
      () => setNote((n) => (n + 1) % ANNOUNCEMENTS.length),
      5200,
    );
    return () => window.clearInterval(id);
  }, []);

  const solid = scrolled || !isHome || menuOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-[80]">
      {/* Announcement bar */}
      <div
        className={cn(
          "leather relative overflow-hidden border-b border-brass/20 transition-[height] duration-500",
          scrolled ? "h-8" : "h-9",
        )}
      >
        <div className="relative mx-auto flex h-full max-w-[1600px] items-center justify-center px-4">
          <p className="relative h-full w-full overflow-hidden text-center">
            {ANNOUNCEMENTS.map((msg, i) => (
              <span
                key={msg}
                className={cn(
                  "absolute inset-0 flex items-center justify-center gap-3 text-[0.6rem] font-medium uppercase tracking-[0.3em] text-parchment/85 transition-all duration-700 sm:text-[0.64rem]",
                  i === note ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                )}
              >
                <span aria-hidden="true" className="hidden text-brass/70 sm:inline">
                  ✦
                </span>
                {msg}
                <span aria-hidden="true" className="hidden text-brass/70 sm:inline">
                  ✦
                </span>
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={cn(
          "transition-all duration-500",
          solid
            ? "border-b border-brass/15 bg-espresso/95 backdrop-blur-md shadow-[0_18px_40px_-28px_rgba(0,0,0,0.9)]"
            : "border-b border-transparent bg-gradient-to-b from-espresso/70 via-espresso/25 to-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:h-[4.75rem] lg:px-10">
          {/* Wordmark */}
          <Link
            to="/"
            className="group flex shrink-0 items-center gap-3"
            aria-label={`${BRAND.name} — home`}
          >
            <Monogram className="h-8 w-8 text-brass transition-transform duration-500 group-hover:-rotate-6 lg:h-9 lg:w-9" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[1.15rem] uppercase tracking-[0.26em] text-parchment transition-colors duration-300 group-hover:text-brasslite sm:text-[1.3rem]">
                Buckaroo
              </span>
              <span className="mt-1 text-[0.5rem] uppercase tracking-[0.34em] text-parchment/55 sm:text-[0.55rem]">
                Hatters · Custom Hand Made
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "relative px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] transition-colors duration-300",
                    isActive ? "text-brasslite" : "text-parchment/75 hover:text-parchment",
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    <span
                      className={cn(
                        "absolute inset-x-4 bottom-1 h-px origin-left bg-brass transition-transform duration-500",
                        isActive ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              to="/shop"
              className="fill-btn mr-1 hidden border border-brass/45 px-5 py-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-brasslite transition-colors duration-300 hover:text-espresso xl:inline-flex"
              style={{ ["--fill" as string]: "#b7975b" }}
            >
              <span className="relative z-10">Explore the Shop</span>
            </Link>

            <button
              type="button"
              onClick={openSearch}
              className="rounded-full p-2.5 text-parchment/80 transition-all duration-300 hover:bg-parchment/10 hover:text-brasslite"
              aria-label="Search products"
            >
              <Search className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.5} />
            </button>

            <button
              type="button"
              onClick={openCart}
              className="relative rounded-full p-2.5 text-parchment/80 transition-all duration-300 hover:bg-parchment/10 hover:text-brasslite"
              aria-label={`Open shopping bag, ${cartCount} item${cartCount === 1 ? "" : "s"}`}
            >
              <ShoppingBag className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.5} />
              <span
                key={bump}
                className={cn(
                  "absolute -right-0.5 -top-0.5 flex h-[1.1rem] min-w-[1.1rem] items-center justify-center rounded-full px-1 text-[0.58rem] font-bold tabular",
                  cartCount > 0
                    ? "animate-pop bg-brass text-espresso"
                    : "bg-parchment/15 text-parchment/50",
                )}
              >
                {cartCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="rounded-full p-2.5 text-parchment/80 transition-all duration-300 hover:bg-parchment/10 hover:text-brasslite lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X className="h-5 w-5" strokeWidth={1.5} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "leather grain relative overflow-hidden border-b border-brass/20 transition-[max-height,opacity] duration-500 ease-[cubic-bezier(.22,1,.36,1)] lg:hidden",
          menuOpen ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0",
        )}
        aria-hidden={!menuOpen}
      >
        <nav className="relative px-5 py-7 sm:px-8" aria-label="Mobile">
          {NAV.map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              tabIndex={menuOpen ? 0 : -1}
              style={{ transitionDelay: menuOpen ? `${80 + i * 55}ms` : "0ms" }}
              className={({ isActive }) =>
                cn(
                  "flex items-baseline justify-between border-b border-parchment/10 py-4 font-display text-[1.7rem] transition-all duration-500",
                  menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                  isActive ? "text-brasslite" : "text-parchment hover:text-brasslite",
                )
              }
            >
              {item.label}
              <span className="text-[0.55rem] uppercase tracking-[0.3em] text-parchment/35">
                0{i + 1}
              </span>
            </NavLink>
          ))}

          <div
            className="mt-7 flex flex-col gap-3 transition-all duration-500"
            style={{ transitionDelay: menuOpen ? "420ms" : "0ms" }}
          >
            <Link
              to="/contact"
              tabIndex={menuOpen ? 0 : -1}
              className="flex items-center justify-center gap-2 bg-brass px-6 py-4 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-espresso transition-colors hover:bg-brasslite"
            >
              Ask about a custom hat
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
            </Link>
            <div className="flex items-center justify-center gap-5 pt-2">
              <a
                href={SOCIALS.instagram}
                target="_blank"
                rel="noreferrer noopener"
                tabIndex={menuOpen ? 0 : -1}
                className="flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.24em] text-parchment/70 transition-colors hover:text-brasslite"
              >
                <InstagramIcon className="h-4 w-4" /> Instagram
              </a>
              <a
                href={SOCIALS.facebook}
                target="_blank"
                rel="noreferrer noopener"
                tabIndex={menuOpen ? 0 : -1}
                className="flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.24em] text-parchment/70 transition-colors hover:text-brasslite"
              >
                <FacebookIcon className="h-4 w-4" /> Facebook
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
