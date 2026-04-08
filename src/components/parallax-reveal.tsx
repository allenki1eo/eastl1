"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const videoBoxRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mountainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !introRef.current || !scrollRef.current || !videoBoxRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(".intro-line", {
        transformOrigin: "center top",
        transformStyle: "preserve-3d",
      });

      gsap.set(videoBoxRef.current, { scale: 0.26, borderRadius: 28, transformOrigin: "center center" });
      gsap.set(mediaRef.current, { scale: 1 });
      gsap.set(mountainRef.current, { clipPath: "inset(100% 0 0 0)" });
      gsap.set(".drink-banner", { opacity: 0, y: 28 });

      gsap.timeline({
        scrollTrigger: {
          trigger: introRef.current,
          start: "top top",
          end: "+=55%",
          scrub: 1,
        }
      }).to(".intro-line", {
        rotationX: 80,
        y: -28,
        scale: 0.82,
        opacity: 0,
        filter: "blur(5px)",
        ease: "power2.inOut",
        stagger: 0.08,
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: scrollRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.1,
          onEnter: () => {
            void videoRef.current?.play();
          },
          onEnterBack: () => {
            void videoRef.current?.play();
          },
        }
      })
        .to(videoBoxRef.current, {
          scale: 1,
          borderRadius: 0,
          ease: "expo.out",
          duration: 1.35,
        }, 0)
        .to(mediaRef.current, {
          scale: 1.08,
          ease: "none",
          duration: 1.45,
        }, 0)
        ;

      gsap.timeline({
        scrollTrigger: {
          trigger: mountainRef.current,
          start: "top 82%",
          end: "top 50%",
          scrub: 1,
        }
      })
        .to(mountainRef.current, {
          clipPath: "inset(0% 0 0 0)",
          ease: "power3.out",
          duration: 1,
        })
        .to(".drink-banner", {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 0.4,
        }, 0.3);
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#0f0d0b] text-[#f6f1e8]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/45 to-transparent" />

      <div ref={introRef} className="grid min-h-[82vh] grid-cols-12 gap-4 px-6 py-6 md:px-10 md:py-8">
        <div className="col-span-12 flex flex-col items-center justify-center text-center md:col-start-4 md:col-span-6">
          <p className="intro-line text-xs uppercase tracking-[0.34em] text-[#c99b3e] md:text-sm">
            EAST AFRICAN SPIRITS (T) LTD
          </p>
          <h1
            className="intro-line mt-4 text-6xl font-bold uppercase leading-[0.9] md:text-8xl lg:text-[7.8rem]"
            style={{ fontFamily: "var(--font-bebas), sans-serif" }}
          >
            Bold by Origin
          </h1>
          <h2
            className="intro-line mt-2 text-4xl font-bold uppercase leading-[0.92] md:text-6xl lg:text-[5.2rem]"
            style={{ fontFamily: "var(--font-bebas), sans-serif" }}
          >
            Crafted for Presence
          </h2>
          <p className="intro-line mt-7 text-xs uppercase tracking-[0.3em] text-[#c99b3e]">{`{ SHINYANGA / SINCE 2018 }`}</p>
          <div className="intro-line mt-9 text-xs uppercase tracking-[0.22em] text-[#f6f1e8]/75 md:text-sm">
            <p>Engineered consistency. Elevated character.</p>
            <p>Built for East Africa and beyond.</p>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="relative h-[200vh]">
        <div className="sticky top-0 flex h-screen items-center justify-center px-4">
          <div
            ref={videoBoxRef}
            className="relative h-screen w-screen overflow-hidden rounded-[28px] bg-black"
          >
            <div ref={mediaRef} className="h-full w-full overflow-hidden">
              <video ref={videoRef} className="h-full w-full object-cover" loop muted playsInline autoPlay>
                <source src="/videos/hchoice.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>

      <div ref={mountainRef} className="relative h-[36vh] overflow-hidden bg-[#090807]">
        <div className="drink-banner absolute left-1/2 top-[42%] z-10 w-[96%] max-w-6xl -translate-x-1/2 -translate-y-1/2 bg-black/55 px-4 py-6 text-center md:top-[44%] md:px-8 md:py-10">
          <p className="text-[11px] uppercase tracking-[0.34em] text-[#c99b3e] md:text-sm">Responsible Drinking</p>
          <p
            className="mt-2 text-5xl font-bold uppercase leading-[0.86] text-[#f8f6f2] md:text-8xl lg:text-[8.5rem]"
            style={{ fontFamily: "var(--font-bebas), sans-serif" }}
          >
            Drink Responsibly
          </p>
          <p
            className="mt-1 text-4xl font-bold uppercase leading-[0.88] text-[#f8f6f2] md:text-7xl lg:text-[7.2rem]"
            style={{ fontFamily: "var(--font-bebas), sans-serif" }}
          >
            Never Drink and Drive
          </p>
        </div>
      </div>
    </section>
  );
}
