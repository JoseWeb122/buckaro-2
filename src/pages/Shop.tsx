import { Navigate } from "react-router-dom";
import { COLLECTIONS, shopImg } from "@/data/catalog";
import { px } from "@/data/site";
import { Collection } from "@/sections/Collection";
import { PageHeader } from "@/components/PageHeader";
import { TrustAndCta } from "@/sections/Editorial";

const SHOP_HEADER = px(35057407, 1900, 1100);

export function ShopPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Shop"
        title={
          <>
            Everything currently
            <span className="italic text-brasslite"> on the bench.</span>
          </>
        }
        copy="Nine hand-tooled hat bands, a premium Herman Oak leather hat holder, and custom hat ear warmers — all photographed exactly as made. Custom hat work is quoted individually."
        image={SHOP_HEADER}
        imageAlt="A western felt hat and leather gear resting on a rustic wooden table"
        trail={[{ label: "Home", to: "/" }, { label: "Shop" }]}
      />
      <Collection id="shop-grid" showHeading={false} />
      <TrustAndCta />
    </>
  );
}

const COLLECTION_HEADERS: Record<string, { image: string; alt: string }> = {
  "hat-bands": {
    image: shopImg("IMG-9718.heic", 1772816449, 1600),
    alt: "The Sedona camel leather hat band with basket weave tooling",
  },
  accessories: {
    image: shopImg("FullSizeRender_130ef988-6f08-4356-9916-289561272637.heic", 1772912607, 1600),
    alt: "Handmade premium Herman Oak leather hat holder",
  },
};

export function CollectionPage({ handle }: { handle: string }) {
  const collection = COLLECTIONS[handle];
  if (!collection) return <Navigate to="/shop" replace />;
  const header = COLLECTION_HEADERS[handle] ?? {
    image: SHOP_HEADER,
    alt: "Western hat and leather gear on a rustic table",
  };

  return (
    <>
      <PageHeader
        eyebrow="Collection"
        title={collection.label}
        copy={collection.blurb}
        image={header.image}
        imageAlt={header.alt}
        trail={[
          { label: "Home", to: "/" },
          { label: "Shop", to: "/shop" },
          { label: collection.label },
        ]}
      />
      <Collection
        id="collection-grid"
        showHeading={false}
        initialCategory={handle as keyof typeof COLLECTIONS}
      />
      <TrustAndCta />
    </>
  );
}
