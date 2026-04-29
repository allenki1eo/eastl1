"use client";

import { useEffect, useState, useCallback } from "react";

interface Spirit {
  id: number;
  brand: string;
  name: string;
  subtitle: string;
  image: string;
  specs: {
    type: string;
    abv: string;
    origin: string;
    volume: string;
  };
  badges: {
    category: string;
  };
}

const spirits: Spirit[] = [
  {
    id: 1,
    brand: "Hanson's",
    name: "Hanson's Choice Premium",
    subtitle: "Premium Brandy Crafted to Perfection",
    image: "/images/Hanson750.png",
    specs: {
      type: "Premium Brandy",
      abv: "40.0%",
      origin: "East Africa",
      volume: "750ml"
    },
    badges: {
      category: "Brandy"
    }
  },
  {
    id: 2,
    brand: "Hanson's",
    name: "Hanson's Choice",
    subtitle: "Premium Brandy Crafted to Perfection",
    image: "/images/hanson200.png",
    specs: {
      type: "Premium Brandy",
      abv: "40.0%",
      origin: "East Africa",
      volume: "200ml"
    },
    badges: {
      category: "Brandy"
    }
  },
  {
    id: 5,
    brand: "Hanson's",
    name: "Hanson's Vodka Premium",
    subtitle: "Pure Distilled Excellence",
    image: "/images/hansonvodka.png",
    specs: {
      type: "Premium Vodka",
      abv: "37.5%",
      origin: "East Africa",
      volume: "750ml"
    },
    badges: {
      category: "Vodka",
    }
  },
  {
    id: 3,
    brand: "Diamond Rock",
    name: "Diamond Rock Gin",
    subtitle: "Premium Gin Crafted to Perfection",
    image: "/images/rock2.png",
    specs: {
      type: "Premium Gin",
      abv: "43.0%",
      origin: "East Africa",
      volume: "750ml"
    },
    badges: {
      category: "Gin",
    }
  },
  {
    id: 6,
    brand: "Diamond Rock",
    name: "Diamond Rock Pineapple",
    subtitle: "Tropical Pineapple Infusion",
    image: "/images/pineapple.png",
    specs: {
      type: "Flavoured Gin",
      abv: "43.0%",
      origin: "East Africa",
      volume: "750ml"
    },
    badges: {
      category: "Gin",
    }
  },
  {
    id: 4,
    brand: "furaha",
    name: "Furaha Gin",
    subtitle: "Perfection in Every Drop",
    image: "/images/furaha.png",
    specs: {
      type: "Premium Gin",
      abv: "40.0%",
      origin: "East Africa",
      volume: "750ml"
    },
    badges: {
      category: "Gin",
    }
  }
];

