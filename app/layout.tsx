import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://hairdresser-salon.vercel.app";

export const viewport: Viewport = {
  themeColor: "#1C1D20",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hairdresser & Salon | Personal Stylist Portfolio",
    template: "%s | Hairdresser & Salon",
  },
  description:
    "Hairdresser of the year — bespoke cuts, glossy tresses, and transformative salon styling in London.",
  applicationName: "HairDresser Studio",
  authors: [{ name: "HairDresser Studio", url: siteUrl }],
  creator: "HairDresser Studio",
  publisher: "HairDresser Studio",
  keywords: [
    "Hairdresser",
    "Hair Salon",
    "Personal Stylist",
    "London Hairstylist",
    "Bespoke Cuts",
    "Hair Coloring",
    "Bridal Hair",
    "Hair Treatments",
    "Glossy Tresses",
  ],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: "HairDresser Salon & Stylist",
    title: "Hairdresser & Salon | Personal Stylist Portfolio",
    description:
      "Hairdresser of the year — bespoke cuts, glossy tresses, and transformative salon styling in London.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hairdresser & Salon | Personal Stylist Portfolio",
    description:
      "Hairdresser of the year — bespoke cuts, glossy tresses, and transformative salon styling in London.",
    creator: "@hairdresser",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;1,6..72,300&family=Poppins:wght@400;500&family=Syne:wght@600;700&display=swap"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;1,6..72,300&family=Poppins:wght@400;500&family=Syne:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#1C1D20] text-white selection:bg-[#E8BF96] selection:text-[#272422]">
        {children}
      </body>
    </html>
  );
}
