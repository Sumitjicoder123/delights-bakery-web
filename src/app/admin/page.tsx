"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

import { Trash2, Edit2, LogOut, ArrowLeft, Plus } from "lucide-react";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [cakes, setCakes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCake, setNewCake] = useState({
    name: "",
    description: "100% Pure Veg & Eggless fresh cake prepared daily.",
    price: "",
    image_url: "/cakes/WhiteForest%20400.jpeg" // default placeholder
  });

  useEffect(() => {
    const auth = sessionStorage.getItem("delights_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
      fetchCakes();
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPin = process.env.NEXT_PUBLIC_ADMIN_PIN || '1234';
    if (pin === correctPin) {
      sessionStorage.setItem("delights_admin_auth", "true");
      setIsAuthenticated(true);
      fetchCakes();
    } else {
      alert("Incorrect PIN");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("delights_admin_auth");
    setIsAuthenticated(false);
    setPin("");
  };

  const fetchCakes = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('cakes')
      .select('*')
      .order('created_at', { ascending: true });
      
    if (!error && data) {
      setCakes(data);
    }
    setIsLoading(false);
  };

  const toggleStock = async (cake: any) => {
    const newStockStatus = cake.in_stock === false ? true : false;
    // Optimistic update
    setCakes(cakes.map(c => c.id === cake.id ? { ...c, in_stock: newStockStatus } : c));
    
    await supabase
      .from('cakes')
      .update({ in_stock: newStockStatus })
      .eq('id', cake.id);
  };

  const updatePrice = async (id: string, newPrice: number) => {
    await supabase
      .from('cakes')
      .update({ price: newPrice, basePrice: newPrice }) // handle both schema variants
      .eq('id', id);
    fetchCakes();
  };

  const deleteCake = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this cake?")) {
      await supabase.from('cakes').delete().eq('id', id);
      fetchCakes();
    }
  };

  const handleAddCake = async (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseInt(newCake.price);
    
    const { error } = await supabase
      .from('cakes')
      .insert([
        { 
          name: newCake.name, 
          description: newCake.description,
          price: priceNum,
          basePrice: priceNum, // for backward compat
          image_url: newCake.image_url,
          image: newCake.image_url, // for backward compat
          in_stock: true 
        }
      ]);
      
    if (!error) {
      setIsAddModalOpen(false);
      setNewCake({
        name: "",
        description: "100% Pure Veg & Eggless fresh cake prepared daily.",
        price: "",
        image_url: "/cakes/WhiteForest%20400.jpeg"
      });
      fetchCakes();
    } else {
      alert("Error adding cake: " + error.message);
    }
  };

  if (isLoading) return <div className="min-h-screen bg-[#FFF9F3] flex items-center justify-center">Loading...</div>;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FFF9F3] flex items-center justify-center p-4">
        <Card className="w-full max-w-sm p-8 shadow-xl border-[#4A2E18]/10 bg-white">
          <div className="text-center mb-6">
            <span className="text-4xl mb-2 block">🎂</span>
            <h1 className="text-2xl font-serif font-bold text-[#4A2E18]">Delights Admin</h1>
            <p className="text-sm text-stone-500">Enter PIN to access dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input 
              type="password" 
              inputMode="numeric"
              placeholder="Enter PIN" 
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="text-center text-xl tracking-widest h-12 border-[#4A2E18]/20 focus-visible:ring-[#4A2E18]"
              autoFocus
            />
            <Button type="submit" className="w-full h-12 bg-[#4A2E18] hover:bg-[#4A2E18]/90 text-white font-semibold">
              Login
            </Button>
            <Link href="/" className="block text-center text-sm text-[#4A2E18] hover:underline mt-4">
              ← Back to Website
            </Link>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9F3] pb-24">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#4A2E18]/10 shadow-sm px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-[#4A2E18] p-1 bg-amber-50 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-serif font-bold text-[#4A2E18] text-lg">Delights Admin</h1>
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-stone-500 hover:text-red-600">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto p-4 sm:p-6 mt-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-stone-800">Cake Menu ({cakes.length})</h2>
          <Button onClick={() => setIsAddModalOpen(true)} className="bg-[#4A2E18] hover:bg-[#4A2E18]/90 text-white">
            <Plus className="w-4 h-4 mr-1" /> Add Cake
          </Button>
        </div>

        <div className="grid gap-4">
          {cakes.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-stone-300 text-stone-500">
              No cakes found in database. Add one above!
            </div>
          ) : (
            cakes.map(cake => (
              <Card key={cake.id} className="p-3 sm:p-4 flex gap-4 items-center bg-white shadow-sm overflow-hidden">
                <div className="relative w-20 h-20 rounded-md overflow-hidden bg-stone-100 shrink-0">
                  <Image 
                    src={cake.image_url || cake.image || '/cakes/WhiteForest%20400.jpeg'} 
                    alt={cake.name} 
                    fill 
                    className="object-cover"
                  />
                  {cake.in_stock === false && (
                    <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-red-600 bg-white px-1 py-0.5 rounded shadow-sm">SOLD OUT</span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-stone-800 truncate">{cake.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-semibold text-stone-600">₹</span>
                    <Input 
                      type="number"
                      defaultValue={cake.price || cake.basePrice}
                      onBlur={(e) => {
                        const val = parseInt(e.target.value);
                        if (val && val !== (cake.price || cake.basePrice)) {
                          updatePrice(cake.id, val);
                        }
                      }}
                      className="h-7 w-20 px-2 text-sm border-stone-200"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-stone-500">
                      {cake.in_stock === false ? '🔴 Out' : '🟢 In Stock'}
                    </span>
                    <input 
                      type="checkbox" 
                      checked={cake.in_stock !== false} 
                      onChange={() => toggleStock(cake)}
                      className="w-5 h-5 accent-[#4A2E18]"
                    />
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => deleteCake(cake.id)} className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50 p-2">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </main>

      {/* Add Cake Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
              <h2 className="font-bold text-lg text-[#4A2E18]">Add New Cake</h2>
              <Button variant="ghost" size="sm" onClick={() => setIsAddModalOpen(false)}>Close</Button>
            </div>
            <form onSubmit={handleAddCake} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Cake Name</label>
                <Input required value={newCake.name} onChange={e => setNewCake({...newCake, name: e.target.value})} placeholder="e.g. Pineapple Delight" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Base Price (0.5kg) in ₹</label>
                <Input required type="number" value={newCake.price} onChange={e => setNewCake({...newCake, price: e.target.value})} placeholder="400" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image URL path</label>
                <Input required value={newCake.image_url} onChange={e => setNewCake({...newCake, image_url: e.target.value})} />
                <p className="text-xs text-stone-500 mt-1">Example: /cakes/WhiteForest%20400.jpeg</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea required value={newCake.description} onChange={e => setNewCake({...newCake, description: e.target.value})} />
              </div>
              <Button type="submit" className="w-full bg-[#4A2E18] text-white">Save Cake</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
