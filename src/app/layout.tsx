import type { Metadata } from "next";
import { Bebas_Neue, Open_Sans, Dancing_Script } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AgeVerificationModal from "@/components/age-verification-modal";
import { Analytics } from "@vercel/analytics/next";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const dancingScript = Dancing_Script({
  variable: "--font-cursive",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "East African Spirits | Premium Beer & Spirits Tanzania",
    template: "%s | East African Spirits Tanzania",
  },
  description:
    "East African Spirits (T) Ltd - Tanzania's premier beverage company. Discover Goldberg, Hanson's Lite, Basembi Extra, Hanson's Choice Brandy, Diamond Rock Gin, and more. Premium beers and spirits crafted in Shinyanga since 2017.",
  keywords: [
    "East African Spirits",
    "Tanzania beer",
    "Tanzania spirits",
    "Goldberg beer",
    "Hanson's beer",
    "Hanson's vodka",
    "Hanson's gin",
    "Diamond Rock Gin",
    "Furaha Gin",
    "Hanson's Choice Brandy",
    "Basembi Extra",
    "Mbogo beer",
    "Hanson's Premium Cider",
    "Hanson's Dry",
    "premium alcoholic beverages East Africa",
    "beer manufacturer Tanzania",
    "spirits distributor Tanzania",
    "Shinyanga brewery",
    "East Africa drinks",
    "Tanzania alcohol brands",
  ],
  metadataBase: new URL("https://eastl1.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "East African Spirits",
    title: "East African Spirits | Premium Beer & Spirits Tanzania",
    description:
      "Tanzania's premier beverage company crafting premium beers and spirits since 2017. Goldberg, Hanson's, Diamond Rock Gin and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "East African Spirits | Premium Beer & Spirits Tanzania",
    description:
      "Tanzania's premier beverage company crafting premium beers and spirits since 2017.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
      </head>
      <body
        className={`${bebasNeue.variable} ${openSans.variable} ${dancingScript.variable} antialiased`}
        suppressHydrationWarning
      >
        <AgeVerificationModal />
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
