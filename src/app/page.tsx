"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { MenuSection } from "@/components/sections/menu";
import dynamic from "next/dynamic";

const CustomCakeBuilder = dynamic(
  () => import("@/components/sections/cake-builder").then(mod => ({ default: mod.CustomCakeBuilder })),
  { ssr: false, loading: () => <div className="py-16 text-center text-stone-400">Loading cake builder...</div> }
);

const ReviewsSection = dynamic(
  () => import("@/components/sections/reviews").then(mod => ({ default: mod.ReviewsSection })),
  { ssr: false, loading: () => <div className="py-16 text-center text-stone-400">Loading reviews...</div> }
);

const FaqSection = dynamic(
  () => import("@/components/sections/faq").then(mod => ({ default: mod.FaqSection })),
  { ssr: false, loading: () => <div className="py-16 text-center text-stone-400">Loading FAQ...</div> }
);

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <Hero />
        <MenuSection />
        <CustomCakeBuilder />
        <ReviewsSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
