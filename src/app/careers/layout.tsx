import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | Join East African Spirits Tanzania",
  description:
    "Join East African Spirits - Tanzania's premier beverage company. Explore career opportunities in brewing, distillation, sales, marketing, and more. Build your career with East Africa's leading spirits and beer manufacturer.",
  keywords: [
    "East African Spirits careers",
    "Tanzania beverage jobs",
    "brewery jobs East Africa",
    "spirits company careers",
    "Shinyanga jobs",
    "Hanson's careers",
    "Goldberg beer jobs",
  ],
  openGraph: {
    title: "Careers | East African Spirits Tanzania",
    description: "Join our team and be part of East Africa's leading beverage company.",
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
