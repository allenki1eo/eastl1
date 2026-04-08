import type { Metadata } from "next";
import HeroSlider from "@/components/hero-slider";
import FloatingBrands from "@/components/floating-brands";
import ProductShowcase from "@/components/product-showcase";
import ParallaxReveal from "@/components/parallax-reveal";

export const metadata: Metadata = {
  title: "Premium Beer & Spirits | East African Spirits Tanzania",
  description:
    "Discover East African Spirits - Tanzania's leading beverage company. Explore Goldberg, Hanson's Lite, Basembi Extra beers and Hanson's Choice Brandy, Diamond Rock Gin, Furaha Gin, Hanson's Vodka. Premium quality since 2017.",
  keywords: [
    "East African Spirits Tanzania",
    "Goldberg beer Tanzania",
    "Hanson's beer",
    "premium spirits East Africa",
    "Tanzania beverage company",
    "Shinyanga brewery",
    "Hanson's Choice Brandy",
    "Diamond Rock Gin",
  ],
  openGraph: {
    title: "Premium Beer & Spirits | East African Spirits Tanzania",
    description:
      "Tanzania's premier beverage company. Goldberg, Hanson's, Basembi Extra beers and premium spirits crafted since 2017.",
  },
};

export default function Home() {
  return (
    <main className="relative">
      <HeroSlider />
      <FloatingBrands />
      <ProductShowcase />
      <ParallaxReveal />

      {/* Additional sections can be added below */}

    </main>
  );
}
