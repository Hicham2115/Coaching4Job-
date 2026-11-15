import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import SmoothScroll from "@/components/smooth-scroll";
import { Toaster } from "@/components/ui/sonner";
import "lenis/dist/lenis.css";
import "./globals.css";
import { ogImage, siteDescription, siteName, siteTitle, siteUrl } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: `%s | ${siteName}` },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "coaching carrière",
    "coaching emploi Casablanca",
    "coach carrière Maroc",
    "trouver un emploi",
    "premier emploi",
    "changer de poste",
    "devenir entrepreneur",
    "conférence en ligne",
    "préparation entretien d’embauche",
  ],
  authors: [{ name: "Driss Benchekroun" }],
  creator: "Driss Benchekroun",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName,
    locale: "fr_MA",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: ogImage,
        alt: "La mosquée Hassan II à Casablanca, Coaching 4 Job",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Suspense fallback={null}>
          <SmoothScroll />
        </Suspense>
        <Toaster position="bottom-right" />
        {children}
      </body>
    </html>
  );
}
