"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Home", href: "/" },
  // { name: "About Us", href: "/about-us" },
  { name: "Our History", href: "/our-history" },
  { name: "Our Team", href: "/our-team" },
  { name: "Our Beers", href: "/our-beers" },
  { name: "Our Spirits", href: "/our-spirits" },
  { name: "Contacts", href: "/contacts" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              "flex items-center transition-all duration-300",
              isScrolled ? "scale-90" : "scale-100"
            )}
          >
            <span
              className={cn(
                "font-cursive text-4xl md:text-5xl font-bold transition-all duration-300",
                isScrolled ? "text-foreground" : "text-foreground"
              )}
            >
              Eastl
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative text-lg font-semibold tracking-wide uppercase transition-colors hover:text-[#c99b3e]",
                  "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#c99b3e]",
                  "after:transition-all after:duration-300 hover:after:w-full",
                  isScrolled ? "text-foreground" : "text-foreground"
                )}
                style={{ fontFamily: "var(--font-bebas), sans-serif" }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isMobileMenuOpen
              ? "max-h-96 opacity-100 mt-4"
              : "max-h-0 opacity-0"
          )}
        >
          <nav className="flex flex-col space-y-4 py-4">
            {menuItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "text-base font-semibold tracking-wide uppercase py-2 px-4 rounded-lg hover:bg-accent transition-all duration-200",
                  "transform hover:translate-x-1"
                )}
                style={{
                  animationDelay: `${index * 50}ms`,
                  fontFamily: "var(--font-bebas), sans-serif"
                }}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
