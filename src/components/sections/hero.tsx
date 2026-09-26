import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-muted">
      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-24 lg:py-32 flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12">
        <div className="flex-1 space-y-6 z-10 w-full text-center lg:text-left mt-8 lg:mt-0">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary">
            Bespoke Celebration Cakes <br className="hidden lg:block"/> Made for Your Special Moments
          </h1>
          <p className="text-lg text-muted-foreground max-w-[600px] mx-auto lg:mx-0">
            Delivering within a 10km radius. We require a minimum 48-hour notice for all custom orders to ensure perfection down to the last crumb.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4 w-full">
            <Button asChild size="lg" className="rounded-full text-base h-12 w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="#custom-builder">Design Custom Cake</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full text-base h-12 w-full sm:w-auto border-green-600 text-green-700 hover:bg-green-50 hover:text-green-800">
              <Link href="#daily-menu">Order Today's Fresh Cakes</Link>
            </Button>
          </div>
        </div>
        
        <div className="flex-1 relative w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full overflow-hidden border-4 border-white/80 shadow-2xl z-10 mx-auto">
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
  );
}
