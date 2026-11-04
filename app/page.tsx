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
    siteName: "HairDresser Studio",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        secureUrl: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Hairdresser & Salon | Personal Stylist Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hairdresser & Salon | Personal Stylist Portfolio",
    description:
      "Hairdresser of the year — bespoke cuts, glossy tresses, and transformative salon styling in London.",
    images: [`${siteUrl}/og-image.png`],
    creator: "@hairdresser",
  },
};

export default function HomePage() {
  return <SalonLanding />;
}
