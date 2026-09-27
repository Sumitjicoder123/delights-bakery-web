/* eslint-disable */
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Star, Sparkles, Heart } from "lucide-react";

export function Hero() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF9F3] via-amber-50/40 to-background py-8 sm:py-16 md:py-20">
        
        {/* Animated Background Cake Confectionery Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ 
              y: [0, -25, 0],
              rotate: [0, 15, -15, 0],
              opacity: [0.35, 0.6, 0.35]
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-12 left-[8%] text-3xl select-none"
          >
            🍰
          </motion.div>

          <motion.div 
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -20, 10, 0],
              opacity: [0.25, 0.5, 0.25]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/3 left-[4%] text-2xl select-none hidden sm:block"
          >
            🧁
          </motion.div>

          <motion.div 
            animate={{ 
              y: [0, -18, 0],
              scale: [0.9, 1.15, 0.9],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-20 left-[12%] text-2xl select-none"
          >
            🍓
          </motion.div>

          <motion.div 
            animate={{ 
              y: [0, 22, 0],
              rotate: [0, 25, 0],
              opacity: [0.3, 0.55, 0.3]
            }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-16 right-[10%] text-3xl select-none"
          >
            ✨
          </motion.div>

          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, -15, 15, 0],
              opacity: [0.25, 0.5, 0.25]
            }}
            transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute bottom-24 right-[8%] text-2xl select-none"
          >
            🍫
          </motion.div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12 relative z-10">
          
          {/* Text Content with entrance animations */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex-1 space-y-4 sm:space-y-6 text-center lg:text-left mt-2 lg:mt-0"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm"
            >
              <span>🌿</span>
              <span>100% Pure Veg & Eggless Bakery</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse ml-0.5" />
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary leading-tight"
            >
              Freshly Baked Eggless Cakes <br className="hidden lg:block"/> for Every Celebration in Mira Road
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-sm sm:text-lg text-muted-foreground max-w-[600px] mx-auto lg:mx-0 leading-relaxed"
            >
              From same-day favorites to handcrafted custom designer cakes. Pure veg, freshly baked daily on Abhilasha Residency Road.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="hidden sm:flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2 w-full"
            >
              <Button asChild size="lg" className="rounded-full text-base h-12 px-7 bg-[#4A2E18] text-white hover:bg-[#3B2413] shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95">
                <Link href="#custom-builder">
                  ✨ Design Custom Cake
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full text-base h-12 px-7 border-green-600 text-green-700 hover:bg-green-50 hover:text-green-800 shadow-sm hover:shadow-md transition-all hover:scale-105 active:scale-95">
                <Link href="#daily-menu">
                  🍰 Order Today's Fresh Cakes
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Animated Hero Cake Display */}
          <div className="relative flex-shrink-0 flex items-center justify-center p-4">
            
            {/* Pulsing Golden Aura / Glow */}
            <motion.div 
              animate={{ 
                scale: [1, 1.08, 1],
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[280px] sm:w-[380px] lg:w-[480px] h-[280px] sm:h-[380px] lg:h-[480px] bg-gradient-to-tr from-amber-300/30 via-orange-200/40 to-yellow-100/50 rounded-full blur-2xl -z-10"
            />

            {/* Rotating Decorative Pastry Ring */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="absolute w-[240px] sm:w-[330px] lg:w-[470px] h-[240px] sm:h-[330px] lg:h-[470px] rounded-full border-2 border-dashed border-amber-300/50 pointer-events-none"
            />

            {/* Floating Cake Container */}
            <motion.div 
              animate={{ 
                y: [-8, 8, -8],
                rotate: [-0.5, 0.5, -0.5]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.04, rotate: 0, transition: { duration: 0.3 } }}
              className="relative aspect-square w-48 sm:w-64 md:w-80 lg:w-[440px] rounded-full overflow-hidden border-4 border-white shadow-2xl z-10 cursor-pointer bg-amber-50"
            >
              <Image 
                src="/hero-cake.jpg" 
                alt="Beautiful custom chocolate layer cake" 
                fill
                className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
                priority
              />
              
              {/* Subtle glossy cake shine reflection overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/25 pointer-events-none" />
            </motion.div>

            {/* Floating Badge 1: 100% Eggless */}
            <motion.div 
              animate={{ 
                y: [-6, 6, -6],
                x: [-2, 2, -2]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-1 -left-2 sm:-left-4 bg-white/95 backdrop-blur-md px-3 sm:px-4 py-2 rounded-2xl shadow-xl border border-amber-100/80 flex items-center gap-2 z-20 select-none"
            >
              <span className="text-xl sm:text-2xl animate-bounce">🎂</span>
              <div className="text-left">
                <p className="text-[10px] text-stone-500 font-medium leading-none">Fresh Daily</p>
                <p className="text-xs sm:text-sm font-bold text-[#4A2E18] leading-tight">100% Eggless</p>
              </div>
            </motion.div>

            {/* Floating Badge 2: Google Verified Rating */}
            <motion.div 
              animate={{ 
                y: [6, -6, 6],
                x: [2, -2, 2]
              }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              className="absolute -bottom-2 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl shadow-xl border border-amber-100/80 flex items-center gap-2.5 z-20 select-none"
            >
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shadow-inner">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  <p className="text-xs sm:text-sm font-bold text-stone-900 leading-none">4.9 / 5.0</p>
                </div>
                <p className="text-[10px] text-stone-500 font-medium leading-tight">100+ Happy Reviews</p>
              </div>
            </motion.div>

            {/* Floating Strawberry Accent */}
            <motion.div
              animate={{
                y: [-10, 10, -10],
                rotate: [0, 15, -15, 0]
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="absolute top-2 -right-3 text-2xl sm:text-3xl select-none z-20 filter drop-shadow-md"
            >
              🍓
            </motion.div>

          </div>
          
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
