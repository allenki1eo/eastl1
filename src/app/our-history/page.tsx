"use client";

import { useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";

const eras = [
  {
    id: "founding",
    chapter: "01",
    year: "2017",
    title: "The Founding",
    description:
      "Born from a vision to craft premium beverages that reflect the spirit of East Africa, East African Spirits was established in 2017. Starting with a small team and bold ambitions, we set out to redefine quality in the regional beverage market.",
    images: ["/images/east7.png", "/images/east5.png", "/images/.png", "/images/east6.png"],
  },
  {
    id: "expansion",
    chapter: "02",
    year: "2018 – 2019",
    title: "Expansion Era",
    description:
      "From Tanzania into Kenya and Uganda, our distribution network grew rapidly. New product lines were launched and thousands of retailers became partners — bringing our beverages to millions of consumers across the region.",
    images: ["/images/east9.png", "/images/east10.png", "/images/east11.png", "/images/east12.png"],
  },
  {
    id: "innovation",
    chapter: "03",
    year: "2020 – 2022",
    title: "Innovation & Growth",
    description:
      "We deepened our commitment to product excellence — introducing premium gins, refining our vodka, and modernising our brewing processes. Quality became our sharpest competitive edge as we invested in sustainable production.",
    images: ["/images/east9.png", "/images/east10.png", "/images/east11.png", "/images/east12.png"],
  },
  {
    id: "today",
    chapter: "04",
    year: "2023+",
    title: "Today & Beyond",
    description:
      "A leading name in premium East African beverages with a growing portfolio and regional presence. We continue pushing forward — driven by pride in our roots and a passion for excellence that never settles.",
    images: ["/images/p2.png", "/images/p3.png", "/images/p4.png", "/images/p5.png"],
  },
];



export default function OurHistoryPage() {

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("history-snap");
    return () => {
      html.classList.remove("history-snap");
    };
  }, []);

  return (
    <>
      {/* Dot nav — fixed, always visible during snap zone */}
      <ul className={styles.dotNav}>
        {eras.map((era) => (
          <li key={era.id}>
            <a href={`#${era.id}`}><span className="sr-only">{era.title}</span></a>
          </li>
        ))}
      </ul>

      {/* Hero — first snap point */}
      <section className={styles.heroSection}>
        <div className="absolute inset-0 z-0">
          <Image src="/images/history.png" alt="Our History" fill className="object-cover opacity-20" priority />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
        </div>
        <div className="relative z-10 text-center px-4">
          <p className="text-[#c99b3e] text-xs font-bold uppercase tracking-[0.5em] mb-6" style={{ fontFamily: "var(--font-open-sans), sans-serif" }}>
            Est. 2017
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6 uppercase tracking-tight">
            Our Story
          </h1>
          <p className="text-lg md:text-xl text-white/50 uppercase tracking-widest" style={{ fontFamily: "var(--font-open-sans), sans-serif" }}>
            A Journey of Excellence Across East Africa
          </p>
          <div className="w-16 h-0.5 bg-[#c99b3e] mx-auto mt-10" />
        </div>
      </section>

      {/* Snap era sections */}
      {eras.map((era, index) => {
        const isEven = index % 2 === 0;
        return (
          <section id={era.id} key={era.id} className={styles.section}>
            <div className={styles.content}>
              <div className={`absolute inset-0 flex items-center ${isEven ? "flex-row" : "flex-row-reverse"}`}>

                <div className="w-full md:w-1/2 px-10 md:px-16 lg:px-24 z-20 relative">
                  <span className="text-[#c99b3e] text-xs font-bold uppercase tracking-[0.4em] mb-3 block" style={{ fontFamily: "var(--font-open-sans), sans-serif" }}>
                    Chapter {era.chapter}
                  </span>
                  <div className="text-5xl md:text-7xl font-bold text-white/10 leading-none mb-1 uppercase select-none" style={{ fontFamily: "var(--font-bebas), sans-serif" }}>
                    {era.year}
                  </div>
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tight mb-6 leading-tight" style={{ fontFamily: "var(--font-bebas), sans-serif" }}>
                    {era.title}
                  </h2>
                  <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-md" style={{ fontFamily: "var(--font-open-sans), sans-serif" }}>
                    {era.description}
                  </p>
                  <div className="w-12 h-0.5 bg-[#c99b3e] mt-8" />
                </div>

                <div className="hidden md:grid grid-cols-2 gap-3 w-1/2 h-full items-center p-10">
                  {era.images.map((img, i) => (
                    <div key={i} className="relative w-full aspect-[3/4] rounded-lg overflow-hidden">
                      <Image src={img} alt={`${era.title} — ${i + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={`absolute bottom-6 ${isEven ? "right-8 md:right-12" : "left-8 md:left-12"} text-[140px] lg:text-[180px] font-bold text-white/[0.03] leading-none pointer-events-none select-none`}
                style={{ fontFamily: "var(--font-bebas), sans-serif" }}
              >
                {era.chapter}
              </div>
            </div>
          </section>
        );
      })}


    </>
  );
}
