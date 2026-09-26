"use client";

import { useState } from "react";
import { Star, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ReviewsSection() {
  const [rating, setRating] = useState(0);
  const [toastMessage, setToastMessage] = useState("");
  const [showFeedbackCard, setShowFeedbackCard] = useState(false);

  const googleReviewUrl = "https://www.google.com/search?q=Delights+Cakes+Mira+Road+Reviews#lrd=0x0:0x0,3,,,";
  const whatsappNumber = "919819134616";
  const whatsappFallbackUrl = `https://wa.me/${whatsappNumber}?text=Hi%20Delights,%20I%20have%20feedback%20regarding%20my%20recent%20order.`;

  const handleStarClick = (star: number) => {
    setRating(star);
    setShowFeedbackCard(false);

    if (star >= 4) {
      setToastMessage("Thank you! Opening Google to post your review...");
      setTimeout(() => {
        window.open(googleReviewUrl, "_blank");
        setToastMessage("");
        setRating(0); // Reset after action
      }, 1500);
    } else {
      setShowFeedbackCard(true);
    }
  };

  return (
    <section id="reviews" className="py-16 md:py-24 bg-[#FFF9F3]">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        
        {/* Smart Review Banner */}
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-amber-100 text-center relative overflow-hidden">
          
          {toastMessage && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/95 backdrop-blur-sm px-6 text-center">
              <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-xl shadow-lg font-medium flex flex-col items-center gap-2 animate-in fade-in zoom-in duration-300">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
                {toastMessage}
              </div>
            </div>
          )}

          <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#4A2E18] mb-3">Loved Our Cakes? Share Your Sweet Experience!</h2>
          <p className="text-muted-foreground mb-8 text-lg">Your review helps our local pure-veg bakery in Mira Road grow.</p>
          
          <div className="flex justify-center items-center gap-2 sm:gap-4 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleStarClick(star)}
                className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
              >
                <Star 
                  className={`w-12 h-12 sm:w-16 sm:h-16 ${rating >= star ? 'fill-[#D97706] text-[#D97706]' : 'text-gray-200 hover:text-gray-300'}`} 
                />
              </button>
            ))}
          </div>

          {showFeedbackCard && (
            <div className="bg-red-50 border border-red-100 rounded-xl p-6 mb-8 max-w-lg mx-auto animate-in fade-in slide-in-from-top-4 duration-300">
              <p className="text-red-800 font-medium mb-4">We're sorry your experience wasn't sweet. Please message the owner directly so we can make it right!</p>
              <Button asChild className="w-full sm:w-auto rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white font-medium shadow-sm">
                <a href={whatsappFallbackUrl} target="_blank" rel="noopener noreferrer">
                  Message Owner on WhatsApp
                </a>
              </Button>
            </div>
          )}

          <div className="flex justify-center">
            <Button asChild size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm w-full sm:w-auto h-12 px-8 text-base">
              <a href={googleReviewUrl} target="_blank" rel="noopener noreferrer">
                ★ Write a Review on Google
              </a>
            </Button>
          </div>
        </div>

        {/* Live Google Reviews Embed Container */}
        <div className="w-full mt-12 flex justify-center">
          <div id="elfsight-google-reviews-placeholder" className="w-full min-h-[160px] rounded-xl border border-amber-100 bg-amber-50/30 p-8 text-center flex flex-col items-center justify-center gap-2">
            <p className="text-sm text-stone-600 font-medium flex items-center gap-2">
              <Star className="w-4 h-4 fill-[#D97706] text-[#D97706]" /> 
              Rated on Google Maps • Mira Road East
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
