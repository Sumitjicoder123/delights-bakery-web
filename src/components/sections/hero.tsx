import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <>
      <section className="relative overflow-hidden bg-muted">
        <div className="container mx-auto px-4 sm:px-6 py-6 md:py-16 lg:py-24 flex flex-col-reverse lg:flex-row items-center gap-6 lg:gap-12">
          <div className="flex-1 space-y-4 sm:space-y-6 z-10 w-full text-center lg:text-left mt-4 lg:mt-0">
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary leading-tight">
              Bespoke Celebration Cakes <br className="hidden lg:block"/> Made for Your Special Moments
            </h1>
            <p className="text-sm sm:text-lg text-muted-foreground max-w-[600px] mx-auto lg:mx-0">
              Delivering within a 10km radius. We require a minimum 48-hour notice for all custom orders to ensure perfection down to the last crumb.
            </p>
            <div className="hidden sm:flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4 w-full">
              <Button asChild size="lg" className="rounded-full text-base h-12 w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="#custom-builder">Design Custom Cake</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full text-base h-12 w-full sm:w-auto border-green-600 text-green-700 hover:bg-green-50 hover:text-green-800">
                <Link href="#daily-menu">Order Today's Fresh Cakes</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative aspect-square flex-shrink-0 w-48 sm:w-64 md:w-80 lg:w-[460px] mx-auto rounded-full overflow-hidden border-4 border-white/80 shadow-2xl z-10">
            <Image 
              src="/hero-cake.jpg" 
              alt="Beautiful custom chocolate layer cake" 
              fill
              className="w-full h-full object-cover object-center"
              priority
            />
          </div>
          
          {/* Decorative background blob */}
          <div className="absolute top-1/2 lg:right-0 left-1/2 lg:left-auto -translate-x-1/2 lg:translate-x-1/3 -translate-y-1/2 w-[600px] lg:w-[800px] h-[600px] lg:h-[800px] bg-secondary/20 rounded-full blur-3xl -z-0"></div>
        </div>
      </section>

      {/* Sticky Switcher for Mobile */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b shadow-sm sm:hidden flex w-full">
        <Link href="#daily-menu" className="flex-1 text-center py-3 text-xs font-semibold text-green-700 border-r border-border hover:bg-green-50/50">
          🍰 Daily Fresh Cakes
        </Link>
        <Link href="#custom-builder" className="flex-1 text-center py-3 text-xs font-semibold text-primary hover:bg-primary/5">
          ✨ Design Custom Cake
        </Link>
      </div>
    </>
  );
}
