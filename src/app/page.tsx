import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { MenuSection } from "@/components/sections/menu";
import { CustomCakeBuilder } from "@/components/sections/cake-builder";
import { FaqSection } from "@/components/sections/faq";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <Hero />
        <MenuSection />
        <CustomCakeBuilder />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
