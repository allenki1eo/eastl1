import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the leadership and operational team behind East African Spirits — the people driving excellence in every bottle.",
};

export default function OurTeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
