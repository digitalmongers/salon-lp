import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hairdresser & Salon | Personal Stylist Portfolio",
  description:
    "Hairdresser of the year — bespoke cuts, glossy tresses, and transformative salon styling.",
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
