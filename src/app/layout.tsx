import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SITE_CONFIG } from "@/config/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

const SITE_URL = "https://delightscakes.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Delights Cakes - Best Eggless Cake Shop in Mira Road | 100% Pure Veg",
    template: "%s | Delights Cakes Mira Road",
  },
  description: `Delights Cakes is the Best Place in Mira Road for 100% Pure Veg & Eggless Fresh Cakes. Order custom birthday cakes, chocolate cakes, black forest, red velvet & 20+ flavors. Free delivery in Mira Road East. Call ${SITE_CONFIG.contact.displayPhone}.`,
  keywords: [
    "Delights Cakes",
    "Best Place in Mira Road for Cakes",
    "best cake shop mira road",
    "cake shop near me",
    "eggless cake shop mira road",
    "birthday cake mira road",
    "custom cake mira road east",
    "pure veg cake shop mira road",
    "chocolate cake mira road",
    "black forest cake mira road",
    "red velvet cake mira road",
    "cake delivery mira road",
    "best bakery mira road east",
    "eggless bakery near me",
    "cake order online mira road",
    "fresh cream cake mira road",
  ],
  authors: [{ name: "Delights Cakes", url: SITE_URL }],
  creator: "Delights Cakes",
  publisher: "Delights Cakes",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Delights Cakes",
    title: "Delights Cakes - Best Eggless Cake Shop in Mira Road",
    description: "Best Place in Mira Road for 100% Pure Veg & Eggless Fresh Cakes. 20+ flavors, custom designs, free delivery. Order on WhatsApp!",
    images: [
      {
        url: `${SITE_URL}/hero-cake.jpg`,
        width: 1200,
        height: 630,
        alt: "Delights Cakes - Fresh Eggless Cakes in Mira Road",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Delights Cakes - Best Eggless Cake Shop in Mira Road",
    description: "Best Place in Mira Road for 100% Pure Veg & Eggless Fresh Cakes. Order on WhatsApp!",
    images: [`${SITE_URL}/hero-cake.jpg`],
  },
  alternates: {
    canonical: SITE_URL,
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
  verification: {
    google: "Yc1EDo0OvKadpWLlQZztnKrSdYPPa6Vt-EFk3HIqD-g",
  },
  category: "food",
};

const bakeryJsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  "name": "Delights Cakes",
  "alternateName": "Delights Cake Shop",
  "image": `${SITE_URL}/og-image.jpg`,
  "logo": `${SITE_URL}/icon.png`,
  "@id": SITE_URL,
  "url": SITE_URL,
  "telephone": SITE_CONFIG.contact.displayPhone,
  "priceRange": "\u20B9200 - \u20B92000",
  "servesCuisine": ["Cakes", "Pastries", "Desserts", "Bakery"],
  "menu": SITE_URL,
  "acceptsReservations": false,
  "currenciesAccepted": "INR",
  "paymentAccepted": "Cash, UPI, Google Pay, PhonePe",
  "description": "Best eggless cake shop in Mira Road. 100% Pure Veg & Eggless fresh cakes for every celebration. Custom birthday cakes, chocolate cakes, black forest, red velvet and more.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Abhilasha Residency Rd, Siddhi Vinayak Nagar, Mahajan Wadi, Mira Road East",
    "addressLocality": "Mira Road",
    "addressRegion": "Maharashtra",
    "postalCode": "401107",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 19.2812,
    "longitude": 72.8685
  },
  "areaServed": [
    { "@type": "City", "name": "Mira Road" },
    { "@type": "City", "name": "Mira Bhayandar" },
    { "@type": "City", "name": "Bhayandar" },
    { "@type": "City", "name": "Dahisar" },
    { "@type": "City", "name": "Borivali" }
  ],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "09:00",
    "closes": "22:30"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "250",
    "bestRating": "5"
  },
  "sameAs": []
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is Delights Cakes the best cake shop in Mira Road?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Delights Cakes is rated as the best eggless cake shop in Mira Road East with 4.8 star rating. We offer 100% Pure Veg & Eggless fresh cakes with 20+ flavors including chocolate, black forest, red velvet, butterscotch, and custom birthday cakes."
      }
    },
    {
      "@type": "Question",
      "name": "How much notice do you need for custom cakes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We require a minimum of 48 hours notice for all custom cake orders. For elaborate tiered cakes or wedding cakes, we recommend reaching out at least 2 weeks in advance."
      }
    },
    {
      "@type": "Question",
      "name": "Do you deliver cakes in Mira Road?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! We deliver within a 10km radius of our Mira Road East bakery covering Mira Road, Bhayandar, Dahisar and nearby areas. You can also opt for free in-store pickup."
      }
    },
    {
      "@type": "Question",
      "name": "Are all your cakes eggless and vegetarian?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! All our cakes are 100% Pure Veg and Eggless. We also offer vegan and gluten-free options."
      }
    },
    {
      "@type": "Question",
      "name": "What are the prices for cakes at Delights?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Our cakes start from \u20B9250 for 0.5kg. Prices vary based on flavor and design. Check our full menu on the website or contact us on WhatsApp at ${SITE_CONFIG.contact.displayPhone}.`
      }
    }
  ]
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Delights Cakes",
  "@id": `${SITE_URL}/#localbusiness`,
  "url": SITE_URL,
  "telephone": SITE_CONFIG.contact.displayPhone,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Abhilasha Residency Rd, Siddhi Vinayak Nagar, Mahajan Wadi, Mira Road East",
    "addressLocality": "Mira Road",
    "addressRegion": "Maharashtra",
    "postalCode": "401107",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 19.2812,
    "longitude": 72.8685
  },
  "hasMap": "https://maps.google.com/?q=Delights+Cakes+Mira+Road+East"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Mira Road, Maharashtra" />
        <meta name="geo.position" content="19.2812;72.8685" />
        <meta name="ICBM" content="19.2812, 72.8685" />
        <link rel="canonical" href={SITE_URL} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(bakeryJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
