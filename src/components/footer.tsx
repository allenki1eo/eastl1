import Link from "next/link";
import { InstagramLogo, TiktokLogo } from "@phosphor-icons/react/dist/ssr";

const footerLinks = {
  company: [
    { name: "Our History", href: "/our-history" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
  ],
  products: [
    { name: "Our Beers", href: "/our-beers" },
    { name: "Our Spirits", href: "/our-spirits" },
  ],
  support: [
    { name: "Contact Us", href: "/contacts" },
    { name: "FAQ", href: "/faq" },
    { name: "Shipping", href: "/shipping" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Responsible Drinking", href: "/responsible-drinking" },
  ],
};

const socialLinks = [
  { name: "TikTok", Icon: TiktokLogo, href: "https://tiktok.com/goldberg" },
  { name: "Instagram Goldberg", Icon: InstagramLogo, href: "https://instagram.com/goldberg.tz" },
  { name: "Instagram Hansons", Icon: InstagramLogo, href: "https://instagram.com/hansons_choice" },
];

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <span className="font-cursive text-4xl md:text-5xl font-bold text-foreground">
                Eastl
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Crafting premium spirits and beverages since 2017.
              Experience the finest quality from East Africa.
            </p>
            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="p-2.5 rounded-lg bg-muted hover:bg-[#c99b3e] hover:text-white transition-all duration-300 group"
                  aria-label={social.name}
                >
                  <social.Icon size={18} weight="light" className="group-hover:scale-110 transition-transform duration-200" />
                </Link>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-[#c99b3e] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Products</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-[#c99b3e] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-[#c99b3e] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-[#c99b3e] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} East African Spirits (T) Ltd. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground text-center md:text-right">
              Please drink responsibly. Must be 18+ to purchase.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
