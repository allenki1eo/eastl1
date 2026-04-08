import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Contact Us | East African Spirits Tanzania",
  description:
    "Contact East African Spirits - Get in touch with our team in Shinyanga, Tanzania. Reach our CEO, COO, CFO, Sales, HR, or General Inquiries departments. Business hours: Mon-Fri 8AM-5PM.",
  keywords: [
    "East African Spirits contact",
    "Tanzania beverage company contact",
    "Hanson's contact",
    "Goldberg contact",
    "Shinyanga office",
    "East African Spirits phone number",
    "East African Spirits email",
  ],
  openGraph: {
    title: "Contact Us | East African Spirits Tanzania",
    description: "Get in touch with East African Spirits - Ibadakuli, Industrial Plot 28, Shinyanga, Tanzania.",
  },
};

const departments = [
  {
    title: "Chief Executive Officer",
    role: "CEO",
    email: "ceo@eastafricanspirits.com",
    description: "Executive leadership and strategic direction",
  },
  {
    title: "Chief Operating Officer",
    role: "COO",
    email: "coo@eastafricanspirits.com",
    description: "Operations and business management",
  },
  {
    title: "Chief Financial Officer",
    role: "CFO",
    email: "cfo@eastafricanspirits.com",
    description: "Financial planning and management",
  },
  {
    title: "Sales Department",
    role: "Sales",
    email: "sales@eastafricanspirits.com",
    description: "Product inquiries and orders",
  },
  {
    title: "Human Resources",
    role: "HR",
    email: "hr@eastafricanspirits.com",
    description: "Careers and employee relations",
  },
  {
    title: "General Inquiries",
    role: "Info",
    email: "info@eastafricanspirits.com",
    description: "General questions and support",
  },
];

const contactInfo = [
  {
    icon: MapPin,
    title: "Location",
    details: ["Ibadakuli, Industrial Plot 28", "Shinyanga, Tanzania"],
  },
  {
    icon: Phone,
    title: "Phone",
    details: ["+255 767 650 806"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Monday - Friday: 8AM - 5PM", "Saturday: 8AM - 4PM", "Sunday: Closed"],
  },
];

export default function ContactsPage() {
  return (
    <main className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/4.jpg"
            alt="Contact Us"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6 uppercase tracking-tight">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl text-white/70 uppercase tracking-widest">
            Get In Touch With Our Team
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {contactInfo.map((info) => (
            <div
              key={info.title}
              className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-[#c99b3e] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-[#c99b3e]/20 flex items-center justify-center mb-4">
                <info.icon className="w-6 h-6 text-[#c99b3e]" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-white">{info.title}</h3>
              {info.details.map((detail, index) => (
                <p key={index} className="text-sm text-white/70">
                  {detail}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Department Contacts */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white uppercase tracking-tight">Contact Our Departments</h2>
            <p className="text-white/70">
              Click on any department to send an email directly
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <a
                key={dept.role}
                href={`mailto:${dept.email}`}
                className="group p-6 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-[#c99b3e] hover:shadow-lg hover:shadow-[#c99b3e]/10 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-[#c99b3e] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-lg text-white group-hover:text-zinc-300 transition-colors">
                        {dept.role}
                      </h3>
                      <span className="text-xs text-white/50">→</span>
                    </div>
                    <p className="text-sm text-white/70 mb-2">
                      {dept.title}
                    </p>
                    <p className="text-xs text-zinc-400 group-hover:text-[#c99b3e] transition-colors">
                      {dept.email}
                    </p>
                    <p className="text-xs text-white/50 mt-2">
                      {dept.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white uppercase tracking-tight">Visit Our Location</h2>
            <p className="text-white/70">
              Find us at our headquarters in Shinyanga
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.758253760561!2d33.473462173132305!3d-3.642533242737522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19cbb5d30b737f31%3A0x87776d4510e7f0d7!2sEast%20African%20Spirit%20(T)%20Ltd!5e0!3m2!1sen!2stz!4v1761030341618!5m2!1sen!2stz"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            ></iframe>
          </div>
        </div>
      </div>
    </main>
  );
}
