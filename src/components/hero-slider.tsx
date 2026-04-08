"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Slide data with actual product images
const slides = [
  {
    title: "Where every sip tells a story",
    subtitle: "Crafted for Those Who Celebrate Life in Full Flavor",
    image: "/images/slider1.jpg"
  },
  {
    title: "Pour Happiness. Serve Memories.",
    subtitle: "Sip, Smile, Repeat.",
    image: "/images/2.jpg"
  },
  {
    title: "The Signature of Excellence in Every Bottle",
    subtitle: "Craftsmanship You Can Taste",
    image: "/images/hansons2.jpg"
  },
  {
    title: "Inspired by Tradition. Perfected for Today",
    subtitle: "Since 2017",
    image: "/images/h_choice 3.jpg"
  }
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [autoSlideProgress, setAutoSlideProgress] = useState(0);

  const autoSlideRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const transitionRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return;

    setIsTransitioning(true);
    setAutoSlideProgress(0);

    // Clear auto-slide timer
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);

    // Update to new slide
    setCurrentIndex(index);

    // Reset transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 700); // Match the animation duration
  }, [currentIndex, isTransitioning]);

  const nextSlide = useCallback(() => {
    const next = (currentIndex + 1) % slides.length;
    goToSlide(next);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    const prev = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(prev);
  }, [currentIndex, goToSlide]);

  const startAutoSlide = useCallback(() => {
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);

    let prog = 0;
    autoSlideRef.current = setInterval(() => {
      prog += 0.5; // Slowed down slightly: 0.5% every 100ms = 20 seconds total (was 5s)
      setAutoSlideProgress(prog);

      if (prog >= 100) {
        clearInterval(autoSlideRef.current!);
        nextSlide();
      }
    }, 100);
  }, [nextSlide]);

  useEffect(() => {
    startAutoSlide();

    return () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
      if (transitionRef.current) clearTimeout(transitionRef.current);
    };
  }, [startAutoSlide]);

  // Restart auto-slide when transition ends
  useEffect(() => {
    if (!isTransitioning) {
      startAutoSlide();
    }
  }, [isTransitioning, startAutoSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'ArrowRight' || e.code === 'Space') {
        e.preventDefault();
        nextSlide();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={slides[currentIndex].image}
              alt={slides[currentIndex].title}
              fill
              className="object-cover"
              priority
              quality={100}
            />
            {/* Dark overlay for better text visibility */}
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Numbers */}
      <div className="absolute top-1/2 left-8 -translate-y-1/2 z-10">
        <span className="font-mono text-xs font-semibold text-white tracking-wider uppercase">
          {String(currentIndex + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="absolute top-1/2 right-8 -translate-y-1/2 z-10">
        <span className="font-mono text-xs font-semibold text-white tracking-wider uppercase">
          {String(slides.length).padStart(2, '0')}
        </span>
      </div>



      {/* Navigation */}
      <div className="absolute bottom-8 left-8 right-8 z-10 flex gap-0">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="flex-1 flex flex-col p-4 group cursor-pointer border-none bg-transparent"
          >
            {/* Progress Line */}
            <div className="w-full h-0.5 bg-white/20 mb-2 rounded-sm overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-100"
                style={{
                  width: index === currentIndex && !isTransitioning
                    ? `${autoSlideProgress}%`
                    : index === currentIndex
                      ? '0%'
                      : '0%',
                  opacity: index === currentIndex ? 1 : 0
                }}
              />
            </div>

            {/* Title */}
            {/* <div className={`font-mono text-[11px] uppercase tracking-wide transition-colors ${index === currentIndex ? 'text-white' : 'text-white/60'
              }`}>
              {slide.title}
            </div> */}
          </button>
        ))}
      </div>

      {/* Content Overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center z-5 pointer-events-none"
        >
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
              {slides[currentIndex].title}
            </h1>
            <p className="text-2xl md:text-3xl text-white/80">
              {slides[currentIndex].subtitle}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Click Area for Next Slide */}
      <div
        className="absolute inset-0 z-[1] cursor-pointer"
        onClick={nextSlide}
      />
    </div>
  );
}
