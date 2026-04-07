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
  title: "East African Spirits - Premium Alcoholic Beverages",
  description: "Discover premium spirits and beverages from East Africa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
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
