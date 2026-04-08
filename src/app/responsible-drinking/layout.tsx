import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Responsible Drinking | East African Spirits Tanzania",
  description:
    "East African Spirits is committed to promoting responsible alcohol consumption. Learn about our stance on drinking responsibly, age verification (18+), and guidelines for safe enjoyment of our beverages.",
  keywords: [
    "responsible drinking",
    "drink responsibly Tanzania",
    "alcohol safety",
    "East African Spirits responsible drinking",
    "don't drink and drive",
    "moderate drinking",
    "18+ alcohol",
  ],
  openGraph: {
    title: "Responsible Drinking | East African Spirits",
    description: "We are committed to promoting responsible consumption and the wellbeing of our customers.",
  },
};

export default function ResponsibleDrinkingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
