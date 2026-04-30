"use client";

import { useState } from "react";
import Image from "next/image";

const showcaseItems = [
  {
    id: "craft-with-purpose",
    title: "We build quality with intent",
    description:
      "Every release is shaped around consistency, safety, and dependable taste so people trust what they pour, every single time.",
    image: "/images/industry4.png",
    details: [
      "We design products for real-life moments, not short-lived trends. That means production discipline, clear standards, and quality checks that stay uncompromising from start to finish.",
      "Behind each bottle and can is a practical promise: stable flavor, clean finish, and confidence that the product in your hand meets the same benchmark every time.",
      "The result is a portfolio built on reliability and pride - crafted locally, presented professionally, and made to stand comfortably beside global alternatives."
    ]
  },
  {
    id: "rooted-and-advancing",
    title: "Rooted in local pride, built for growth",
    description:
      "From Shinyanga outward, the focus is clear: elevate local manufacturing while serving a wider East African market with confidence.",
    image: "/images/industry3.png",
    details: [
      "The business story is not just about beverages; it is about industrial confidence, local capability, and raising standards for what homegrown production can achieve.",
      "As distribution expands, the same identity stays intact: accessible products, strong shelf presence, and messaging that celebrates local pride without compromising ambition.",
      "This creates a brand ecosystem that feels both close to the community and ready for broader regional relevance."
    ]
  },
  {
    id: "modern-production",
    title: "Modern process, consistent delivery",
    description:
      "Operational investment supports cleaner output, stronger control, and better scalability across both spirits and beer lines.",
    image: "/images/industry.png",
    details: [
      "A strong production backbone matters. Advanced processing and filtration approaches make it easier to protect flavor clarity, reduce variability, and support higher volumes without drift in quality.",
      "Packaging, storage, and logistics are treated as part of product quality, not separate steps. That mindset improves freshness, protects brand trust, and strengthens retailer confidence.",
      "In practical terms, the operation is set up to keep improving while maintaining what customers already value most: dependable, easy-to-enjoy products."
    ]
  },
  {
    id: "people-and-responsibility",
    title: "People-first and responsibility-led",
    description:
      "The strongest long-term brands combine celebration with responsibility, and growth with respect for consumers and communities.",
    image: "/images/industry2.png",
    details: [
      "Great beverage companies do more than sell products - they shape culture. Responsible consumption messaging, age-gate clarity, and transparent communication are central to that role.",
      "Customer feedback loops, practical support channels, and clear contact pathways keep the brand close to the people it serves.",
      "That balance between ambition and accountability is what turns a product portfolio into a durable, respected company identity."
    ]
  }
];

const accentColors = ["#3a2a14", "#6a4720", "#8c622a", "#c99b3e"];

export default function ProductShowcase() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [openTabIndex, setOpenTabIndex] = useState<number | null>(null);

  return (
    <section className="relative h-screen min-h-[720px] overflow-hidden text-white">
      <div className="absolute inset-0 z-0">
        {showcaseItems.map((item, index) => (
          <div
            key={`bg-${item.id}`}
            className={`absolute inset-0 transition-opacity duration-500 ${
              activeImageIndex === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority={index === 0}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="pointer-events-none absolute left-1/2 top-6 z-20 w-full max-w-5xl -translate-x-1/2 px-4 text-center md:top-10">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c99b3e]/90 md:text-sm">
          Inside Eastl
        </p>
        <h2 className="mt-3 text-3xl font-bold uppercase tracking-[0.08em] text-white md:text-5xl">
          Craft, Character, Consistency
        </h2>
      </div>

      <div className="absolute inset-x-0 bottom-0 top-24 z-10 flex flex-wrap border-t border-white/25 md:top-36 md:flex-nowrap md:border-t-0">
        {showcaseItems.map((item, index) => {
          const isHovered = hoveredIndex === index;

          return (
            <article
              key={item.id}
              className="group flex h-1/4 w-full cursor-pointer items-end overflow-hidden border-b border-white/25 md:h-full md:w-1/4 md:border-b-0 md:border-r md:border-white/25 md:last:border-r-0"
              onMouseEnter={() => {
                setHoveredIndex(index);
                setActiveImageIndex(index);
              }}
              onFocus={() => {
                setHoveredIndex(index);
                setActiveImageIndex(index);
              }}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setOpenTabIndex(index)}
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setOpenTabIndex(index);
                }
              }}
            >
              <div
                className="w-full p-5 transition-all duration-500 ease-out md:p-8"
                style={{
                  backgroundColor: isHovered ? `${accentColors[index]}E6` : "transparent",
                  transform: isHovered ? "translateY(0)" : "translateY(72px)"
                }}
              >
                <h3 className="text-lg font-bold uppercase tracking-[0.08em] md:text-xl">
                  {item.title}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed text-white/85 transition-all duration-500 ease-out md:text-base"
                  style={{
                    opacity: isHovered ? 1 : 0.85,
                    transform: isHovered ? "translateY(0)" : "translateY(14px)"
                  }}
                >
                  {item.description}
                </p>
                <button
                  type="button"
                  className="mt-5 border-2 border-white px-5 py-2 text-sm font-semibold uppercase tracking-wide transition-colors hover:bg-white hover:text-black"
                  onClick={(event) => {
                    event.stopPropagation();
                    setOpenTabIndex(index);
                  }}
                >
                  Read More
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {openTabIndex !== null && (
        <div
          className="absolute inset-0 z-30 overflow-y-auto"
          style={{ backgroundColor: accentColors[openTabIndex] }}
        >
          <div className="mx-auto w-full max-w-6xl p-4 md:p-8 lg:p-10">
            <button
              type="button"
              title="Close"
              className="ml-auto flex h-8 w-8 items-center justify-center border-2 border-white text-white transition-colors hover:bg-white hover:text-black"
              onClick={() => setOpenTabIndex(null)}
            >
              <span className="text-xl leading-none">x</span>
            </button>

            <div className="relative mt-4 h-[240px] w-full md:h-[420px]">
              <Image
                src={showcaseItems[openTabIndex].image}
                alt={showcaseItems[openTabIndex].title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-black/35" />
            </div>

            <div className="relative z-10 mx-auto -mt-6 max-w-5xl bg-white p-5 text-black md:-mt-12 md:p-10">
              <h3 className="text-2xl font-bold uppercase tracking-[0.08em] md:text-4xl">
                {showcaseItems[openTabIndex].title}
              </h3>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-zinc-700 md:text-lg">
                {showcaseItems[openTabIndex].details.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
