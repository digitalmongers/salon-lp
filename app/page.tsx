import type { Metadata } from "next";
import { SalonLanding } from "@/components/salon-landing";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://salon-lp-six.vercel.app");

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
    url: siteUrl,
    siteName: "Hair Stylo Studio, London",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/gps27k9y/image/upload/v1793686793/service-2.webp",
        secureUrl: "https://res.cloudinary.com/gps27k9y/image/upload/v1793686793/service-2.webp",
        width: 1200,
        height: 630,
        type: "image/webp",
        alt: "Hair Stylo Studio, London | Laura Smith",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hairdresser & Salon | Personal Stylist Portfolio",
    description:
      "Hairdresser of the year — bespoke cuts, glossy tresses, and transformative salon styling in London.",
    images: ["https://res.cloudinary.com/gps27k9y/image/upload/v1793686793/service-2.webp"],
    creator: "@hairdresser",
  },
};

export default function HomePage() {
  return <SalonLanding />;
}
