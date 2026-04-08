import type { Metadata } from "next";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Our History | East African Spirits Story Since 2017",
  description:
    "Discover the journey of East African Spirits - from our founding in Shinyanga in 2017 to becoming Tanzania's leading beverage company. Learn about our expansion across East Africa and commitment to premium quality.",
  keywords: [
    "East African Spirits history",
    "Tanzania beverage company story",
    "Shinyanga brewery history",
    "East Africa spirits timeline",
    "Goldberg beer history",
    "Hanson's brand story",
  ],
  openGraph: {
    title: "Our History | East African Spirits Since 2017",
    description: "The journey of East African Spirits - from Shinyanga to East Africa's premium beverage company.",
  },
};

export default function OurHistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Snap scroll zone — fixed panels live inside here */}
      <div id="history-scroll-zone">
        {children}
      </div>

      {/* Footer sits completely outside the snap/fixed stacking context */}
      <div style={{ position: "relative", zIndex: 30, background: "var(--background)" }}>
        <Footer />
      </div>
    </>
  );
}
