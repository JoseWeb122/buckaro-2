import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/data/catalog";

export interface CartLine {
  slug: string;
  name: string;
  price: number | null;
  image: string;
  alt: string;
  qty: number;
  category: string;
}

export interface Toast {
  id: number;
  title: string;
  body?: string;
  image?: string;
  tone: "success" | "info" | "warn";
}

interface StoreValue {
  cart: CartLine[];
  addToCart: (product: Product, qty?: number) => void;
  updateQty: (slug: string, qty: number) => void;
  removeFromCart: (slug: string) => void;
  clearCart: () => void;
  cartCount: number;
  /** Increments on every add — drives the bag badge pop animation. */
  bump: number;
  subtotal: number;
  hasUnpriced: boolean;

  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;

  quickView: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  toasts: Toast[];
  pushToast: (toast: Omit<Toast, "id">) => void;
  dismissToast: (id: number) => void;
}

const StoreContext = createContext<StoreValue | null>(null);
const STORAGE_KEY = "buckaroo-hatters-cart-v1";

const readStoredCart = (): CartLine[] => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CartLine[]) : [];
  } catch {
    return [];
  }
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>(() => readStoredCart());
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [bump, setBump] = useState(0);
  const toastId = useRef(0);

  /* ---------------- persistence ---------------- */
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      /* storage unavailable — cart still works for the session */
    }
  }, [cart]);

  /* ---------------- toasts ---------------- */
  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const pushToast = useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = ++toastId.current;
      setToasts((prev) => [...prev.slice(-2), { ...toast, id }]);
      window.setTimeout(() => dismissToast(id), 4200);
    },
    [dismissToast],
  );

  /* ---------------- cart ---------------- */
  const addToCart = useCallback(
    (product: Product, qty = 1) => {
      if (product.kind === "inquiry" || product.price === null) {
        pushToast({
          tone: "info",
          title: "Made to order",
          body: `${product.name} is quoted individually — send an inquiry instead.`,
        });
        return;
      }
      setCart((prev) => {
        const existing = prev.find((l) => l.slug === product.slug);
        if (existing) {
          return prev.map((l) =>
            l.slug === product.slug ? { ...l, qty: Math.min(99, l.qty + qty) } : l,
          );
        }
        return [
          ...prev,
          {
            slug: product.slug,
            name: product.name,
            price: product.price,
            image: product.images[0],
            alt: product.alt,
            qty,
            category: product.category,
          },
        ];
      });
      setBump((b) => b + 1);
      pushToast({
        tone: "success",
        title: "Added to your bag",
        body: product.name,
        image: product.images[0],
      });
    },
    [pushToast],
  );

  const updateQty = useCallback((slug: string, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((l) => l.slug !== slug)
        : prev.map((l) => (l.slug === slug ? { ...l, qty: Math.min(99, qty) } : l)),
    );
  }, []);

  const removeFromCart = useCallback((slug: string) => {
    setCart((prev) => prev.filter((l) => l.slug !== slug));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const { cartCount, subtotal, hasUnpriced } = useMemo(() => {
    let count = 0;
    let total = 0;
    let unpriced = false;
    for (const line of cart) {
      count += line.qty;
      if (line.price === null) unpriced = true;
      else total += line.price * line.qty;
    }
    return { cartCount: count, subtotal: total, hasUnpriced: unpriced };
  }, [cart]);

  /* ---------------- overlay orchestration ---------------- */
  const openCart = useCallback(() => {
    setQuickView(null);
    setSearchOpen(false);
    setCartOpen(true);
  }, []);
  const closeCart = useCallback(() => setCartOpen(false), []);
  const openSearch = useCallback(() => {
    setCartOpen(false);
    setQuickView(null);
    setSearchOpen(true);
  }, []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const openQuickView = useCallback((product: Product) => {
    setCartOpen(false);
    setSearchOpen(false);
    setQuickView(product);
  }, []);
  const closeQuickView = useCallback(() => setQuickView(null), []);

  /* Escape closes the top-most overlay. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (quickView) return setQuickView(null);
      if (searchOpen) return setSearchOpen(false);
      if (cartOpen) return setCartOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [quickView, searchOpen, cartOpen]);

  /* Lock scroll while an overlay is open. */
  const anyOpen = cartOpen || searchOpen || !!quickView;
  useEffect(() => {
    const { body } = document;
    const prev = body.style.overflow;
    body.style.overflow = anyOpen ? "hidden" : "";
    return () => {
      body.style.overflow = prev;
    };
  }, [anyOpen]);

  const value: StoreValue = {
    cart,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
    cartCount,
    bump,
    subtotal,
    hasUnpriced,
    cartOpen,
    openCart,
    closeCart,
    searchOpen,
    openSearch,
    closeSearch,
    quickView,
    openQuickView,
    closeQuickView,
    toasts,
    pushToast,
    dismissToast,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}

/** Raw count without the add-to-bag animation signal. */
export function useCartCount() {
  const { cart } = useStore();
  return cart.reduce((n, l) => n + l.qty, 0);
}
