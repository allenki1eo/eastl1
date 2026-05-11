"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function AgeVerificationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Don't show modal on the underage page
    if (pathname === "/underage") return;

    // Check if user has already verified their age on this device
    const isVerified = localStorage.getItem("ageVerified");

    if (!isVerified) {
      // Small delay before showing modal for better UX
      setTimeout(() => setIsOpen(true), 500);
    }
  }, [pathname]);

  const handleConfirm = () => {
    // User confirms they are of legal age — persist across sessions
    localStorage.setItem("ageVerified", "true");
    setIsExiting(true);
    setTimeout(() => setIsOpen(false), 300);
  };

  const handleDeny = () => {
    // User is underage — redirect to age-restricted page
    window.location.href = "/underage";
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity duration-300 ${isExiting ? "opacity-0" : "opacity-100"
        }`}
    >
      <div
        className={`relative max-w-md w-full mx-4 bg-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 ${isExiting ? "scale-95 opacity-0" : "scale-100 opacity-100"
          }`}
      >
        {/* Top Half - Image */}
        <div className="relative w-full h-64 bg-zinc-900">
          <Image
            src="/images/lite.png"
            alt="East African Spirits"
            fill
            className="object-cover"
          />
        </div>

        {/* Bottom Half - Content */}
        <div className="p-8">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4 uppercase tracking-tight">
            Age Verification
          </h2>

          {/* Description */}
          <p className="text-white/70 text-center mb-8 leading-relaxed">
            You must be of legal drinking age to enter this website. Please confirm that you are 18 years or older.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleConfirm}
              className="flex-1 bg-[#c99b3e] hover:bg-[#d4a84a] text-white font-bold py-4 px-6 rounded-lg uppercase tracking-wider transition-all duration-300 transform hover:scale-105"
            >
              I am 18+
            </button>
            <button
              onClick={handleDeny}
              className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white/70 hover:text-white font-semibold py-4 px-6 rounded-lg uppercase tracking-wider transition-all duration-300 border border-white/10"
            >
              I am Under 18
            </button>
          </div>

          {/* Legal Notice */}
          <p className="text-xs text-white/40 text-center mt-6">
            By entering this site, you accept our terms and conditions and privacy policy.
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#c99b3e]/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#c99b3e]/10 rounded-full blur-3xl -z-10" />
      </div>
    </div>
  );
}
