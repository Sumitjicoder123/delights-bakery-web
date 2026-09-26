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
          <Link href="#daily-menu" className="text-sm font-medium hover:text-primary/80 transition-colors">Daily Menu</Link>
          <Link href="#custom-builder" className="text-sm font-medium hover:text-primary/80 transition-colors">Custom Cakes</Link>
          <Link href="#reviews" className="text-sm font-medium hover:text-primary/80 transition-colors">Reviews</Link>
          <Link href="#contact" className="text-sm font-medium hover:text-primary/80 transition-colors">Contact</Link>
        </nav>
        
        <div className="flex items-center gap-2 md:gap-4 z-50">
          <Button asChild className="rounded-full h-8 px-4 text-xs sm:text-sm sm:h-10 sm:px-6">
            <Link href="#custom-builder">Order Cake</Link>
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
      {isMobileMenuOpen && (
        <div className="fixed inset-x-0 top-[65px] bottom-0 bg-[#FFF9F3] z-50 flex flex-col items-center justify-start pt-8 pb-10 px-6 space-y-6 shadow-2xl overflow-y-auto md:hidden">
          <nav className="flex flex-col items-center w-full">
            <Link href="#daily-menu" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold text-[#4A2E18] hover:text-amber-700 py-4 border-b border-amber-100/60 w-full text-center">Daily Menu</Link>
            <Link href="#custom-builder" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold text-[#4A2E18] hover:text-amber-700 py-4 border-b border-amber-100/60 w-full text-center">Custom Cakes</Link>
            <Link href="#reviews" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold text-[#4A2E18] hover:text-amber-700 py-4 border-b border-amber-100/60 w-full text-center">Reviews</Link>
            <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold text-[#4A2E18] hover:text-amber-700 py-4 border-b border-amber-100/60 w-full text-center">Contact</Link>
            
            <Link href="#custom-builder" onClick={() => setIsMobileMenuOpen(false)} className="w-full max-w-xs py-3 bg-[#4A2E18] text-white font-medium rounded-full text-center shadow-md mt-6">
              Order Custom Cake
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
