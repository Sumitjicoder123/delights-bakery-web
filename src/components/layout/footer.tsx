import { MapPin, Phone } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4 md:px-6 grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="font-serif text-2xl font-bold mb-4">Delights</h3>
          <p className="text-primary-foreground/80 text-sm max-w-xs">
            Mira Road's favorite destination for 100% pure vegetarian and eggless cakes. Baked fresh daily with premium ingredients for birthdays, anniversaries, and all your celebrations.
          </p>
          <div className="flex gap-4 mt-6">
            <Link href="#" className="hover:text-secondary transition-colors font-medium">
              Instagram
            </Link>
            <Link href="#" className="hover:text-secondary transition-colors font-medium">
              Facebook
            </Link>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-lg mb-4 text-secondary">Contact Us</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/80">
            <li className="flex items-start gap-2">
              <MapPin className="h-5 w-5 shrink-0 text-secondary mt-1" />
              <a href="https://maps.google.com/?q=Delights+Abhilasha+Residency+Rd+Mira+Road+East+401107" target="_blank" rel="noopener noreferrer" className="hover:underline transition-all">
                Abhilasha Residency Rd, Siddhi Vinayak Nagar,<br/>Mahajan Wadi, Mira Road East,<br/>Mira Bhayandar, Maharashtra 401107
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-5 w-5 shrink-0 text-secondary" />
              <a href="tel:+919819134616" className="hover:underline transition-all">+91 98191 34616</a>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-lg mb-4 text-secondary">Operating Hours</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li className="flex justify-between">
              <span>Monday - Sunday</span>
              <span>9:30 AM - 12:00 AM</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 mt-12 pt-6 border-t border-primary-foreground/20 text-center text-xs text-primary-foreground/60">
        <p>&copy; {new Date().getFullYear()} Delights. All rights reserved.</p>
      </div>
    </footer>
  );
}
