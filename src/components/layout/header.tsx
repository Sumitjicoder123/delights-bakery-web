"use client";

import { useState } from 'react';
import Link from 'next/link';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#FFF9F3] border-b border-amber-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link className="flex items-center space-x-2" href="/">
            <svg className="w-6 h-6 text-[#4A2E18]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v3" /><path d="M7 6h10a2 2 0 0 1 2 2v2H3V8a2 2 0 0 1 2-2z" /><path d="M3 10h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10z" /><line x1="3" y1="14" x2="21" y2="14" /></svg>
            <div>
              <span className="text-xl font-bold tracking-tight text-[#4A2E18] block leading-none">Delights</span>
              <span className="text-[10px] uppercase tracking-wider text-amber-800 font-medium">Best Cakes in Mira Road</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link className="text-sm font-medium text-stone-700 hover:text-amber-800 transition" href="#daily-menu">
              Daily Menu
            </Link>
            <Link className="text-sm font-medium text-stone-700 hover:text-amber-800 transition" href="#custom-builder">
              Custom Cakes
            </Link>
            <Link className="text-sm font-medium text-stone-700 hover:text-amber-800 transition" href="#reviews">
              Reviews
            </Link>
            <Link className="text-sm font-medium text-stone-700 hover:text-amber-800 transition" href="#contact">
              Contact
            </Link>
            <Link className="bg-[#4A2E18] text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-stone-800 transition shadow" href="#custom-builder">
              Order Cake
            </Link>
          </nav>

          {/* Mobile Right Controls: Order Cake Pill + Hamburger Toggle */}
          <div className="flex items-center space-x-2 md:hidden">
            <Link className="bg-[#4A2E18] text-white text-xs font-semibold px-3 py-1.5 rounded-full" href="#daily-menu">
              Order Cake
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-[#4A2E18] hover:bg-amber-100 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                // Close X Icon
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger Icon
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Only renders when isOpen is true, perfectly opaque background) */}
      {isOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-[#FFF9F3] flex flex-col items-center justify-start pt-8 px-6 space-y-6 md:hidden">
          <Link href="#daily-menu" onClick={() => setIsOpen(false)}
            className="text-lg font-semibold text-[#4A2E18] py-2 border-b border-amber-200/60 w-full text-center"
          >
            Daily Fresh Cakes
          </Link>
          <Link href="#custom-builder" onClick={() => setIsOpen(false)}
            className="text-lg font-semibold text-[#4A2E18] py-2 border-b border-amber-200/60 w-full text-center"
          >
            Custom Celebration Cakes
          </Link>
          <Link href="#reviews" onClick={() => setIsOpen(false)}
            className="text-lg font-semibold text-[#4A2E18] py-2 border-b border-amber-200/60 w-full text-center"
          >
            Google Reviews
          </Link>
          <Link href="#contact" onClick={() => setIsOpen(false)}
            className="text-lg font-semibold text-[#4A2E18] py-2 border-b border-amber-200/60 w-full text-center"
          >
            Contact & Location
          </Link>
          <Link href="#custom-builder" onClick={() => setIsOpen(false)}
            className="w-full max-w-xs py-3 bg-[#4A2E18] text-white font-medium rounded-full text-center shadow-lg mt-4"
          >
            Design Custom Cake
          </Link>
        </div>
      )}
    </>
  );
}

