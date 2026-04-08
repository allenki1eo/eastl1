import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | East African Spirits Tanzania",
  description:
    "Frequently asked questions about East African Spirits - Goldberg, Hanson's Lite, Basembi Extra beers and Hanson's Choice Brandy, Diamond Rock Gin, Furaha Gin, Hanson's Vodka. Find answers about products, distribution, and more.",
  keywords: [
    "East African Spirits FAQ",
    "Goldberg beer questions",
    "Hanson's vodka information",
    "Tanzania beer FAQ",
    "beverage company questions",
    "East Africa spirits FAQ",
  ],
  openGraph: {
    title: "FAQ | East African Spirits",
    description: "Find answers to common questions about our products, services, and company.",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
