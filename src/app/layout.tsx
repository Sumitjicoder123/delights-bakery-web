import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Delights Cakes - Best Place in Mira Road for Cakes",
  description: "Best Place in Mira Road for Cakes. 100% Pure Veg & Eggless Fresh Cakes. Order custom celebration cakes, birthday cakes, and daily fresh pastries in Mira Road East.",
  keywords: "Best Place in Mira Road for Cakes, cakes near me, best cakes in mira road, cake shop mira road east, eggless cake shop near me, custom birthday cakes mira road, pure veg bakery mira road",
  icons: {
    icon: "/icon.jpg",
    apple: "/icon.jpg",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  "name": "Delights",
  "image": "https://delights-bakery-web.vercel.app/hero-cake.jpg",
  "@id": "https://delights-bakery-web.vercel.app",
  "url": "https://delights-bakery-web.vercel.app",
  "telephone": "+919819134616",
  "priceRange": "₹₹",
  "servesCuisine": "Bakery, Cakes, Desserts",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Abhilasha Residency Rd, Siddhi Vinayak Nagar, Mahajan Wadi, Mira Road East",
    "addressLocality": "Mira Bhayandar",
    "addressRegion": "Maharashtra",
    "postalCode": "401107",
    "addressCountry": "IN"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "09:30",
    "closes": "23:59"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
