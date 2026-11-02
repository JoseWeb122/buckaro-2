import { Hero, HeroMarquee } from "@/sections/Hero";
import { Story, CraftProcess, TrustAndCta } from "@/sections/Editorial";
import { Collection } from "@/sections/Collection";
import { GallerySection } from "@/sections/GallerySection";
import { CustomInquiry } from "@/sections/CustomInquiry";

export default function Home() {
  return (
    <>
      <Hero />
      <HeroMarquee />
      <Story />
      <Collection limit={8} />
      <GallerySection />
      <CraftProcess />
      <CustomInquiry />
      <TrustAndCta />
    </>
  );
}
