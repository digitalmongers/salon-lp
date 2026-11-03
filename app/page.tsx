import type { Metadata } from "next";
import { SalonLanding } from "@/components/salon-landing";

export const metadata: Metadata = {
  title: "Hairdresser & Salon | Personal Stylist Portfolio",
  description:
    "Hairdresser of the year — bespoke cuts, glossy tresses, and transformative salon styling in London. Book precision styling, highlights, and luxury bridal looks.",
  keywords: [
    "Hairdresser",
    "Hair Salon London",
    "Personal Stylist",
    "Precision Haircut",
    "Gloss Treatments",
    "Balayage Highlights",
    "Bridal Hair Stylist",
    "Luxury Salon London",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Hairdresser & Salon | Personal Stylist Portfolio",
    description:
      "Hairdresser of the year — bespoke cuts, glossy tresses, and transformative salon styling in London.",
    url: "/",
    siteName: "HairDresser Studio",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hairdresser & Salon | Personal Stylist Portfolio",
    description:
      "Hairdresser of the year — bespoke cuts, glossy tresses, and transformative salon styling in London.",
    creator: "@hairdresser",
  },
};

export default function HomePage() {
  return <SalonLanding />;
}
