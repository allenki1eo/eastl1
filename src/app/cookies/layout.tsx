import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | East African Spirits Tanzania",
  description:
    "Cookie Policy for East African Spirits - Learn about how we use cookies to improve your browsing experience, verify age (18+), and analyze website traffic. Manage your cookie preferences.",
  keywords: [
    "East African Spirits cookies",
    "cookie policy",
    "website cookies Tanzania",
    "age verification cookies",
    "privacy cookies",
  ],
  openGraph: {
    title: "Cookie Policy | East African Spirits",
    description: "How East African Spirits uses cookies to improve your browsing experience.",
  },
};

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
