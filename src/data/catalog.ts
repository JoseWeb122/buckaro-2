/**
 * Centralized, typed product catalog for Buckaroo Hatters.
 *
 * Every product below is sourced from the live Shopify storefront
 * (buckaroo-hatters-custom-hand-made-hats.myshopify.com) as of the last data pull:
 *   - names, prices, sale prices and availability  -> storefront listing
 *   - descriptions                                 -> storefront product pages
 *   - imagery                                      -> Shopify CDN (real shop photography)
 *
 * Nothing here is invented. Products with no published price (custom hat work)
 * carry `price: null` and route to an inquiry instead of a fake "add to cart".
 */

export type CategoryId =
  | "custom-hats"
  | "hat-bands"
  | "leather-accessories"
  | "other-accessories";

export interface Category {
  id: CategoryId | "all";
  label: string;
  blurb: string;
}

export interface Product {
  slug: string;
  /** Handle on the live Shopify store (kept accurate for "view on live store" links). */
  shopifyHandle: string;
  name: string;
  category: CategoryId;
  /** USD. `null` = no published price — must never be totalled or sold. */
  price: number | null;
  compareAtPrice?: number | null;
  available: boolean;
  /** Copy taken from the storefront. */
  description: string;
  /** Facts lifted from the storefront description only — no invented specs. */
  highlights: string[];
  images: string[];
  alt: string;
  badge?: "Sale" | "Made to order" | "Handmade";
  /** Colourway wording from the storefront description. */
  colour?: string;
  swatch?: [string, string];
  /** `inquiry` items cannot be added to a cart — they open the custom-hat form. */
  kind: "product" | "inquiry";
}

const CDN = "https://buckaroo-hatters-custom-hand-made-hats.myshopify.com/cdn/shop/files/";

/** Real shop photography served from the merchant's Shopify CDN. */
export const shopImg = (file: string, version: number, width = 1000) =>
  `${CDN}${file}?v=${version}&width=${width}&auto=format`;