export default function SpiritsScrollFilterAccordion() {
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  const nextSlide = useCallback(() => {
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % spirits.length;
    setCurrentIndex(nextIndex);
  }, [currentIndex]);

  const previousSlide = useCallback(() => {
    const prevIndex =
      currentIndex === -1
        ? spirits.length - 1
        : (currentIndex - 1 + spirits.length) % spirits.length;
    setCurrentIndex(prevIndex);
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") previousSlide();
      if (e.key === "ArrowRight") nextSlide();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, nextSlide, previousSlide]);

  const setActiveSlide = (index: number) => {
    if (currentIndex === index) {
      setCurrentIndex(-1);
    } else {
      setCurrentIndex(index);
    }
  };



  return (
    <section className="w-full h-screen min-h-[600px] relative overflow-hidden">
      {/* Now in Showroom Badge */}


      {/* Accordion Slider */}
      <div className="flex flex-col md:flex-row h-full relative">
        {spirits.map((spirit, index) => (
          <div
            key={spirit.id}
            onMouseEnter={() => setCurrentIndex(index)}
            onMouseLeave={() => setCurrentIndex(-1)}
            onClick={() => setActiveSlide(index)}
            className={`relative cursor-pointer bg-cover bg-center bg-no-repeat overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${currentIndex === index
              ? "flex-[2.5] md:flex-[2.5] "
              : "flex-1"
              }`}
            style={{ backgroundImage: `url('${spirit.image}')` }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>

            {/* Slide Content */}
            <div
              className={`absolute text-white z-[2] left-[15px] right-[15px] md:left-[30px] md:right-[30px] transition-all duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${currentIndex === index ? "bottom-[60px] md:bottom-[80px] delay-200" : "bottom-[15px] md:bottom-[30px]"
                }`}
            >
              {/* Slide Number */}
              <div
                className={`font-light text-white/60 leading-none absolute left-0 transition-all duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${currentIndex === index
                  ? "text-3xl md:text-5xl top-[-30px] md:top-[-50px]"
                  : "text-4xl md:text-6xl bottom-[15px] md:bottom-[30px]"
                  }`}
              >
                {String(spirit.id).padStart(2, "0")}
              </div>

              {/* Brand Name */}
              <div
                className={`text-sm md:text-base font-semibold text-white/80 mb-1 md:mb-1.5 whitespace-nowrap transition-all duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${currentIndex === index
                  ? "rotate-0 static origin-[unset]"
                  : "md:rotate-[-90deg] md:origin-left-bottom md:absolute md:bottom-[100px] md:left-[30px] rotate-0"
                  }`}
                style={{ fontFamily: "var(--font-bebas), sans-serif" }}
              >
                {spirit.brand}
              </div>

              {/* Spirit Name */}
              <h3
                className={`text-xl md:text-2xl lg:text-3xl font-bold mb-1 md:mb-2 transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] ${currentIndex === index
                  ? "opacity-100 translate-y-0 delay-[300ms]"
                  : "opacity-0 translate-y-[30px] delay-0"
                  }`}
                style={{ fontFamily: "var(--font-bebas), sans-serif" }}
              >
                {spirit.name}
              </h3>

              {/* Subtitle */}
              <p
                className={`text-sm md:text-base text-white/80 mb-3 md:mb-5 transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] ${currentIndex === index
                  ? "opacity-100 translate-y-0 delay-[400ms]"
                  : "opacity-0 translate-y-[30px] delay-0"
                  }`}
                style={{ fontFamily: "var(--font-open-sans), sans-serif" }}
              >
                {spirit.subtitle}
              </p>

              {/* Specs */}
              <div
                className={`transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] ${currentIndex === index
                  ? "opacity-100 translate-y-0 delay-[500ms]"
                  : "opacity-0 translate-y-[30px] delay-0"
                  }`}
              >
                <div
                  className={`flex justify-between mb-1 md:mb-1.5 text-xs md:text-sm transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${currentIndex === index
                    ? "opacity-100 translate-x-0 delay-[600ms]"
                    : "opacity-0 -translate-x-5"
                    }`}
                  style={{ fontFamily: "var(--font-open-sans), sans-serif" }}
                >
                  <span className="text-white/70">Type:</span>
                  <span className="font-semibold">{spirit.specs.type}</span>
                </div>
                <div
                  className={`flex justify-between mb-1 md:mb-1.5 text-xs md:text-sm transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${currentIndex === index
                    ? "opacity-100 translate-x-0 delay-[650ms]"
                    : "opacity-0 -translate-x-5"
                    }`}
                  style={{ fontFamily: "var(--font-open-sans), sans-serif" }}
                >
                  <span className="text-white/70">ABV:</span>
                  <span className="font-semibold">{spirit.specs.abv}</span>
                </div>
                <div
                  className={`flex justify-between mb-1 md:mb-1.5 text-xs md:text-sm transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${currentIndex === index
                    ? "opacity-100 translate-x-0 delay-[700ms]"
                    : "opacity-0 -translate-x-5"
                    }`}
                  style={{ fontFamily: "var(--font-open-sans), sans-serif" }}
                >
                  <span className="text-white/70">Origin:</span>
                  <span className="font-semibold">{spirit.specs.origin}</span>
                </div>
                <div
                  className={`flex justify-between mb-1 md:mb-1.5 text-xs md:text-sm transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${currentIndex === index
                    ? "opacity-100 translate-x-0 delay-[750ms]"
                    : "opacity-0 -translate-x-5"
                    }`}
                  style={{ fontFamily: "var(--font-open-sans), sans-serif" }}
                >
                  <span className="text-white/70">Volume:</span>
                  <span className="font-semibold">{spirit.specs.volume}</span>
                </div>
              </div>

              {/* Performance Badges */}
              <div
                className={`flex flex-wrap gap-2 md:gap-3 mt-2 md:mt-4 transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] ${currentIndex === index
                  ? "opacity-100 translate-y-0 delay-[800ms]"
                  : "opacity-0 translate-y-[30px] delay-0"
                  }`}
              >
                <div
                  className={`flex items-center gap-1 md:gap-1.5 px-1.5 md:px-2 py-0.5 md:py-1 bg-white/10 rounded-xl text-[10px] md:text-xs font-medium transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${currentIndex === index
                    ? "opacity-100 scale-100 delay-[850ms]"
                    : "opacity-0 scale-80"
                    }`}
                  style={{ fontFamily: "var(--font-open-sans), sans-serif" }}
                >
                  <span className="w-1.5 md:w-2 h-1.5 md:h-2 bg-[#c99b3e] rounded-full"></span>
                  <span>{spirit.badges.category}</span>
                </div>
              </div>
            </div>

            {/* Add Button */}
            <div className="absolute bottom-[15px] right-[15px] md:bottom-[30px] md:right-[30px] w-7 h-7 md:w-8 md:h-8 bg-transparent border-2 border-[#c99b3e] rounded-full flex items-center justify-center cursor-pointer transition-all duration-400 z-[3]">
              <div className="relative w-full h-full flex items-center justify-center">
                <span
                  className={`absolute w-3 h-0.5 bg-[#c99b3e] transition-all duration-400 ${currentIndex === index ? "rotate-0" : ""
                    }`}
                ></span>
                <span
                  className={`absolute w-0.5 h-3 bg-[#c99b3e] transition-all duration-400 ${currentIndex === index ? "opacity-0 scale-0" : "opacity-100 scale-100"
                    }`}
                ></span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={previousSlide}
        className="absolute top-1/2 -translate-y-1/2 left-2 md:left-5 w-10 h-10 md:w-12 md:h-12 bg-white/10 border-none rounded-full text-white cursor-pointer text-lg md:text-xl flex items-center justify-center transition-all duration-300 z-[4] backdrop-blur-[10px] hover:bg-white/20"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 -translate-y-1/2 right-2 md:right-5 w-10 h-10 md:w-12 md:h-12 bg-white/10 border-none rounded-full text-white cursor-pointer text-lg md:text-xl flex items-center justify-center transition-all duration-300 z-[4] backdrop-blur-[10px] hover:bg-white/20"
      >
        ›
      </button>
    </section>
  );
}
