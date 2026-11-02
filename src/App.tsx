import { useEffect } from "react";
import { HashRouter, Route, Routes, useLocation, useParams } from "react-router-dom";
import { StoreProvider } from "@/store/StoreContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { SearchOverlay } from "@/components/SearchOverlay";
import { QuickView } from "@/components/QuickView";
import { Toaster } from "@/components/Toaster";
import Home from "@/pages/Home";
import { CollectionPage, ShopPage } from "@/pages/Shop";
import { ProductPage } from "@/pages/ProductPage";
import { OurCraft } from "@/pages/OurCraft";
import { Contact } from "@/pages/Contact";
import { LegalPage, NotFound } from "@/pages/Misc";

/** Reset scroll on navigation, but keep in-page anchors (#collection) working. */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace("#", ""));
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}

function Shell() {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-svh flex-col bg-ivory">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:bg-brass focus:px-5 focus:py-3 focus:text-[0.65rem] focus:font-bold focus:uppercase focus:tracking-[0.2em] focus:text-espresso"
      >
        Skip to content
      </a>

      <Header />

      <main id="main" key={pathname} className="flex-1 animate-fade-up">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/collections/:handle" element={<CollectionRoute />} />
          <Route path="/products/:slug" element={<ProductPage />} />
          <Route path="/our-craft" element={<OurCraft />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<LegalPage kind="privacy-policy" />} />
          <Route path="/terms" element={<LegalPage kind="terms" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      <CartDrawer />
      <SearchOverlay />
      <QuickView />
      <Toaster />
    </div>
  );
}

function CollectionRoute() {
  const { handle } = useParams();
  return <CollectionPage handle={handle ?? ""} />;
}

export default function App() {
  return (
    <StoreProvider>
      <HashRouter>
        <ScrollManager />
        <Shell />
      </HashRouter>
    </StoreProvider>
  );
}
