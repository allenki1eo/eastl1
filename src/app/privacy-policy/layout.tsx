import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | East African Spirits Tanzania",
  description:
    "East African Spirits Privacy Policy - Learn how we collect, use, and protect your personal information. Your privacy is important to us. Read about our data practices, cookies, and your rights.",
  keywords: [
    "East African Spirits privacy",
    "privacy policy Tanzania",
    "data protection",
    "cookie policy",
    "personal information",
  ],
  openGraph: {
    title: "Privacy Policy | East African Spirits",
    description: "Our commitment to protecting your privacy and personal data.",
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
