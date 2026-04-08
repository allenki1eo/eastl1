import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Delivery | East African Spirits Tanzania",
  description:
    "East African Spirits delivers premium beers and spirits across Tanzania and exports to Rwanda, Burundi, and Congo. Our own fleet of trucks ensures fresh, timely delivery of Goldberg, Hanson's, and all our products.",
  keywords: [
    "East African Spirits delivery",
    "Tanzania beer delivery",
    "spirits shipping Tanzania",
    "Goldberg delivery",
    "Hanson's shipping",
    "East Africa beverage distribution",
    "beverage delivery service",
  ],
  openGraph: {
    title: "Shipping & Delivery | East African Spirits",
    description: "We have our own fleet of trucks ready to deliver your orders anywhere across the country and beyond.",
  },
};

export default function ShippingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
