import type { Metadata } from "next";
import { Audiowide, Golos_Text } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

import LayoutClient from "./LayoutClient";
import AuthGuard from "./components/AuthGuard/AuthGuard";

const aundiowide = Audiowide({
  weight: "400",
  variable: "--font-audiowide",
  subsets: ["latin"],
});

const golostext = Golos_Text({
  weight: "500",
  variable: "--font-golostext",
  subsets: ["latin"],
});

const lufga = localFont({
  src: [
    {
      path: "../public/Lufga/Fontspring-DEMO-lufga-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/Lufga/Fontspring-DEMO-lufga-medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/Lufga/Fontspring-DEMO-lufga-bold.otf",
      weight: "700",
      style: "normal",
    },
  ],

  variable: "--font-lufga",
});

export const metadata: Metadata = {
  title: {
    default: "FashiQue — Women's Fashion",
    template: "%s | FashiQue",
  },
  description:
    "Shop dresses, accessories, and new arrivals at FashiQue. Secure checkout, order tracking, and fast shipping.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  openGraph: {
    title: "FashiQue — Women's Fashion",
    description:
      "Discover curated women's fashion at FashiQue. New arrivals every week.",
    type: "website",
    siteName: "FashiQue",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${aundiowide.variable} ${golostext.variable} ${lufga.variable}`}
      >
        <LayoutClient>
          <AuthGuard>
            {children}
          </AuthGuard>
        </LayoutClient>
      </body>
    </html>
  );
}