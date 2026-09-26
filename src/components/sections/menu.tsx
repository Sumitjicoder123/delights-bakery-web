"use client";

import { useState } from "react";
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

    const messageStr = `⚡ *TODAY'S CAKE ORDER (SAME-DAY) - DELIGHTS*${nl}` +
      `• *Item:* ${selectedCake.name} (${orderData.weight} - Eggless)${nl}` +
      `• *Price:* ₹${finalPrice}${nl}` +
      `• *Message on Cake:* "${orderData.message || 'None'}"${nl}` +
      `• *Delivery Mode:* ${orderData.deliveryMode}${orderData.deliveryMode === 'Home Delivery' && orderData.address ? ` to ${orderData.address}` : ''}${nl}` +
      `• *Customer:* ${orderData.customerName} (${orderData.customerPhone})${nl}` +
      `• *Need By:* Today ASAP${nl}` +
      `*(Please confirm availability in your display counter!)*`;

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {everydayCakes.map((cake) => (
            <Card key={cake.id} className="overflow-hidden border-border/50 hover:border-primary/30 transition-colors flex flex-col">
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-xl bg-amber-50/50">
                <Image 
                  src={cake.image} 
                  alt={cake.name} 
                  fill
                  className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm text-green-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  {cake.dietary[0]}
                </div>
              </div>
              <CardHeader className="flex-1 pb-2">
                <div className="flex justify-between items-start gap-4">
                  <CardTitle className="text-xl font-serif">{cake.name}</CardTitle>
                  <span className="font-bold text-primary">₹{cake.basePrice}</span>
                </div>
                <CardDescription className="text-sm text-muted-foreground mt-2 line-clamp-2">{cake.description}</CardDescription>
              </CardHeader>
              <CardFooter className="pt-4 pb-6 px-6 flex flex-col gap-4">
                <Button 
                  onClick={() => openOrderModal(cake)}
                  className="w-full h-12 text-base rounded-lg bg-green-600 hover:bg-green-700 text-white"
                >
                  Quick Order on WhatsApp
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Order Modal */}
      {orderModalOpen && selectedCake && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-background w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 fade-in duration-200">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-serif text-xl font-bold">Quick Order</h3>
              <Button variant="ghost" size="icon" onClick={() => setOrderModalOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <form onSubmit={submitQuickOrder} className="p-6 space-y-5">
              <div className="flex items-center gap-4 mb-2">
                <div className="relative w-16 h-16 rounded-md overflow-hidden">
                  <Image src={selectedCake.image} alt={selectedCake.name} fill className="object-cover" />
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
                <div className="flex gap-2 mb-3">
                  {["In-Store Pickup", "Home Delivery"].map(mode => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setOrderData({ ...orderData, deliveryMode: mode })}
                      className={cn(
                        "flex-1 py-2 rounded-md border text-sm font-medium transition-colors",
                        orderData.deliveryMode === mode ? "bg-secondary text-secondary-foreground border-secondary" : "bg-card"
                      )}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
                {orderData.deliveryMode === "Home Delivery" && (
                  <Textarea 
                    placeholder="Enter full delivery address..."
                    value={orderData.address}
                    onChange={e => setOrderData({...orderData, address: e.target.value})}
                    required
                  />
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
