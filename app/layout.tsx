import type { Metadata, Viewport } from "next";
import { Bai_Jamjuree, Bricolage_Grotesque } from "next/font/google";
import { BookLink } from "@/components/BookLink";
import { SmoothScroll } from "@/components/SmoothScroll";
import { site } from "@/data/content";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const text = Bai_Jamjuree({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-text",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sthalam | Studio floors in Kochi",
  description: site.description,
  applicationName: site.fullName,
  authors: [{ name: site.fullName }],
  keywords: [
    "studio floor Kochi",
    "podcast studio Kochi",
    "photography studio Vazhakkala",
    "shooting floor rental Kerala",
    "Sthalam Studio Floors",
  ],
  openGraph: {
    title: "Sthalam | Studio floors in Kochi",
    description: site.description,
    type: "website",
    locale: "en_IN",
    siteName: site.fullName,
  },
  twitter: {
    card: "summary_large_image",
    title: "Sthalam | Studio floors in Kochi",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A09",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable}`}>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <SmoothScroll />
        <BookLink />
        {children}
      </body>
    </html>
  );
}
