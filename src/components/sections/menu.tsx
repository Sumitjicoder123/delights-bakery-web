"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { everydayCakes, Cake } from "@/data/cakes";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
export function MenuSection() {
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedCake, setSelectedCake] = useState<Cake | null>(null);
  const [cakes, setCakes] = useState<Cake[]>(everydayCakes);
  
  useEffect(() => {
    async function fetchCakes() {
      try {
        const res = await fetch('/api/cakes');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setCakes(data);
          }
        }
      } catch (err) {
        console.error("Error fetching cakes from API", err);
      }
    }
    fetchCakes();
  }, []);

  const [orderData, setOrderData] = useState({
    weight: "0.5 kg",
    message: "",
    deliveryMode: "In-Store Pickup",
    address: "",
    customerName: "",
    customerPhone: ""
  });

  const openOrderModal = (cake: Cake) => {
    setSelectedCake(cake);
    setOrderData({
      weight: cake.weightOptions[0],
      message: "",
      deliveryMode: "In-Store Pickup",
      address: "",
      customerName: "",
      customerPhone: ""
    });
    setOrderModalOpen(true);
  };

  const submitQuickOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCake) return;

    const shopPhone = "919819134616";
    const nl = "\n";
    const priceMultiplier = orderData.weight === "1 kg" ? 2 : 1;
    const finalPrice = selectedCake.basePrice * priceMultiplier;

    const deliveryString = orderData.deliveryMode === 'Home Delivery' 
      ? 'Home Delivery (Charges Extra as per Location)' 
      : 'In-Store Pickup';
      
    const addressString = orderData.deliveryMode === 'Home Delivery' && orderData.address 
      ? orderData.address 
      : 'In-Store Pickup';

    const messageStr = `⚡ *TODAY'S CAKE ORDER - DELIGHTS*${nl}` +
      `• *Cake:* ${selectedCake.name}${nl}` +
      `• *Weight:* ${orderData.weight} (100% Eggless)${nl}` +
      `• *Cake Price:* ₹${finalPrice}${nl}` +
      `• *Message on Cake:* "${orderData.message || 'None'}"${nl}` +
      `• *Fulfillment:* ${deliveryString}${nl}` +
      `• *Address:* ${addressString}${nl}` +
      `• *Customer:* ${orderData.customerName} (${orderData.customerPhone})${nl}` +
      `*(Please confirm counter availability & final total with delivery charges!)*`;

    window.open(`https://wa.me/${shopPhone}?text=${encodeURIComponent(messageStr)}`, "_blank");
    setOrderModalOpen(false);
  };

  return (
    <section id="daily-menu" className="py-20 bg-background scroll-mt-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Today's Fresh Cakes</h2>
          <p className="text-muted-foreground max-w-[600px] mx-auto">
            Ready for instant pickup or same-day delivery. 100% Eggless and baked fresh this morning.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
          {cakes.map((cake) => (
            <Card 
              key={cake.id} 
              onClick={() => {
                if (cake.in_stock !== false) {
                  openOrderModal(cake);
                }
              }}
              className={cn(
                "overflow-hidden border-border/50 transition-all flex flex-col group", 
                cake.in_stock === false 
                  ? "opacity-75 cursor-not-allowed" 
                  : "hover:border-primary/50 hover:shadow-md cursor-pointer"
              )}
            >
              <div className="relative w-full aspect-square overflow-hidden rounded-t-xl bg-amber-50/50">
                <Image 
                  src={cake.image} 
                  alt={cake.name} 
                  fill
                  unoptimized={Boolean(cake.image && cake.image.startsWith('http'))}
                  className={cn("w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105", cake.in_stock === false ? "grayscale" : "")}
                />
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 bg-white/95 backdrop-blur-sm text-green-700 text-[10px] sm:text-xs font-bold px-2 py-1 sm:px-3 rounded-full shadow-sm">
                  {cake.dietary[0]}
                </div>
                {cake.in_stock === false && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                    <span className="bg-red-600 text-white font-bold px-4 py-2 rounded-full text-sm sm:text-base shadow-lg transform -rotate-12">
                      Sold Out Today
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col flex-1 p-2 sm:p-5">
                <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-1 sm:gap-2 mb-1 sm:mb-2">
                  <h3 className="text-sm sm:text-lg font-semibold font-serif truncate group-hover:text-primary transition-colors" title={cake.name}>{cake.name}</h3>
                  <span className="text-sm sm:text-lg font-bold text-amber-900">₹{cake.basePrice}</span>
                </div>
                <p className="hidden sm:block text-xs sm:text-sm text-muted-foreground line-clamp-2 flex-1 mb-4">{cake.description}</p>
                <div className="mt-auto pt-2 sm:pt-0">
                  {cake.in_stock === false ? (
                    <Button disabled className="w-full h-8 sm:h-12 text-xs sm:text-base rounded-md sm:rounded-lg bg-stone-300 text-stone-500 font-medium">
                      Currently Unavailable
                    </Button>
                  ) : (
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        openOrderModal(cake);
                      }}
                      className="w-full h-8 sm:h-12 text-xs sm:text-base rounded-md sm:rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium"
                    >
                      Order Now
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Order Modal */}
      {orderModalOpen && selectedCake && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-background w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 fade-in duration-200">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-serif text-xl font-bold">Order Now</h3>
              <Button variant="ghost" size="icon" onClick={() => setOrderModalOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <form onSubmit={submitQuickOrder} className="p-6 space-y-5">
              <div className="flex items-center gap-4 mb-2">
                <div className="relative w-16 h-16 rounded-md overflow-hidden shrink-0">
                  <Image 
                    src={selectedCake.image} 
                    alt={selectedCake.name} 
                    fill 
                    unoptimized={Boolean(selectedCake.image && selectedCake.image.startsWith('http'))}
                    className="object-cover" 
                  />
                </div>
                <div>
                  <p className="font-bold">{selectedCake.name}</p>
                  <p className="text-sm text-primary font-medium">Base Price: ₹{selectedCake.basePrice}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Weight</label>
                <div className="flex gap-2">
                  {selectedCake.weightOptions.map(w => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setOrderData({ ...orderData, weight: w })}
                      className={cn(
                        "flex-1 py-2 rounded-md border text-sm font-medium transition-colors",
                        orderData.weight === w ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground"
                      )}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Name / Message on Cake</label>
                <Input 
                  placeholder="e.g., Happy Birthday Mom" 
                  value={orderData.message}
                  onChange={e => setOrderData({...orderData, message: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Delivery Preference</label>
                <div className="flex flex-col gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => setOrderData({ ...orderData, deliveryMode: 'Store Pickup' })}
                    className={cn(
                      "text-left p-3 rounded-md border text-sm font-medium transition-colors flex flex-col gap-1",
                      orderData.deliveryMode === 'Store Pickup' ? "bg-secondary/20 border-secondary ring-1 ring-secondary" : "bg-card"
                    )}
                  >
                    <span className="font-semibold text-primary">🏪 In-Store Pickup</span>
                    <span className="text-xs font-normal text-muted-foreground">Abhilasha Residency Rd</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderData({ ...orderData, deliveryMode: 'Home Delivery' })}
                    className={cn(
                      "text-left p-3 rounded-md border text-sm font-medium transition-colors flex flex-col gap-1",
                      orderData.deliveryMode === 'Home Delivery' ? "bg-secondary/20 border-secondary ring-1 ring-secondary" : "bg-card"
                    )}
                  >
                    <span className="font-semibold text-primary">🛵 Home Delivery</span>
                    <span className="text-xs font-normal text-muted-foreground">Delivery charges extra as per distance</span>
                  </button>
                </div>
                {orderData.deliveryMode === "Home Delivery" && (
                  <div className="animate-in slide-in-from-top-2">
                    <Textarea 
                      placeholder="Enter full delivery address in Mira Road..."
                      value={orderData.address}
                      onChange={e => setOrderData({...orderData, address: e.target.value})}
                      required
                      className="mb-2"
                    />
                    <div className="text-xs text-amber-800 bg-amber-50 p-3 rounded-md border border-amber-100 flex gap-2 items-start mt-2">
                      <span className="text-base">ℹ️</span> 
                      <span>Cake total: <strong>₹{selectedCake.basePrice * (orderData.weight === "1 kg" ? 2 : 1)}</strong>. Home delivery charges will be calculated as per your Mira Road address and added to the final total via WhatsApp.</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Name</label>
                  <Input 
                    required 
                    value={orderData.customerName}
                    onChange={e => setOrderData({...orderData, customerName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <Input 
                    required 
                    type="tel"
                    value={orderData.customerPhone}
                    onChange={e => setOrderData({...orderData, customerPhone: e.target.value})}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full h-12 text-base mt-2 bg-[#25D366] hover:bg-[#128C7E] text-white">
                Send Order to WhatsApp
              </Button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
