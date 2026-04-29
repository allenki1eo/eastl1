"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface PressRelease {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string[];
  highlights: { label: string; value: string }[];
  images: { src: string; alt: string }[];
}

const pressReleases: PressRelease[] = [
  {
    id: "shinyanga-landmark-investment-2026",
    title: "East African Spirits Makes History with Landmark Patriotic Investment in Shinyanga",
    date: "January 9, 2026",
    excerpt:
      "Deputy Minister Dr. Chaya commends local investor for TZS 34 billion commitment to Tanzania's beverage industry.",
    content: [
      "East African Spirits (T) Limited (EASTL), a leading Tanzanian beverage manufacturer headquartered in Shinyanga, received high praise from the Deputy Minister of State in the President's Office – Planning and Investment, Hon. Dr. Pius Stephen Chaya, during his official visit to the company's state-of-the-art production facility.",
      "Dr. Chaya commended EASTL Director Mr. Gaspar Kileo for his patriotic investment of over TZS 34 billion (approximately USD 13 million) in Tanzania's beverage industry, calling it a model example of productive investment that fulfills the Sixth Phase Government's agenda under President Dr. Samia Suluhu Hassan to grow the national economy, create employment, and increase government revenue.",
      '"This is the kind of investment that touches the lives of many citizens. It stimulates agriculture, creates jobs for both educated and uneducated Tanzanians, and increases national revenue. This is exactly the aspiration of the Government," stated Dr. Chaya.',
      "Construction of the EASTL facility began in October 2019 with the goal of adding value to local agricultural products in the Shinyanga region. After completion and installation of modern equipment, the factory was officially launched in March 2023. Since then, it has been producing beverages that meet the highest quality and market competitiveness standards.",
      "During the visit, Dr. Chaya also identified opportunities for investment in bottle manufacturing, noting that currently Tanzania has only one bottle manufacturer based in Dar es Salaam. He highlighted the government's Industrial Parks initiative, which aims to establish industrial zones in every district, presenting significant opportunities for investors in packaging and related sectors.",
    ],
    highlights: [
      { label: "Total Investment", value: "TZS 34 Billion+" },
      { label: "Direct Jobs Created", value: "200+" },
      { label: "Annual Tax Contribution", value: "TZS 20 Billion+" },
      { label: "Production Started", value: "March 2023" },
    ],
    images: [
      { src: "/images/press/minister-visit-1.jpg", alt: "Deputy Minister Dr. Chaya touring the production facility" },
      { src: "/images/press/minister-visit-2.jpg", alt: "State-of-the-art Della Toffola bottling equipment" },
      { src: "/images/press/minister-visit-3.jpg", alt: "Quality control and production line inspection" },
      { src: "/images/press/minister-visit-4.jpg", alt: "Mr. Gaspar Kileo explaining the production process" },
    ],
  },
];

export default function PressPage() {
  const [selectedRelease, setSelectedRelease] = useState<PressRelease | null>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedRelease) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedRelease]);

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center border-b border-white/5">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-zinc-900 via-black to-black" />
        <div className="relative z-10 text-center px-4">
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 uppercase tracking-tight"
            style={{ fontFamily: "var(--font-bebas), sans-serif" }}
          >
            Press & Media
          </h1>
          <p
            className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto uppercase tracking-wider"
            style={{ fontFamily: "var(--font-open-sans), sans-serif" }}
          >
            Latest news and media resources from East African Spirits
          </p>
        </div>
      </section>

      {/* Press Releases List */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-2 uppercase tracking-wide"
              style={{ fontFamily: "var(--font-bebas), sans-serif" }}
            >
              Press Releases
            </h2>
            <p className="text-white/60" style={{ fontFamily: "var(--font-open-sans), sans-serif" }}>
              Click on any headline to read the full story.
            </p>
          </div>

          <div className="space-y-3">
            {pressReleases.map((release) => (
              <button
                key={release.id}
                onClick={() => setSelectedRelease(release)}
                className="w-full text-left bg-zinc-900/50 rounded-none p-6 md:p-8 hover:bg-zinc-900/80 transition-all duration-300 focus:outline-none group"
              >
                <h3
                  className="text-2xl md:text-3xl lg:text-4xl font-bold text-white uppercase tracking-tight leading-tight"
                  style={{ fontFamily: "var(--font-bebas), sans-serif" }}
                >
                  {release.title}
                </h3>
                <div className="mt-4 flex items-center text-white text-sm font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-open-sans), sans-serif" }}>
                  Read More <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </button>
            ))}
          </div>

          
        </div>
      </section>

      {/* Modal Overlay */}
      {selectedRelease && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-zinc-950 border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedRelease(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md border border-white/10"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <div className="p-6 md:p-10">
              {/* Modal Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-xs font-semibold uppercase tracking-wider text-white bg-white/10 px-3 py-1 rounded-full"
                    style={{ fontFamily: "var(--font-bebas), sans-serif" }}
                  >
                    {selectedRelease.date}
                  </span>
                </div>
                <h2
                  className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight leading-tight"
                  style={{ fontFamily: "var(--font-bebas), sans-serif" }}
                >
                  {selectedRelease.title}
                </h2>
              </div>

              {/* Highlights Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {selectedRelease.highlights.map((highlight) => (
                  <div
                    key={highlight.label}
                    className="bg-zinc-900 border border-white/5 rounded-xl p-4 text-center"
                  >
                    <div
                      className="text-xl md:text-2xl font-bold text-white mb-1"
                      style={{ fontFamily: "var(--font-bebas), sans-serif" }}
                    >
                      {highlight.value}
                    </div>
                    <div
                      className="text-[10px] md:text-xs text-white/50 uppercase tracking-wider"
                      style={{ fontFamily: "var(--font-bebas), sans-serif" }}
                    >
                      {highlight.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Image Gallery */}
              <div className="mb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedRelease.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-[16/10] rounded-xl overflow-hidden bg-zinc-900 border border-white/5"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div
                className="space-y-6 text-lg text-white/80 leading-relaxed"
                style={{ fontFamily: "var(--font-open-sans), sans-serif" }}
              >
                {selectedRelease.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Featured Products */}
              <div className="mt-12 pt-8 border-t border-white/10">
                <h4
                  className="text-xl font-bold text-white mb-4 uppercase tracking-wide"
                  style={{ fontFamily: "var(--font-bebas), sans-serif" }}
                >
                  Featured Products
                </h4>
                <div className="flex flex-wrap gap-3">
                  {["Goldberg Malt Lager", "Hanson's Lite", "Basembi Extra", "Hanson's Choice Brandy", "Diamond Rock Gin"].map(
                    (product) => (
                      <span
                        key={product}
                        className="text-sm text-white/80 bg-zinc-900 border border-white/10 px-4 py-2 rounded-lg"
                        style={{ fontFamily: "var(--font-bebas), sans-serif" }}
                      >
                        {product}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Clickable backdrop to close */}
          <div className="fixed inset-0 z-[-1]" onClick={() => setSelectedRelease(null)} />
        </div>
      )}
    </main>
  );
}
