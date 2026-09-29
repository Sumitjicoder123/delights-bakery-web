/* eslint-disable */
import Link from "next/link";
import { SITE_CONFIG } from "@/config/site";

export const metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for Delights Cakes, Mira Road. Custom cake orders, payment, cancellation and delivery policies.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FFF9F3]">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/" className="text-sm text-[#4A2E18] hover:underline mb-6 inline-block">&larr; Back to Home</Link>
        <h1 className="text-3xl font-serif font-bold text-[#4A2E18] mb-8">Terms &amp; Conditions</h1>
        <p className="text-xs text-stone-500 mb-6">Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>

        <div className="prose prose-stone prose-sm max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-serif font-bold text-[#4A2E18]">1. General</h2>
            <p className="text-stone-700 leading-relaxed">
              Welcome to Delights Cakes (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;). By accessing our website at <strong>delightscakes.in</strong> and placing an order, you agree to these Terms &amp; Conditions. Our bakery is located at Abhilasha Residency Rd, Siddhi Vinayak Nagar, Mahajan Wadi, Mira Road East, Maharashtra 401107.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#4A2E18]">2. Products &amp; Dietary Information</h2>
            <p className="text-stone-700 leading-relaxed">
              All cakes and bakery products sold by Delights are <strong>100% Pure Vegetarian and Eggless</strong>. While we take every precaution, our products are prepared in a facility that handles wheat, dairy, nuts, and soy. Customers with severe allergies should contact us directly before placing an order.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#4A2E18]">3. Ordering &amp; Custom Cake Designs</h2>
            <p className="text-stone-700 leading-relaxed">
              Orders can be placed via our website or WhatsApp at <strong>{SITE_CONFIG.contact.displayPhone}</strong>. Custom cake design requests require a detailed discussion and final confirmation via WhatsApp. The quoted price for custom designs is valid for 48 hours from the time of quote. A minimum of <strong>48 hours advance notice</strong> is required for all custom orders; elaborate tiered or wedding cakes require at least 2 weeks advance notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#4A2E18]">4. Payment Terms</h2>
            <p className="text-stone-700 leading-relaxed">
              We accept Cash, UPI (Google Pay, PhonePe), and bank transfers. For custom cake orders above ₹1000, a <strong>50% advance payment</strong> is required at the time of order confirmation. The remaining balance is due upon pickup or before delivery. Payment confirmation is sent via WhatsApp after successful transaction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#4A2E18]">5. Cancellation &amp; Refund Policy</h2>
            <p className="text-stone-700 leading-relaxed">
              As our products are <strong>perishable goods</strong>, we have a strict cancellation policy:
            </p>
            <ul className="list-disc pl-5 text-stone-700 space-y-1">
              <li>Cancellations made <strong>24+ hours before</strong> the scheduled date: Full refund of advance payment.</li>
              <li>Cancellations made <strong>12-24 hours before</strong>: 50% of the advance payment will be refunded.</li>
              <li>Cancellations made <strong>less than 12 hours before</strong> or after preparation has begun: No refund.</li>
              <li>Once a cake has been delivered or picked up, no returns or refunds are accepted due to the perishable nature of the product.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#4A2E18]">6. Delivery</h2>
            <p className="text-stone-700 leading-relaxed">
              We deliver within a <strong>10 km radius</strong> of our Mira Road East bakery. Delivery charges start at ₹50 and vary based on distance. Delivery timeframes are communicated at the time of order confirmation and are typically within a <strong>2-hour window</strong>. We are not responsible for delays caused by traffic, weather, or other unforeseen circumstances. Free in-store pickup is always available.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#4A2E18]">7. Intellectual Property</h2>
            <p className="text-stone-700 leading-relaxed">
              All content on this website, including images, text, logos, and designs, is the property of Delights Cakes and is protected by copyright laws. Unauthorized use, reproduction, or distribution of any content is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#4A2E18]">8. Contact</h2>
            <p className="text-stone-700 leading-relaxed">
              For any questions regarding these terms, please contact us at <strong>{SITE_CONFIG.contact.displayPhone}</strong> via call or WhatsApp.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t text-center">
          <Link href="/privacy" className="text-sm text-[#4A2E18] hover:underline">Privacy Policy</Link>
          <span className="mx-3 text-stone-300">|</span>
          <Link href="/" className="text-sm text-[#4A2E18] hover:underline">Home</Link>
        </div>
      </div>
    </div>
  );
}
