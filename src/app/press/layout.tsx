import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Press & Media | East African Spirits Tanzania",
  description:
    "Press releases, media resources, and news from East African Spirits - Tanzania's leading beverage company. Find information about Goldberg, Hanson's, Diamond Rock Gin, and our latest developments.",
  keywords: [
    "East African Spirits press",
    "Tanzania beverage company news",
    "Hanson's brand news",
    "Goldberg beer press release",
    "East Africa spirits media",
    "Tanzania brewery news",
  ],
  openGraph: {
    title: "Press & Media | East African Spirits",
    description: "Latest news and media resources from East African Spirits.",
  },
};

export default function PressLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
