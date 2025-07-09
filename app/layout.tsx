import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import SlideInCart from "./components/SlideInCart";
import ClientOnly from "./components/ClientOnly";
import StickyHeader from "./components/StickyHeader";
import { CartProvider } from "./contexts/CartContext";
import WebVitals from "./components/WebVitals";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "NoodKlaar - Emergency Preparedness Made Simple",
  description: "Expertly curated emergency kits for families, solo travelers, and pets. Stay prepared with high-quality emergency supplies.",
  metadataBase: new URL('https://noodklaar.nl'),
  openGraph: {
    title: 'NoodKlaar - Emergency Preparedness Made Simple',
    description: 'Expertly curated emergency kits for families',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <CartProvider>
          <ClientOnly>
            <WebVitals />
          </ClientOnly>
          <ClientOnly>
            <StickyHeader />
          </ClientOnly>
          {children}
          <Footer />
          <ClientOnly>
            <SlideInCart />
          </ClientOnly>
        </CartProvider>
      </body>
    </html>
  );
}
