import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Age Restricted | East African Spirits Tanzania",
  description:
    "You must be of legal drinking age to access this website. East African Spirits promotes responsible drinking.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function UnderagePage() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 rounded-full border-2 border-[#c99b3e]/30 flex items-center justify-center">
            <span className="text-4xl font-bold text-[#c99b3e]">18+</span>
          </div>
        </div>

        {/* Heading */}
        <h1
          className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight leading-tight"
          style={{ fontFamily: "var(--font-bebas), sans-serif" }}
        >
          Age Verification Required
        </h1>

        {/* Message */}
        <p
          className="text-white/70 text-lg md:text-xl mb-8 leading-relaxed"
          style={{ fontFamily: "var(--font-open-sans), sans-serif" }}
        >
          Sorry, you must be 18 years or older to enter this website. We are committed to responsible drinking and age-appropriate access to our products.
        </p>

        {/* Divider */}
        <div className="w-16 h-0.5 bg-[#c99b3e]/30 mx-auto mb-8" />

        {/* Sub-message */}
        <p
          className="text-white/50 text-sm mb-10 leading-relaxed"
          style={{ fontFamily: "var(--font-open-sans), sans-serif" }}
        >
          If you have reached the legal drinking age in your country, you are welcome to return and explore our collection of premium beers and spirits.
        </p>

        {/* Return Button */}
        <Link
          href="/"
          className="inline-block bg-[#c99b3e] hover:bg-[#d4a84a] text-white font-bold py-4 px-10 rounded-lg uppercase tracking-wider transition-all duration-300 transform hover:scale-105"
          style={{ fontFamily: "var(--font-bebas), sans-serif" }}
        >
          Return to Homepage
        </Link>

        {/* Responsible Drinking Note */}
        <p
          className="text-white/30 text-xs mt-10"
          style={{ fontFamily: "var(--font-open-sans), sans-serif" }}
        >
          Please drink responsibly. Excessive consumption of alcohol is harmful to your health.
        </p>
      </div>
    </main>
  );
}
