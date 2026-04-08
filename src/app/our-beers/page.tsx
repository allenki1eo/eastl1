import type { Metadata } from "next";
import Image from "next/image";
import BeerScrollFilter from "@/components/beer-scroll-filter";

export const metadata: Metadata = {
  title: "Our Beers | Goldberg, Hanson's Lite, Basembi Extra, Mbogo",
  description:
    "Explore our premium beer collection - Goldberg Lager, Hanson's Lite, Basembi Extra, Mbogo, Hanson's Dry, and Hanson's Premium Cider. Crafted with excellence in Shinyanga, Tanzania since 2018.",
  keywords: [
    "Goldberg beer",
    "Hanson's Lite",
    "Basembi Extra",
    "Mbogo beer",
    "Hanson's Dry",
    "Hanson's Premium Cider",
    "Tanzania beer brands",
    "East African beer",
    "premium lager Tanzania",
    "craft beer East Africa",
  ],
  openGraph: {
    title: "Our Beers | Goldberg, Hanson's Lite, Basembi Extra",
    description: "Premium Tanzanian beers crafted with excellence. Discover Goldberg, Hanson's Lite, Basembi Extra and more.",
  },
};

export default function OurBeersPage() {
  return (
    <main className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] lg:h-screen flex items-center justify-center border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/beerhero.png"
            alt="Our Beers"
            fill
            className="object-cover opacity-50"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4 sm:px-6 py-12 md:py-16">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white mb-4 md:mb-6 uppercase tracking-tight leading-tight">
            Our Beers
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 uppercase tracking-wider md:tracking-widest">
            Premium Quality Since 2017
          </p>
        </div>
      </section>

      {/* Beer Scroll Filter Content */}
      <BeerScrollFilter />
    </main>
  );
}
