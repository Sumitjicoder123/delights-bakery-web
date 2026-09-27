/* eslint-disable */
"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format, addDays } from "date-fns";
import { ChevronRight, ChevronLeft, Upload, Cake, Calendar, User, CheckCircle2, Trash2, Store, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import Image from "next/image";

// --- Schema Definitions ---
const builderSchema = z.object({
  // Step 1
  occasion: z.string().min(1, "Please select an occasion"),
  date: z.string().min(1, "Please select a date"),
  timeSlot: z.string().min(1, "Please select a time slot"),
  // Step 2
  flavor: z.string().min(1, "Please select a flavor"),
  weight: z.string().min(1, "Please select a weight"),
  tiers: z.enum(["Single Tier", "2-Tier"]),
  // Step 3
  cakeText: z.string().max(35, "Maximum 35 characters allowed").optional(),
  notes: z.string().optional(),
  // Step 4
  name: z.string().min(2, "Name must be at least 2 characters"),
  deliveryMode: z.enum(["In-Store Pickup", "Delivery"]),
  address: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.deliveryMode === "Delivery" && (!data.address || data.address.trim() === "")) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Delivery address is required",
      path: ["address"]
    });
  }
});

type BuilderData = z.infer<typeof builderSchema>;

import { customFlavors as FLAVORS } from "@/data/cakes";

const WEIGHTS = [
  { id: "0.5kg", label: "0.5 kg", weightInKg: 0.5, serves: "3-4 people" },
  { id: "1kg", label: "1 kg", weightInKg: 1, serves: "6-8 people" },
  { id: "1.5kg", label: "1.5 kg", weightInKg: 1.5, serves: "10-12 people" },
  { id: "2kg", label: "2 kg", weightInKg: 2, serves: "15-20 people" },
];

const STEPS = [
  { id: 1, title: "Event Details", icon: Calendar },
  { id: 2, title: "Cake Specs", icon: Cake },
  { id: 3, title: "Customization", icon: Upload },
  { id: 4, title: "Details & Summary", icon: User },
];

