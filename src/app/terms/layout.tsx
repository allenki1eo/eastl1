import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | East African Spirits Tanzania",
  description:
    "Terms of Service for East African Spirits - Read our terms and conditions for using our website and purchasing our products. Includes age restrictions, intellectual property rights, and responsible drinking policies.",
  keywords: [
    "East African Spirits terms",
    "terms of service",
    "terms and conditions Tanzania",
    "alcohol purchase terms",
    "website terms",
  ],
  openGraph: {
    title: "Terms of Service | East African Spirits",
    description: "Terms and conditions for using the East African Spirits website and services.",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