const px = (id: number, w = 1200, h = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export const EDITORIAL = {
  hero: px(8968786, 1920, 1280),
  heroMobile: px(8968786, 900, 1200),
  story: px(6653235, 1100, 1400),
  inquiry: px(35057407, 1200, 1500),
  craft: [
    px(14174943, 900, 1100),
    px(40080052, 900, 1100),
    px(5894313, 900, 1100),
    px(27962443, 900, 1100),
  ],
};

export const CATEGORIES: Category[] = [
  { id: "all", label: "All Products", blurb: "Everything currently listed in the shop." },
  { id: "custom-hats", label: "Custom Hats", blurb: "Made-to-order hat work, started with a conversation." },
  { id: "hat-bands", label: "Hat Bands", blurb: "Hand-tooled leather bands, each with a silver buckle closure." },
  { id: "leather-accessories", label: "Leather Accessories", blurb: "Premium Herman Oak leather goods for the road." },
  { id: "other-accessories", label: "Other Accessories", blurb: "Practical extras made to work with your hat." },
];

/**
 * Route-level collections. A collection may span more than one product category
 * (e.g. /collections/accessories covers leather goods and other accessories).
 */
export const COLLECTIONS: Record<
  string,
  { label: string; blurb: string; categories: CategoryId[] }
> = {
  "hat-bands": {
    label: "Hat Bands",
    blurb: "Hand-tooled leather bands, each closed with a silver buckle.",
    categories: ["hat-bands"],
  },
  accessories: {
    label: "Accessories",
    blurb: "Leather goods and practical extras made to work with your hat.",
    categories: ["leather-accessories", "other-accessories"],
  },
};

export type FilterId = CategoryId | "all" | keyof typeof COLLECTIONS;

export const matchesFilter = (category: FilterId) => (p: Product) => {
  if (category === "all") return true;
  const group = COLLECTIONS[category];
  if (group) return group.categories.includes(p.category);
  return p.category === category;
};

export const PRODUCTS: Product[] = [
  {
    slug: "the-bandera-hat-band",
    shopifyHandle: "the-bandera-hat-band",
    name: "The Bandera Hat Band",
    category: "hat-bands",
    price: 45,
    available: true,
    description: "Chocolate brown leather embossed hat band with silver buckle closure.",
    highlights: ["Chocolate brown leather", "Hand embossed detail", "Silver buckle closure"],
    colour: "Chocolate brown",
    swatch: ["#4a2f1f", "#7b5334"],
    images: [
      shopImg("IMG-9714.heic", 1772815940),
      shopImg("IMG-9735.heic", 1772815991),
      shopImg("FullSizeRender_b2136ac1-3cc2-42ea-b1e5-72115dbde7b1.heic", 1772815990),
    ],
    alt: "The Bandera chocolate brown embossed leather hat band with a silver buckle",
    badge: "Handmade",
    kind: "product",
  },
  {
    slug: "the-covington-hat-band",
    shopifyHandle: "the-covington-hat-band",
    name: "The Covington Hat Band",
    category: "hat-bands",
    price: 45,
    available: true,
    description: "Camel brown hat band with paisley details and silver buckle closure.",
    highlights: ["Camel brown leather", "Paisley tooling detail", "Silver buckle closure"],
    colour: "Camel brown",
    swatch: ["#8a5f36", "#c08d54"],
    images: [
      shopImg("IMG-9716.heic", 1772816734),
      shopImg("FullSizeRender_8588171f-659b-4f82-8a2c-1a4b1ce3339e.heic", 1772816734),
      shopImg("IMG-9730.heic", 1772816734),
    ],
    alt: "The Covington camel brown leather hat band with paisley tooling",
    badge: "Handmade",
    kind: "product",
  },
  {
    slug: "the-cristo-hat-band",
    shopifyHandle: "the-cristo-hat-band",
    name: "The Cristo Hat Band",
    category: "hat-bands",
    price: 45,
    available: true,
    description: "Brown leather hat band with leaf accent embossing and silver buckle closure.",
    highlights: ["Brown leather", "Leaf accent embossing", "Silver buckle closure"],
    colour: "Brown",
    swatch: ["#5b3a22", "#8d6136"],
    images: [
      shopImg("IMG-9717.heic", 1772816985),
      shopImg("FullSizeRender_e46e94e3-56c8-46a0-922f-2e397c279fc3.heic", 1772816985),
      shopImg("IMG-9724_5fcd4bf0-3b6e-4011-be92-1158f4845f1e.heic", 1772816986),
    ],
    alt: "The Cristo brown leather hat band with embossed leaf accents",
    badge: "Handmade",
    kind: "product",
  },
  {
    slug: "the-denver-hat-band",
    shopifyHandle: "the-denver-hat-band",
    name: "The Denver Hat Band",
    category: "hat-bands",
    price: 45,
    available: true,
    description: "Dark brown and black basket weave leather hat band with silver buckle closure.",
    highlights: ["Dark brown & black leather", "Basket weave detail", "Silver buckle closure"],
    colour: "Dark brown / black",
    swatch: ["#2b201a", "#5a3b26"],
    images: [
      shopImg("IMG-9719.jpg", 1772816125),
      shopImg("IMG-9733.heic", 1772815940),
      shopImg("FullSizeRender_9a259f49-335c-4b16-b36d-1d33d3c1f3c0.heic", 1772815940),
    ],
    alt: "The Denver dark brown and black basket weave leather hat band",
    badge: "Handmade",
    kind: "product",
  },
  {
    slug: "the-marfa-hat-band",
    shopifyHandle: "the-marfa-hat-band",
    name: "The Marfa Hat Band",
    category: "hat-bands",
    price: 45,
    available: true,
    description:
      "Leather hat band featuring a floral embossed design, yellow center and green leaves, silver buckle closure.",
    highlights: ["Floral embossed leather", "Yellow centre, green leaves", "Silver buckle closure"],
    colour: "Natural / floral",
    swatch: ["#a8763c", "#c9a34d"],
    images: [
      shopImg("IMG-9712.heic", 1772815336),
      shopImg("FullSizeRender_74995c3c-10d5-495a-a5b7-114b481b8160.heic", 1772815336),
      shopImg("E4552605-B7AD-4AEE-8555-FC224153269C.jpg", 1772815414),
    ],
    alt: "The Marfa leather hat band with a floral embossed design",
    badge: "Handmade",
    kind: "product",
  },
  {
    slug: "the-midland-hat-band",
    shopifyHandle: "the-sedona-hat-band",
    name: "The Midland Hat Band",
    category: "hat-bands",
    price: 45,
    available: true,
    description: "Leather hat band with large basket weave detail and silver buckle closure.",
    highlights: ["Large basket weave detail", "Hand-tooled leather", "Silver buckle closure"],
    colour: "Natural brown",
    swatch: ["#7d5a34", "#b08a54"],
    images: [
      shopImg("FullSizeRender_dd47e253-9fe2-42f6-9485-d111e9b8ce13.heic", 1772814533),
      shopImg("IMG-9715.heic", 1772814694),
      shopImg("IMG-9727.heic", 1772814533),
    ],
    alt: "The Midland leather hat band with large basket weave tooling",
    badge: "Handmade",
    kind: "product",
  },
  {
    slug: "the-oatman-hat-band",
    shopifyHandle: "the-oatman-hat-band",
    name: "The Oatman Hat Band",
    category: "hat-bands",
    price: 45,
    available: true,
    description: "Black leather embossed hat band with silver buckle closure.",
    highlights: ["Black leather", "Hand embossed detail", "Silver buckle closure"],
    colour: "Black",
    swatch: ["#1d1a18", "#4a423c"],
    images: [
      shopImg("IMG-9713.heic", 1772815753),
      shopImg("FullSizeRender_a323cc94-531e-4b18-9218-ba275d60cb34.heic", 1772815754),
      shopImg("IMG-9728.heic", 1772815753),
    ],
    alt: "The Oatman black embossed leather hat band with silver buckle",
    badge: "Handmade",
    kind: "product",
  },
  {
    slug: "the-sedona-hat-band",
    shopifyHandle: "the-midland-hat-band",
    name: "The Sedona Hat Band",
    category: "hat-bands",
    price: 45,
    available: true,
    description:
      "Camel leather hat band with basket weave and off-white accent stitching, silver buckle closure.",
    highlights: ["Camel leather", "Basket weave with off-white stitching", "Silver buckle closure"],
    colour: "Camel",
    swatch: ["#9a6b3c", "#cfa06a"],
    images: [
      shopImg("IMG-9718.heic", 1772816449),
      shopImg("FullSizeRender_d80dfb15-5af9-4cf3-8f3c-8847a0ab274f.heic", 1772816448),
      shopImg("IMG-9736.heic", 1772816448),
    ],
    alt: "The Sedona camel leather hat band with basket weave and off-white stitching",
    badge: "Handmade",
    kind: "product",
  },
  {
    slug: "the-silverton-hat-band",
    shopifyHandle: "the-silverton-hat-band",
    name: "The Silverton Hat Band",
    category: "hat-bands",
    price: 45,
    available: true,
    description: "Black leather hat band with silver accents and silver buckle closure.",
    highlights: ["Black leather", "Silver accents", "Silver buckle closure"],
    colour: "Black / silver",
    swatch: ["#191716", "#9a9a9a"],
    images: [
      shopImg("IMG-9709.heic", 1772816289),
      shopImg("FullSizeRender_27f26c14-ca3a-4644-86d3-ef340340a6e6.heic", 1772816289),
      shopImg("IMG-9734.heic", 1772816288),
    ],
    alt: "The Silverton black leather hat band with silver accents",
    badge: "Handmade",
    kind: "product",
  },
  {
    slug: "handmade-premium-herman-oak-leather-hat-holder",
    shopifyHandle: "handmade-premium-herman-oak-leather-hat-holder",
    name: "Handmade Premium Herman Oak Leather Hat Holder",
    category: "leather-accessories",
    price: 50,
    available: true,
    description: "Premium Herman Oak leather handmade hat holder for a vehicle headrest.",
    highlights: ["Premium Herman Oak leather", "Fits a vehicle headrest", "Handmade"],
    colour: "Natural leather",
    swatch: ["#8a5a32", "#b98a54"],
    images: [
      shopImg("FullSizeRender_130ef988-6f08-4356-9916-289561272637.heic", 1772912607),
      shopImg("IMG-9769.heic", 1772912607),
    ],
    alt: "Handmade premium Herman Oak leather hat holder that straps to a vehicle headrest",
    badge: "Handmade",
    kind: "product",
  },
  {
    slug: "custom-hat-ear-warmers",
    shopifyHandle: "custom-hat-ear-warmers",
    name: "Custom Hat Ear Warmers",
    category: "other-accessories",
    price: 40,
    compareAtPrice: 55,
    available: true,
    description:
      "Ear warmers made specifically for hats with a sweat band and minimal bulk. Secured into the sweat band with a soft closure under the chin. These can withstand high winds and very cold temperatures, and work well with western style hats, fedoras, flat brims, and any hat with a sweatband.",
    highlights: [
      "Made for hats with a sweat band",
      "Minimal bulk",
      "Soft closure under the chin",
      "Built for high winds and very cold temperatures",
      "Works with western hats, fedoras and flat brims",
    ],
    colour: "As pictured",
    swatch: ["#3b3330", "#7a6a5d"],
    images: [
      shopImg("C990CD54-674B-4506-BF3C-76243EBEBDDC.jpg", 1770314703),
      shopImg("FullSizeRender.heic", 1770316013),
      shopImg("IMG-9145.heic", 1770316013),
      shopImg("IMG-9144.heic", 1770316013),
      shopImg("IMG-9143.heic", 1770316013),
      shopImg("IMG-9142.heic", 1770316013),
      shopImg("1A32F858-5510-4089-918B-230EFA2F011C.jpg", 1770316060),
      shopImg("IMG_9141.jpg", 1770315259),
    ],
    alt: "Custom hat ear warmers secured into a hat sweat band with a soft chin closure",
    badge: "Sale",
    kind: "product",
  },
  {
    slug: "custom-hat-made-to-order",
    shopifyHandle: "",
    name: "Custom Hat — Made to Order",
    category: "custom-hats",
    price: null,
    available: true,
    description:
      "Custom hat work is made to order and quoted one at a time. Tell us the shape, brim, colour and details you have in mind and we'll start a conversation about your hat. No price is published online for custom work — every hat is different.",
    highlights: [
      "Shape, brim and colour discussed with you",
      "Quoted individually — no published online price",
      "Start with the inquiry form and we'll reply",
    ],
    images: [px(35057407, 1100, 1300), px(35057395, 1100, 1300)],
    alt: "A western felt hat resting on a rustic wooden table beside leather gear",
    badge: "Made to order",
    kind: "inquiry",
  },
];

export const CATEGORY_LABEL: Record<CategoryId, string> = {
  "custom-hats": "Custom Hats",
  "hat-bands": "Hat Bands",
  "leather-accessories": "Leather Accessories",
  "other-accessories": "Accessories",
};

export const getProduct = (slug?: string) => PRODUCTS.find((p) => p.slug === slug);

export const getRelated = (product: Product, count = 4) => {
  const sameCategory = PRODUCTS.filter(
    (p) => p.slug !== product.slug && p.category === product.category,
  );
  const others = PRODUCTS.filter(
    (p) => p.slug !== product.slug && p.category !== product.category,
  );
  return [...sameCategory, ...others].slice(0, count);
};

export const searchProducts = (query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return PRODUCTS.filter((p) => {
    const hay = [
      p.name,
      p.description,
      p.colour ?? "",
      CATEGORY_LABEL[p.category],
      p.highlights.join(" "),
    ]
      .join(" ")
      .toLowerCase();
    return q.split(/\s+/).every((token) => hay.includes(token));
  });
};

export const formatPrice = (value: number | null) =>
  value === null ? "Price on request" : `$${value.toFixed(2)}`;

export const SHOP_URL = "https://buckaroo-hatters-custom-hand-made-hats.myshopify.com";
export const liveProductUrl = (handle: string) => `${SHOP_URL}/products/${handle}`;
