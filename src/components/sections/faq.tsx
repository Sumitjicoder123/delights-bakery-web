"use client";

import { useState } from "react";
import { ChevronDown, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How much notice do you need for custom cakes?",
    answer: "We require a minimum of 48 hours notice for all custom cake orders. For elaborate tiered cakes or wedding cakes, we recommend reaching out at least 2 weeks in advance."
  },
  {
    question: "Do you deliver to my area?",
    answer: "We deliver within a 10km radius of our Downtown bakery. Delivery fees start at ₹150 and vary based on the exact distance. You can also opt for free in-store pickup."
  },
  {
    question: "Are all your cakes available eggless?",
    answer: "Yes! All our signature flavors can be made 100% eggless. We also offer specific vegan and gluten-free options. Please note there is a small additional charge for dietary modifications."
  },
  {
    question: "How do I finalize payment?",
    answer: "Once you submit your order details via WhatsApp, we will review the design and confirm the final price. We then send you a UPI QR code or payment link to securely complete your booking."
  }
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="reviews" className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Social Proof */}
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="flex items-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-6 h-6 fill-[#FBBC04] text-[#FBBC04]" />
            ))}
          </div>
          <h3 className="text-2xl font-bold font-serif mb-2">4.9 ★ Excellent</h3>
          <p className="text-muted-foreground">Based on 150+ local reviews on Google</p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold font-serif text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="border rounded-lg overflow-hidden bg-card">
                  <button
                    className="flex justify-between items-center w-full p-4 text-left font-medium hover:bg-muted/50 transition-colors"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={cn("w-5 h-5 transition-transform", isOpen && "rotate-180")} />
                  </button>
                  <div 
                    className={cn(
                      "grid transition-all duration-300 ease-in-out",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="p-4 pt-0 text-muted-foreground text-sm leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
      </div>
    </section>
  );
}
