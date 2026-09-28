/* eslint-disable */
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Delights Cakes, Mira Road. How we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FFF9F3]">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/" className="text-sm text-[#4A2E18] hover:underline mb-6 inline-block">&larr; Back to Home</Link>
        <h1 className="text-3xl font-serif font-bold text-[#4A2E18] mb-8">Privacy Policy</h1>
        <p className="text-xs text-stone-500 mb-6">Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>

        <div className="prose prose-stone prose-sm max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-serif font-bold text-[#4A2E18]">1. Introduction</h2>
            <p className="text-stone-700 leading-relaxed">
              Delights Cakes (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) values your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website at <strong>delightscakes.in</strong> or place an order through WhatsApp.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#4A2E18]">2. Information We Collect</h2>
            <p className="text-stone-700 leading-relaxed">We may collect the following types of information:</p>
            <ul className="list-disc pl-5 text-stone-700 space-y-1">
              <li><strong>Contact Information:</strong> Name, phone number, and delivery address when you place an order via WhatsApp.</li>
              <li><strong>Order Details:</strong> Cake type, quantity, design preferences, and special instructions.</li>
              <li><strong>Payment Information:</strong> UPI transaction IDs for payment confirmation. We do not store bank account details or card numbers.</li>
              <li><strong>Website Analytics:</strong> Anonymous usage data such as pages visited, browser type, and device information through Vercel Analytics.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#4A2E18]">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 text-stone-700 space-y-1">
              <li>To process and fulfill your cake orders.</li>
              <li>To communicate with you about order status, delivery updates, and custom design confirmations via WhatsApp.</li>
              <li>To improve our website, products, and customer service.</li>
              <li>To send promotional offers or seasonal updates (only if you have opted in).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#4A2E18]">4. Data Sharing</h2>
            <p className="text-stone-700 leading-relaxed">
              We do <strong>not sell, trade, or share</strong> your personal information with any third parties, except as necessary for delivery fulfillment or as required by law. Our website uses Vercel for hosting and analytics, which may collect anonymized performance data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#4A2E18]">5. Cookies &amp; Tracking</h2>
            <p className="text-stone-700 leading-relaxed">
              Our website uses minimal cookies for essential functionality (such as admin authentication). We use Vercel Web Analytics for anonymous, aggregated performance metrics. No personally identifiable information is tracked through cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#4A2E18]">6. Data Security</h2>
            <p className="text-stone-700 leading-relaxed">
              We implement appropriate technical measures to protect your personal information, including HTTPS encryption across our entire website, secure headers, and limited data access.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#4A2E18]">7. Your Rights</h2>
            <p className="text-stone-700 leading-relaxed">
              You have the right to request access to, correction of, or deletion of your personal information at any time. To exercise these rights, contact us via WhatsApp at <strong>+91 9819134616</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#4A2E18]">8. Children&apos;s Privacy</h2>
            <p className="text-stone-700 leading-relaxed">
              Our website is not directed at children under 13. We do not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#4A2E18]">9. Contact</h2>
            <p className="text-stone-700 leading-relaxed">
              For any privacy-related questions or concerns, please reach out to us at <strong>+91 9819134616</strong> via call or WhatsApp.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t text-center">
          <Link href="/terms" className="text-sm text-[#4A2E18] hover:underline">Terms &amp; Conditions</Link>
          <span className="mx-3 text-stone-300">|</span>
          <Link href="/" className="text-sm text-[#4A2E18] hover:underline">Home</Link>
        </div>
      </div>
    </div>
  );
}
