import { Badge } from "@/components/ui/badge";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu as MenuIcon, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/party-hall", label: "Party Hall" },
  { to: "/gallery", label: "Gallery" },
  { to: "/order", label: "Order" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 flex-shrink-0"
            data-ocid="nav.link"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary flex-shrink-0">
              <img
                src="/assets/uploads/Orange-Black-Minimalist-Kitchen-Logo_20260322_194645_0000-4.png"
                alt="Vaayu Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-display font-bold text-xl text-foreground hidden sm:block">
              Vaayu
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPath === link.to
                    ? "text-primary font-semibold"
                    : "text-foreground hover:text-primary"
                }`}
                data-ocid="nav.link"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Cart + Mobile toggle */}
          <div className="flex items-center gap-2">
            <Link
              to="/order"
              className="relative flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary transition-colors"
              data-ocid="nav.link"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-white text-xs rounded-full">
                  {totalItems}
                </Badge>
              )}
              <span className="hidden sm:block">Order</span>
            </Link>
            <button
              type="button"
              className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <MenuIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  currentPath === link.to
                    ? "bg-accent text-primary font-semibold"
                    : "text-foreground hover:bg-muted"
                }`}
                data-ocid="nav.link"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
