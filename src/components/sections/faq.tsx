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
    <section className="py-16 md:py-24 bg-background border-t border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        
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
