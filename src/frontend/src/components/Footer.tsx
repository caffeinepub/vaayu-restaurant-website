import { Link } from "@tanstack/react-router";
import { Clock, Instagram, MapPin, Phone } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <footer className="bg-foreground text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary flex-shrink-0 bg-white">
                <img
                  src="/assets/uploads/Orange-Black-Minimalist-Kitchen-Logo_20260322_194645_0000-4.png"
                  alt="Vaayu Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-display font-bold text-xl text-white">
                Vaayu
              </span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              Good Food, Good Vibes, Right in Your Neighborhood
            </p>
            <p className="text-xs text-white/60 mt-3">
              Delivery Zone: Peppeganj, Gorakhpur only
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-base mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/menu", label: "Menu" },
                { to: "/party-hall", label: "Party Hall" },
                { to: "/gallery", label: "Gallery" },
                { to: "/order", label: "Order" },
                { to: "/contact", label: "Contact Us" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={handleLinkClick}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-base mb-4 text-white">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <span className="text-sm text-white/80">
                  Near PNB, Sonauli Road, Peppeganj, Gorakhpur U.P 273165
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a
                  href="tel:+917388280627"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  +91 7388280627
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-white/80">
                  10AM-10PM | Closed Friday
                </span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-display font-semibold text-base mb-4 text-white">
              Follow Us
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://instagram.com/vaayurestaurant"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4 text-primary" />
                  vaayurestaurant
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/917388280627"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
                >
                  <SiWhatsapp className="w-4 h-4 text-green-400" />
                  +91 7388280627
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-white/60">
            &copy; {year} Vaayu The Restaurant & Party Hall. All rights
            reserved.
          </p>
          <p className="text-xs text-white/60">
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