export function CustomCakeBuilder() {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match(/image\/(png|jpg|jpeg|webp)/i)) {
      setImageError("Please upload a valid image file (PNG, JPG, WEBP).");
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setImageError("Image size must be less than 20MB.");
      return;
    }

    setImageError(null);
    setUploadedImage(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setUploadedImage(null);
    setImagePreview(null);
    setImageError(null);
  };

  const { register, handleSubmit, watch, trigger, formState: { errors } } = useForm<BuilderData>({
    resolver: zodResolver(builderSchema),
    defaultValues: {
      
      tiers: "Single Tier",
      deliveryMode: "In-Store Pickup"
    },
    mode: "onChange"
  });

  const formValues = watch();

  // Dynamic Price Calculation
  const estimatedPrice = useMemo(() => {
    let price = 0;
    const selectedFlavor = FLAVORS.find(f => f.label === formValues.flavor);
    const selectedWeight = WEIGHTS.find(w => w.label === formValues.weight);
    
    if (selectedFlavor && selectedWeight) {
      // Rate per kg = basePrice * 2 (since basePrice is for 0.5kg)
      const pricePerKg = selectedFlavor.basePrice * 2;
      price = pricePerKg * selectedWeight.weightInKg;
    }
    
    if (formValues.tiers === "2-Tier") {
      price += 800; // Tier structure fee
    }
    if (false) {
      price += 150; // Special dietary fee
    }
    if (formValues.deliveryMode === "Delivery") {
      price += 150; // Base delivery fee
    }

    return Math.round(price);
  }, [formValues]);

  // Minimum date is 48 hours from now
  const minDate = format(addDays(new Date(), 2), "yyyy-MM-dd");

  const nextStep = async () => {
    let fieldsToValidate: any[] = [];
    if (currentStep === 1) fieldsToValidate = ["occasion", "date", "timeSlot"];
    if (currentStep === 2) fieldsToValidate = ["flavor", "weight", "tiers"];
    if (currentStep === 3) fieldsToValidate = ["cakeText", "notes"];

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const onSubmit = async (data: BuilderData) => {
    if (uploadedImage) {
      try {
        await navigator.clipboard.write([
          new ClipboardItem({
            [uploadedImage.type]: uploadedImage
          })
        ]);
        alert("Opening WhatsApp!\n\nYour cake design image has been copied to your clipboard. Please paste or attach it in the WhatsApp chat.");
      } catch (err) {
        console.error("Failed to copy image to clipboard", err);
        alert("Opening WhatsApp!\n\nPlease remember to attach your cake reference image in the WhatsApp chat.");
      }
    }

    const shopPhone = "919819134616";
    const nl = "\n"; // New line
    const deliveryString = data.deliveryMode === 'Delivery' 
      ? 'Home Delivery (Delivery charges extra as per distance)' 
      : 'In-Store Pickup';
      
    const addressString = data.deliveryMode === 'Delivery' && data.address 
      ? data.address 
      : 'Pickup';

    const message = `🎂 *CUSTOM CAKE INQUIRY - DELIGHTS*${nl}` +
      `• *Occasion / Date:* ${data.occasion} - ${data.date} @ ${data.timeSlot}${nl}` +
      `• *Flavor & Weight:* ${data.flavor} - ${data.weight}, ${data.tiers} (100% Eggless)${nl}` +
      `• *Message on Cake:* "${data.cakeText || 'None'}"${nl}` +
      `• *Estimated Base Price:* ?${estimatedPrice} (Final price confirmation pending design review)${nl}` +
      `• *Fulfillment:* ${deliveryString}${nl}` +
      `• *Address:* ${addressString}${nl}` +
      `• *Customer:* ${data.name}${nl}` +
      `• *Reference Photo:* ${uploadedImage ? 'Customer is attaching photo in this chat' : 'None'}${nl}` +
      `• *Special Notes:* ${data.notes || 'None'}`;

    window.open(`https://wa.me/${shopPhone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section id="custom-builder" className="py-20 bg-muted/30 scroll-mt-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">Design Your Custom Cake</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Build your dream cake step by step. Get an instant estimate and finalize your order directly via WhatsApp.</p>
        </div>

        <div className="max-w-3xl mx-auto bg-card rounded-2xl shadow-sm border p-6 md:p-10">
          
          {/* Progress Tracker - Mobile */}
          <div className="md:hidden flex flex-col gap-2 mb-8">
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-primary">Step {currentStep} of 4</span>
              <span className="text-muted-foreground">{STEPS[currentStep - 1].title}</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300 rounded-full" 
                style={{ width: `${((currentStep) / 4) * 100}%` }}
              />
            </div>
          </div>

          {/* Progress Tracker - Desktop */}
          <div className="hidden md:flex justify-between items-center mb-10 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted z-0 rounded-full">
              <div 
                className="h-full bg-primary transition-all duration-300 rounded-full" 
                style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
              />
            </div>
            
            {STEPS.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep >= step.id;
              return (
                <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-colors border-2",
                    isActive 
                      ? "bg-primary border-primary text-primary-foreground" 
                      : "bg-card border-muted text-muted-foreground"
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">
                    {step.title}
                  </span>
                </div>
              )
            })}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            {/* STEP 1: Event Details */}
            <div className={cn("space-y-6 animate-in fade-in slide-in-from-right-4 duration-500", currentStep !== 1 && "hidden")}>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Occasion</label>
                <select 
                  {...register("occasion")}
                  className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="">Select Occasion...</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Baby Shower">Baby Shower</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Other">Other</option>
                </select>
                {errors.occasion && <p className="text-red-500 text-xs mt-1">{errors.occasion.message}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Date (Min 48h Notice)</label>
                  <Input type="date" min={minDate} {...register("date")} />
                  {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Time Slot</label>
                  <select 
                    {...register("timeSlot")}
                    className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="">Select Time...</option>
                    <option value="Morning (10AM - 1PM)">Morning (10AM - 1PM)</option>
                    <option value="Afternoon (1PM - 4PM)">Afternoon (1PM - 4PM)</option>
                    <option value="Evening (4PM - 7PM)">Evening (4PM - 7PM)</option>
                  </select>
                  {errors.timeSlot && <p className="text-red-500 text-xs mt-1">{errors.timeSlot.message}</p>}
                </div>
              </div>
            </div>

            {/* STEP 2: Cake Specs */}
            <div className={cn("space-y-6 animate-in fade-in slide-in-from-right-4 duration-500", currentStep !== 2 && "hidden")}>
              <div>
                <label className="block text-sm font-medium mb-3 text-foreground">Sponge & Flavor</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {FLAVORS.map(flavor => (
                    <label key={flavor.id} className={cn(
                      "flex flex-col justify-center items-center text-center p-3 sm:p-4 border-2 rounded-xl cursor-pointer hover:bg-primary/5 transition-all",
                      formValues.flavor === flavor.label ? "border-primary bg-primary/10 shadow-sm" : "border-border/50"
                    )}>
                      <input type="radio" value={flavor.label} {...register("flavor")} className="hidden" />
                      <span className="text-sm sm:text-base font-semibold text-foreground leading-tight">{flavor.label}</span>
                    </label>
                  ))}
                </div>
                {errors.flavor && <p className="text-red-500 text-xs mt-1">{errors.flavor.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-3 text-foreground">Size / Weight</label>
                  <select 
                    {...register("weight")}
                    className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="">Select Weight...</option>
                    {WEIGHTS.map(w => (
                      <option key={w.id} value={w.label}>{w.label} (Serves {w.serves})</option>
                    ))}
                  </select>
                  {errors.weight && <p className="text-red-500 text-xs mt-1">{errors.weight.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-3 text-foreground">Structure</label>
                  <div className="flex gap-4">
                    {["Single Tier", "2-Tier"].map(tier => (
                      <label key={tier} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" value={tier} {...register("tiers")} className="accent-primary" />
                        <span className="text-sm">{tier}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 px-4 py-3 rounded-xl shadow-sm w-full sm:w-auto justify-center">
                  <span className="text-lg">🌿</span>
                  <span className="font-bold text-sm sm:text-base">100% Pure Veg / Eggless Bakery</span>
                </div>
              </div>
            </div>

            {/* STEP 3: Customization */}
            <div className={cn("space-y-6 animate-in fade-in slide-in-from-right-4 duration-500", currentStep !== 3 && "hidden")}>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Text on the Cake (Optional)</label>
                <Input placeholder="e.g. Happy 30th Sarah!" maxLength={35} {...register("cakeText")} />
                <div className="flex justify-between mt-1">
                  {errors.cakeText && <p className="text-red-500 text-xs">{errors.cakeText.message}</p>}
                  <p className="text-xs text-muted-foreground text-right flex-1">{formValues.cakeText?.length || 0}/35</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Reference Image (Optional)</label>
                
                {!imagePreview ? (
                  <div className="relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer group">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2 group-hover:text-primary transition-colors" />
                    <p className="text-sm font-medium">Click to upload or drag & drop</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WEBP up to 20MB</p>
                    <input 
                      type="file" 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                      accept="image/png, image/jpeg, image/jpg, image/webp"
                      onChange={handleImageChange}
                    />
                  </div>
                ) : (
                  <div className="relative border rounded-lg p-4 bg-muted/10 flex flex-col items-center gap-4">
                    <div className="relative w-full max-w-[250px] aspect-square rounded-md overflow-hidden border shadow-sm">
                      <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                    </div>
                    <div className="flex flex-col items-center w-full">
                      <p className="text-sm font-medium flex items-center gap-1 text-primary truncate max-w-full px-4 mb-2">
                        <CheckCircle2 className="w-4 h-4 shrink-0"/> {uploadedImage?.name}
                      </p>
                      <Button type="button" variant="outline" size="sm" onClick={removeImage} className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200">
                        <Trash2 className="w-4 h-4 mr-2" /> Remove Image
                      </Button>
                    </div>
                  </div>
                )}
                
                {imageError && <p className="text-red-500 text-xs mt-2 font-medium">{imageError}</p>}
                
                <p className="text-xs text-muted-foreground mt-3 italic">
                  Note: This image helps us estimate the design accurately. You'll also attach it when redirected to WhatsApp.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Special Instructions / Color Palette</label>
                <Textarea placeholder="Any specific colors or themes?" {...register("notes")} />
              </div>
            </div>

            {/* STEP 4: Details & Summary */}
            <div className={cn("space-y-8 animate-in fade-in slide-in-from-right-4 duration-500", currentStep !== 4 && "hidden")}>
              
              <div className="bg-primary/5 rounded-xl p-5 border border-primary/20">
                <h3 className="font-serif font-bold text-lg mb-4 text-primary border-b border-primary/10 pb-2">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Occasion:</span> <span className="font-medium">{formValues.occasion}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Date & Time:</span> <span className="font-medium">{formValues.date} @ {formValues.timeSlot}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Cake Spec:</span> <span className="font-medium">{formValues.weight} {formValues.flavor}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Details:</span> <span className="font-medium">{formValues.tiers}</span></div>
                  <div className="pt-2 mt-2 border-t border-primary/10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-base">Estimated Base Price:</span> 
                      <span className="font-bold text-xl text-primary">₹{estimatedPrice}</span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">
                      ⚠️ Note: Starting price based on flavor & weight. Final price may vary depending on design complexity, tiers, and fondant work.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif font-bold text-lg">Your Details</h3>
                <div>
                  <Input placeholder="Full Name" {...register("name")} />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                
                <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Delivery Preference</label>
                    <div className="flex flex-col gap-2 mb-3">
                      <label className={cn(
                        "text-left p-3 rounded-md border text-sm font-medium transition-colors flex flex-col gap-1 cursor-pointer",
                        formValues.deliveryMode === "In-Store Pickup" ? "bg-primary/10 border-primary ring-1 ring-primary" : "bg-card hover:bg-muted/50"
                      )}>
                        <div className="flex items-center gap-2">
                          <input type="radio" value="In-Store Pickup" {...register("deliveryMode")} className="accent-primary" />
                          <div className="flex items-center gap-2 font-semibold text-primary">
                            <Store className="w-5 h-5 text-[#4A2E18]" />
                            In-Store Pickup
                          </div>
                        </div>
                        <span className="text-xs font-normal text-muted-foreground ml-6">Abhilasha Residency Rd</span>
                      </label>
                      
                      <label className={cn(
                        "text-left p-3 rounded-md border text-sm font-medium transition-colors flex flex-col gap-1 cursor-pointer",
                        formValues.deliveryMode === "Delivery" ? "bg-primary/10 border-primary ring-1 ring-primary" : "bg-card hover:bg-muted/50"
                      )}>
                        <div className="flex items-center gap-2">
                          <input type="radio" value="Delivery" {...register("deliveryMode")} className="accent-primary" />
                          <div className="flex items-center gap-2 font-semibold text-primary">
                            <Truck className="w-5 h-5 text-[#4A2E18]" />
                            Home Delivery
                          </div>
                        </div>
                        <span className="text-xs font-normal text-muted-foreground ml-6">Delivery charges extra as per distance</span>
                      </label>
                    </div>
                    
                    {formValues.deliveryMode === "Delivery" && (
                      <div className="animate-in slide-in-from-top-2">
                        <Textarea placeholder="Full Delivery Address in Mira Road" {...register("address")} className="mb-2" />
                        {errors.address && <p className="text-red-500 text-xs mb-2">{errors.address.message}</p>}
                        <div className="text-xs text-amber-800 bg-amber-50 p-3 rounded-md border border-amber-100 flex gap-2 items-start mt-2">
                          <span className="text-base">??</span> 
                          <span>Cake total: <strong>?{estimatedPrice}</strong>. Home delivery charges will be calculated as per your Mira Road address and added to the final total via WhatsApp.</span>
                        </div>
                      </div>
                    )}
                  </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col-reverse sm:flex-row justify-between pt-6 border-t gap-4">
              {currentStep > 1 ? (
                <Button type="button" variant="outline" onClick={prevStep} className="h-12 sm:h-10 w-full sm:w-auto">
                  <ChevronLeft className="w-4 h-4 mr-2" /> Back
                </Button>
              ) : (
                <div className="hidden sm:block" /> // Spacer
              )}
              
              {currentStep < 4 ? (
                <Button type="button" onClick={nextStep} className="h-12 sm:h-10 w-full sm:w-auto">
                  Next Step <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button type="submit" size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white h-12 w-full sm:w-auto">
                  Send Order via WhatsApp
                </Button>
              )}
            </div>

          </form>
        </div>
      </div>
    </section>
  );
}




