"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CakeSlice, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2 z-50">
          <CakeSlice className="h-6 w-6 text-primary" />
          <Link href="/" className="flex flex-col" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="font-serif text-xl font-bold leading-tight text-primary">Delights</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Best Cakes in Mira Road</span>
          </Link>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="#menu" className="text-sm font-medium hover:text-primary/80 transition-colors">Menu</Link>
          <Link href="#custom-cakes" className="text-sm font-medium hover:text-primary/80 transition-colors">Custom Cakes</Link>
          <Link href="#reviews" className="text-sm font-medium hover:text-primary/80 transition-colors">Reviews</Link>
          <Link href="#contact" className="text-sm font-medium hover:text-primary/80 transition-colors">Contact</Link>
        </nav>
        
        <div className="flex items-center gap-2 md:gap-4 z-50">
          <Button asChild className="hidden sm:inline-flex rounded-full h-10 px-6">
            <Link href="#custom-cakes">Order Cake</Link>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden h-10 w-10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <div className={cn(
        "fixed inset-0 top-16 z-40 bg-background flex flex-col items-center justify-center gap-8 md:hidden transition-transform duration-300 ease-in-out",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <nav className="flex flex-col items-center gap-6 w-full px-6">
          <Link href="#menu" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif font-medium hover:text-primary/80 transition-colors">Menu</Link>
          <Link href="#custom-cakes" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif font-medium hover:text-primary/80 transition-colors">Custom Cakes</Link>
          <Link href="#reviews" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif font-medium hover:text-primary/80 transition-colors">Reviews</Link>
          <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif font-medium hover:text-primary/80 transition-colors">Contact</Link>
          
          <Button asChild className="w-full mt-4 h-14 rounded-full text-lg sm:hidden">
            <Link href="#custom-cakes" onClick={() => setIsMobileMenuOpen(false)}>Order Custom Cake</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
