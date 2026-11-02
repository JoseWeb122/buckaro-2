/**
 * Editable site data — navigation, editorial imagery, gallery, process steps
 * and business placeholders.
 *
 * Anything not confirmed from the merchant's public storefront or social pages
 * lives in BUSINESS below as an obvious placeholder so it can be swapped for the
 * real detail in one place. No phone number, address, hours or legal entity has
 * been invented.
 */
import { EDITORIAL } from "./catalog";

export const px = (id: number, w = 1000, h = 1000) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export const BRAND = {
  name: "Buckaroo Hatters",
  suffix: "Custom Hand Made Hats",
  tagline: "Authentic Western Style · Artisan Craftsmanship",
  announcement: "Discover Handmade Western Style",
};

export const SOCIALS = {
  instagram: "https://www.instagram.com/buckaroohatterscustom",
  facebook: "https://www.facebook.com/p/Buckaroo-Hatters-Custom-Hats-100057499687766/",
  shopify: "https://buckaroo-hatters-custom-hand-made-hats.myshopify.com/",
};

/** Placeholders — replace with confirmed details before launch. */
export const BUSINESS = {
  phone: null as string | null,
  email: null as string | null,
  address: null as string | null,
  hours: null as string | null,
  legalName: "Buckaroo Hatters Custom Hand Made Hats",
};

export const NAV = [
  { label: "Home", to: "/" },
  { label: "Shop Hats", to: "/shop" },
  { label: "Hat Bands", to: "/collections/hat-bands" },
  { label: "Accessories", to: "/collections/accessories" },
  { label: "Our Craft", to: "/our-craft" },
] as const;

export const FOOTER_LINKS = [
  {
    title: "Shop",
    links: [
      { label: "All Products", to: "/shop" },
      { label: "Custom Hats", to: "/shop?c=custom-hats" },
      { label: "Hat Bands", to: "/collections/hat-bands" },
      { label: "Leather Accessories", to: "/collections/accessories" },
    ],
  },
  {
    title: "The Shop",
    links: [
      { label: "Our Craft", to: "/our-craft" },
      { label: "Custom Hat Inquiry", to: "/contact" },
      { label: "Contact", to: "/contact" },
      { label: "Live Shopify Store", to: SOCIALS.shopify, external: true },
    ],
  },
] as const;

export const CRAFT_STEPS = [
  {
    n: "01",
    title: "Find Your Style",
    body: "Start with the shape and feel you already reach for — a working brim, a dress crown, a band that catches the light. Browse what's in the shop and note what pulls at you.",
    image: EDITORIAL.craft[0],
    alt: "A man in a wide-brimmed western hat outdoors at golden hour",
    to: "/shop",
    linkLabel: "Browse the shop",
  },
  {
    n: "02",
    title: "Explore the Details",
    body: "Every band is tooled, embossed or woven by hand and closed with a silver buckle. Look closely at the leather, the stitching and the colour before you decide.",
    image: EDITORIAL.craft[1],
    alt: "Close-up of leather crafting materials and hand-sewing threads on a workbench",
    to: "/collections/hat-bands",
    linkLabel: "See the hat bands",
  },
  {
    n: "03",
    title: "Make It Your Own",
    body: "Want something that isn't listed? Send an inquiry with the shape, colour and details you have in mind. Custom work is quoted one hat at a time, in a conversation.",
    image: EDITORIAL.craft[2],
    alt: "A leather artisan using a mallet to tool leather at a workbench",
    to: "/contact",
    linkLabel: "Start an inquiry",
  },
  {
    n: "04",
    title: "Wear Your Western Look",
    body: "Take it out. A hat earns its character in the wind, the dust and the sun — and a good band only looks better for the miles.",
    image: EDITORIAL.craft[3],
    alt: "Silhouetted cowboy on horseback at sunset in a dusty landscape",
    to: "/our-craft",
    linkLabel: "Read the story",
  },
];

export interface GalleryItem {
  src: string;
  alt: string;
  span: "tall" | "wide" | "normal";
  caption: string;
  /** `shop` = real product photography from the merchant's Shopify CDN. */
  source: "shop" | "editorial";
}

export const GALLERY: GalleryItem[] = [
  {
    src: px(26651205, 1200, 1500),
    alt: "A cowboy on a rearing horse against a prairie sunset",
    span: "tall",
    caption: "Out where the work is",
    source: "editorial",
  },
  {
    src: "https://buckaroo-hatters-custom-hand-made-hats.myshopify.com/cdn/shop/files/IMG-9714.heic?v=1772815940&width=900&auto=format",
    alt: "The Bandera chocolate brown embossed leather hat band",
    span: "normal",
    caption: "The Bandera — shop photography",
    source: "shop",
  },
  {
    src: px(4452611, 1200, 800),
    alt: "Leatherworking tools laid out on a cutting mat in a workshop",
    span: "wide",
    caption: "Tools of the bench",
    source: "editorial",
  },
  {
    src: "https://buckaroo-hatters-custom-hand-made-hats.myshopify.com/cdn/shop/files/FullSizeRender_dd47e253-9fe2-42f6-9485-d111e9b8ce13.heic?v=1772814533&width=900&auto=format",
    alt: "The Midland leather hat band with large basket weave tooling",
    span: "normal",
    caption: "The Midland — shop photography",
    source: "shop",
  },
  {
    src: px(38109099, 900, 1300),
    alt: "An artisan leather crafting workspace with tools and materials",
    span: "tall",
    caption: "The bench, mid-job",
    source: "editorial",
  },
  {
    src: "https://buckaroo-hatters-custom-hand-made-hats.myshopify.com/cdn/shop/files/IMG-9709.heic?v=1772816289&width=900&auto=format",
    alt: "The Silverton black leather hat band with silver accents",
    span: "normal",
    caption: "The Silverton — shop photography",
    source: "shop",
  },
  {
    src: px(14233066, 1200, 800),
    alt: "A cowboy standing among horses at sunset in a mountain field",
    span: "wide",
    caption: "Evening, and the herd",
    source: "editorial",
  },
  {
    src: px(6660959, 900, 1200),
    alt: "Close-up of a needle stitching through leather",
    span: "tall",
    caption: "Stitch by stitch",
    source: "editorial",
  },
  {
    src: "https://buckaroo-hatters-custom-hand-made-hats.myshopify.com/cdn/shop/files/C990CD54-674B-4506-BF3C-76243EBEBDDC.jpg?v=1770314703&width=900&auto=format",
    alt: "Custom hat ear warmers fitted to a hat sweat band",
    span: "normal",
    caption: "Custom hat ear warmers — shop photography",
    source: "shop",
  },
  {
    src: px(30877735, 1000, 1250),
    alt: "Portrait of a person in a hat and leather jacket in warm vintage light",
    span: "tall",
    caption: "Worn the way it was meant",
    source: "editorial",
  },
];

export const TRUST_POINTS = [
  {
    title: "Handmade Western Style",
    body: "Hat bands, leather goods and hat accessories made by hand, one piece at a time.",
  },
  {
    title: "Personal Product Discovery",
    body: "Every listing is photographed as made — look closely at the tooling before you choose.",
  },
  {
    title: "Custom Hat Inquiries",
    body: "Custom work is quoted individually. Send the details and start a conversation.",
  },
  {
    title: "Direct Access to the Business",
    body: "Message the shop on Instagram or Facebook, or use the inquiry form on this site.",
  },
];

export const DEMO_NOTE =
  "Demo storefront: live checkout will be connected during production.";
