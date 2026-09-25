import { MapPin, Phone } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4 md:px-6 grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="font-serif text-2xl font-bold mb-4">Delights</h3>
          <p className="text-primary-foreground/80 text-sm max-w-xs">
            Best Cakes in Mira Road. Bespoke celebration cakes made with love and the finest ingredients for your special moments.
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
              <MapPin className="h-5 w-5 shrink-0 text-secondary" />
              <span>Abhilasha Residency Rd, Siddhi Vinayak Nagar,<br/>Mahajan Wadi, Mira Road East,<br/>Mira Bhayandar, Maharashtra 401107</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-5 w-5 shrink-0 text-secondary" />
              <span>+91 98191 34616</span>
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
