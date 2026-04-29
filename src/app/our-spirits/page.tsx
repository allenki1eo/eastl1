import type { Metadata } from "next";
import Image from "next/image";
import SpiritsScrollFilter from "@/components/spirits-scroll-filter";

export const metadata: Metadata = {
  title: "Our Spirits | Hanson's Vodka, Diamond Rock Gin, Furaha Gin, Brandy",
  description:
    "Discover our premium spirits collection - Hanson's Choice Brandy, Diamond Rock Gin, Furaha Gin, and Hanson's Vodka. Crafted with excellence in Tanzania for East Africa and beyond.",
  keywords: [
    "Hanson's Choice Brandy",
    "Diamond Rock Gin",
    "Furaha Gin",
    "Hanson's Vodka",
    "Tanzania spirits",
    "premium gin East Africa",
    "brandy Tanzania",
    "vodka Tanzania",
    "East African spirits",
    "craft spirits",
  ],
  openGraph: {
    title: "Our Spirits | Hanson's, Diamond Rock Gin, Furaha Gin",
    description: "Premium Tanzanian spirits. Hanson's Choice Brandy, Diamond Rock Gin, Furaha Gin, and Hanson's Vodka.",
  },
};

export default function OurSpiritsPage() {
  return (
    <main className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banner_spirit.png"
            alt="Our Spirits"
            fill
            className="object-cover opacity-50"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6 uppercase tracking-tight">
            Our Spirits
          </h1>
          <p className="text-xl md:text-2xl text-white/70 uppercase tracking-widest">
            Crafted Excellence Since 2017
          </p>
        </div>
      </section>

      {/* Spirits Scroll Filter with Keyhole Reveal */}
      <SpiritsScrollFilter />
    </main>
  );
}