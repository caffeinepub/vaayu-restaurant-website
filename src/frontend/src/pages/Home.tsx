import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronRight,
  Leaf,
  PartyPopper,
  Truck,
  UtensilsCrossed,
} from "lucide-react";
import { motion } from "motion/react";

const highlights = [
  { icon: UtensilsCrossed, label: "Dine In" },
  { icon: Truck, label: "Home Delivery" },
  { icon: PartyPopper, label: "Party Hall" },
  { icon: Leaf, label: "Veg & Non-Veg" },
];

const homeCategories = [
  {
    name: "Pizza",
    image: "/assets/generated/menu-pizza.dim_400x300.jpg",
    category: "Pizza",
  },
  {
    name: "Non-Veg",
    image: "/assets/generated/menu-nonveg.dim_400x300.jpg",
    category: "Non-Veg",
  },
  {
    name: "Burger",
    image: "/assets/generated/menu-burger.dim_400x300.jpg",
    category: "Burger",
  },
  {
    name: "Beverages",
    image: "/assets/generated/menu-beverages.dim_400x300.jpg",
    category: "Cold Drinks",
  },
  {
    name: "Biryani",
    image: "/assets/generated/menu-biryani.dim_400x300.jpg",
    category: "Biryani",
  },
  {
    name: "Desserts",
    image: "/assets/generated/menu-desserts.dim_400x300.jpg",
    category: "Cake",
  },
  {
    name: "Special Thali",
    image: "/assets/generated/menu-thali.dim_400x300.jpg",
    category: "Thali",
  },
  {
    name: "Party Hall",
    image: "/assets/generated/gallery-party-birthday.dim_800x600.jpg",
    category: "Party Hall",
  },
];

export default function Home() {
  const navigate = useNavigate();

  const goToCategory = (category: string) => {
    sessionStorage.setItem("menuCategory", category);
    navigate({ to: "/menu" });
  };

  return (
    <div>
      {/* Hero */}
      <section
        className="relative min-h-[90vh] flex items-center justify-center text-white text-center"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-restaurant.dim_1600x900.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        data-ocid="home.section"
      >
        <div className="absolute inset-0 bg-black/60" />
        <motion.div
          className="relative z-10 px-4 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white mx-auto mb-6 bg-white">
            <img
              src="/assets/uploads/Orange-Black-Minimalist-Kitchen-Logo_20260322_194645_0000-4.png"
              alt="Vaayu Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-4 text-white">
            Good Food, Good Vibes,
            <br />
            <span className="text-white underline decoration-2 decoration-white/60">
              Right in Your Neighborhood
            </span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl mb-8">
            Authentic flavors | Fresh ingredients | Warm hospitality
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-bold text-base px-8 py-3"
              onClick={() => navigate({ to: "/menu" })}
              data-ocid="home.primary_button"
            >
              Order Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white bg-white/10 hover:bg-white hover:text-foreground font-bold text-base px-8 py-3"
              onClick={() => navigate({ to: "/party-hall" })}
              data-ocid="home.secondary_button"
            >
              Book a Party Hall
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Highlights */}
      <section className="bg-primary text-white py-4">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
            {highlights.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm sm:text-base text-white">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Menu */}
      <section
        className="py-16 px-4 max-w-7xl mx-auto"
        data-ocid="home.section"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-black mb-2">
            Explore Our Menu
          </h2>
          <p className="text-gray-600">
            Discover a variety of delicious options
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {homeCategories.map((cat, i) => (
            <motion.button
              key={cat.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              onClick={() => goToCategory(cat.category)}
              className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer"
              data-ocid={`home.item.${i + 1}`}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <p className="font-display font-semibold text-sm sm:text-base text-white">
                  {cat.name}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/menu">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white font-semibold"
              data-ocid="home.secondary_button"
            >
              View Full Menu <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Party Hall CTA */}
      <section
        className="relative py-20 px-4 text-white"
        style={{
          backgroundImage:
            "url('/assets/generated/party-hall-hero.dim_1600x900.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        data-ocid="home.section"
      >
        <div className="absolute inset-0 bg-black/60" />
        <motion.div
          className="relative z-10 max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-white">
            Host Your Special Events With Us
          </h2>
          <p className="text-white/80 mb-6">
            Birthdays, anniversaries, and gatherings — we make every moment
            memorable. Capacity: 30 guests | ₹5,000/day
          </p>
          <Link to="/party-hall">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-bold px-8"
              data-ocid="home.primary_button"
            >
              Book Party Hall
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
