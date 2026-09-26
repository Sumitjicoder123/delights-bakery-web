"use client";

import { useState } from "react";
import { Star, CheckCircle2, MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const reviews = [
  {
    name: "Pooja Sharma",
    date: "2 weeks ago",
    text: "Ordered a custom birthday cake for my daughter. Not only did it look absolutely stunning, but the 100% eggless chocolate sponge was so soft and fresh! Delivered right on time in Mira Road. Highly recommended.",
  },
  {
    name: "Rahul Desai",
    date: "1 month ago",
    text: "Their daily fresh counter cakes are a lifesaver for last-minute celebrations. The Butterscotch Crunch is our family favorite. Truly the best pure veg bakery in Mira Bhayandar.",
  },
  {
    name: "Sneha V.",
    date: "2 months ago",
    text: "Amazing quality and perfect sweetness. We ordered a Red Velvet cake for an anniversary and everyone loved it. The fact that it's a completely eggless bakery gives us total peace of mind.",
  }
];

export function ReviewsSection() {
  const [feedback, setFeedback] = useState({
    name: "",
    rating: 0,
    category: "Recent Order Experience",
    message: ""
  });
  const [toastMessage, setToastMessage] = useState("");

  const handleStarClick = (rating: number) => {
    setFeedback({ ...feedback, rating });
  };

  const submitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.name || !feedback.message || feedback.rating === 0) {
      alert("Please provide your name, a rating, and a message.");
      return;
    }
    
    const whatsappNumber = "919819134616";
    const text = `💬 *DELIGHTS CUSTOMER FEEDBACK*\n• *From:* ${feedback.name}\n• *Rating:* ${feedback.rating} / 5 Stars\n• *Category:* ${feedback.category}\n• *Message:* "${feedback.message}"`;
    
    setToastMessage("Thank you for helping us grow! Delights values your feedback.");
    
    setTimeout(() => {
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
      setToastMessage("");
      setFeedback({ name: "", rating: 0, category: "Recent Order Experience", message: "" });
    }, 1500);
  };

  return (
    <section id="reviews" className="py-16 md:py-24 bg-[#FFF9F3]">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Google Reviews Header */}
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            Verified on Google
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#4A2E18] mb-3">Rated 4.9 / 5.0 on Google Maps</h2>
          <div className="flex items-center gap-1 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-7 h-7 fill-[#D97706] text-[#D97706]" />
            ))}
          </div>
          <Button asChild size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm">
            <a href="https://www.google.com/search?q=Delights+Cakes+Mira+Road+Reviews" target="_blank" rel="noopener noreferrer">
              Review Us on Google
            </a>
          </Button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {reviews.map((review, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100 flex flex-col">
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-[#D97706] text-[#D97706]" />
                ))}
              </div>
              <p className="text-muted-foreground text-sm flex-1 italic mb-4 leading-relaxed">
                "{review.text}"
              </p>
              <div className="pt-4 border-t border-amber-50">
                <div className="font-semibold text-[#4A2E18]">{review.name}</div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-green-700 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified Customer
                  </span>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Customer Feedback Form */}
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden">
          <div className="bg-[#4A2E18] text-white p-6 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <MessageSquareText className="w-24 h-24" />
            </div>
            <h3 className="text-2xl font-serif font-bold relative z-10">Help Us Bake Better!</h3>
            <p className="text-white/80 text-sm mt-2 relative z-10 max-w-sm mx-auto">
              Have a suggestion, a favorite flavor you'd like to see, or feedback on a recent order? We would love to hear from you.
            </p>
          </div>
          <div className="p-6 sm:p-8 relative">
            
            {toastMessage && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/95 backdrop-blur-sm px-6 text-center">
                <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-xl shadow-lg font-medium flex flex-col items-center gap-2 animate-in fade-in zoom-in duration-300">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                  {toastMessage}
                </div>
              </div>
            )}

            <form onSubmit={submitFeedback} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[#4A2E18] mb-1">Your Name</label>
                <Input 
                  required
                  placeholder="e.g. Rahul"
                  className="bg-amber-50/30 border-amber-200 focus-visible:ring-amber-500"
                  value={feedback.name}
                  onChange={(e) => setFeedback({...feedback, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-[#4A2E18] mb-1">Rate Your Experience</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleStarClick(star)}
                      className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                    >
                      <Star 
                        className={`w-8 h-8 ${feedback.rating >= star ? 'fill-[#D97706] text-[#D97706]' : 'text-gray-300'}`} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#4A2E18] mb-1">Feedback Category</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-amber-200 bg-amber-50/30 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:cursor-not-allowed disabled:opacity-50"
                  value={feedback.category}
                  onChange={(e) => setFeedback({...feedback, category: e.target.value})}
                >
                  <option value="Recent Order Experience">Recent Order Experience</option>
                  <option value="New Flavor / Cake Suggestion">New Flavor / Cake Suggestion</option>
                  <option value="General Compliment">General Compliment</option>
                  <option value="Issue / Concern">Issue / Concern</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#4A2E18] mb-1">Your Message</label>
                <Textarea 
                  required
                  maxLength={200}
                  placeholder="Tell us what you think..."
                  className="bg-amber-50/30 border-amber-200 focus-visible:ring-amber-500 resize-none min-h-[100px]"
                  value={feedback.message}
                  onChange={(e) => setFeedback({...feedback, message: e.target.value})}
                />
                <div className="text-right text-xs text-muted-foreground mt-1">
                  {feedback.message.length} / 200
                </div>
              </div>

              <Button type="submit" className="w-full h-12 rounded-lg bg-[#25D366] hover:bg-[#128C7E] text-white font-medium text-base shadow-md">
                Send Feedback via WhatsApp
              </Button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
