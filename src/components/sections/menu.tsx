"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Category = "Signature Cakes" | "Pastries & Cupcakes" | "Dietary";

const menuItems = [
  {
    id: 1,
    name: "Belgian Dark Chocolate Truffle",
    category: "Signature Cakes",
    description: "Rich, dense chocolate sponge layered with smooth Belgian chocolate ganache.",
    price: 1200,
    weight: "1 kg",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Classic Red Velvet",
    category: "Signature Cakes",
    description: "Moist crimson sponge with our signature cream cheese frosting.",
    price: 1350,
    weight: "1 kg",
    image: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=500&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Fresh Mango Cream (Seasonal)",
    category: "Signature Cakes",
    description: "Vanilla sponge layered with fresh Alphonso mangoes and light whipped cream.",
    price: 1500,
    weight: "1 kg",
    image: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Biscoff Crunch Cupcakes",
    category: "Pastries & Cupcakes",
    description: "Caramel cupcakes with a Lotus Biscoff center and cookie butter buttercream.",
    price: 650,
    weight: "Box of 6",
    image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=500&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Lemon Blueberry Tart",
    category: "Pastries & Cupcakes",
    description: "Buttery tart shell filled with tangy lemon curd and fresh blueberries.",
    price: 450,
    weight: "2 portions",
    image: "https://images.unsplash.com/photo-1519869325930-281384150729?w=500&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Vegan Chocolate Raspberry",
    category: "Dietary",
    description: "100% plant-based chocolate cake with tart raspberry compote.",
    price: 1600,
    weight: "1 kg",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500&auto=format&fit=crop"
  }
];

const categories: Category[] = ["Signature Cakes", "Pastries & Cupcakes", "Dietary"];

export function MenuSection() {
  const [activeTab, setActiveTab] = useState<Category>("Signature Cakes");

  const filteredItems = menuItems.filter(item => item.category === activeTab);

  return (
    <section id="menu" className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">Our Bakery Menu</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Explore our daily specials and signature creations. All items are baked fresh daily using premium ingredients.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-colors border",
                activeTab === category 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "bg-transparent text-foreground border-border hover:border-primary/50"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden border-border/50 hover:border-primary/30 transition-colors flex flex-col">
              <div className="relative h-56 sm:h-64 w-full">
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader className="flex-1">
                <div className="flex justify-between items-start gap-4">
                  <CardTitle className="text-xl font-serif">{item.name}</CardTitle>
                  <span className="font-bold text-primary">₹{item.price}</span>
                </div>
                <CardDescription className="text-xs font-medium text-secondary">{item.weight}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
              <CardFooter className="pt-4 pb-6 px-6">
                <Button className="w-full h-12 text-base rounded-lg" asChild variant="outline">
                  <a href={`https://wa.me/919819134616?text=${encodeURIComponent(`Hi, I'm interested in the ${item.name} from your daily menu.`)}`} target="_blank" rel="noreferrer">
                    Inquire via WhatsApp
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
