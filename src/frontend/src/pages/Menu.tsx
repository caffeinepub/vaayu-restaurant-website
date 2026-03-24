import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "@tanstack/react-router";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useCart } from "../contexts/CartContext";
import { type MenuItem, categories, menuItems } from "../data/menu";

type PizzaSize = "Regular" | "Medium" | "Large";

export default function Menu() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [activeTab, setActiveTab] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [pizzaSizes, setPizzaSizes] = useState<Record<number, PizzaSize>>({});
  const categoryBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cat = sessionStorage.getItem("menuCategory");
    if (cat) {
      setSelectedCategory(cat);
      sessionStorage.removeItem("menuCategory");
    }
  }, []);

  const getItemKey = (item: MenuItem, size?: PizzaSize) =>
    item.sizes ? `${item.id}-${size || "Regular"}` : `${item.id}`;

  const getPrice = (item: MenuItem, size?: PizzaSize) => {
    if (item.sizes && size) return item.sizes[size];
    return item.price;
  };

  const getPizzaSize = (id: number): PizzaSize => pizzaSizes[id] || "Regular";
  const getQty = (key: string) => quantities[key] || 0;

  const increment = (key: string) =>
    setQuantities((prev) => ({ ...prev, [key]: (prev[key] || 0) + 1 }));

  const decrement = (key: string) =>
    setQuantities((prev) => ({
      ...prev,
      [key]: Math.max(0, (prev[key] || 0) - 1),
    }));

  const handleAddToCart = (item: MenuItem) => {
    const size = item.sizes ? getPizzaSize(item.id) : undefined;
    const key = getItemKey(item, size);
    const qty = getQty(key);
    if (qty === 0) {
      toast.error("Please select a quantity first");
      return;
    }
    const price = getPrice(item, size);
    const name = item.sizes ? `${item.name} (${size})` : item.name;
    for (let i = 0; i < qty; i++)
      addItem({ id: key, itemId: item.id, name, price, size });
    setQuantities((prev) => ({ ...prev, [key]: 0 }));
    toast.success(`${name} added to cart!`);
  };

  const filtered = menuItems.filter((item) => {
    const catMatch =
      selectedCategory === "All" || item.category === selectedCategory;
    const vegMatch = activeTab === "Veg" ? item.type === "veg" : true;
    return catMatch && vegMatch;
  });

  const scrollCategory = (cat: string) => {
    setSelectedCategory(cat);
    if (categoryBarRef.current) {
      const btn = categoryBarRef.current.querySelector(
        `[data-cat="${cat}"]`,
      ) as HTMLButtonElement | null;
      btn?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-foreground text-white py-12 px-4 text-center">
        <motion.h1
          className="font-display text-3xl md:text-5xl font-bold mb-2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Our Menu
        </motion.h1>
        <p className="text-white/70">Fresh, delicious food made with love</p>
      </div>

      <div className="sticky top-16 z-40 bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 pt-3 flex gap-3 items-center">
          {["All Items", "Veg"].map((tab) => (
            <button
              type="button"
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                activeTab === tab
                  ? "bg-primary text-white border-primary"
                  : "border-border text-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {tab === "Veg" ? (
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-3 h-3 rounded-sm border-2 border-green-600">
                    <span className="block w-1.5 h-1.5 rounded-full bg-green-600 mx-auto mt-0.5" />
                  </span>
                  Veg Only
                </span>
              ) : (
                tab
              )}
            </button>
          ))}
        </div>
        <div
          ref={categoryBarRef}
          className="flex overflow-x-auto category-scroll gap-2 px-4 py-3"
        >
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              data-cat={cat}
              onClick={() => scrollCategory(cat)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                selectedCategory === cat
                  ? "bg-primary text-white border-primary"
                  : "border-border text-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              No items found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item, i) => {
              const size = item.sizes ? getPizzaSize(item.id) : undefined;
              const key = getItemKey(item, size);
              const qty = getQty(key);
              const price = getPrice(item, size);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="bg-white border border-border rounded-xl p-4 flex flex-col gap-3 shadow-xs hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        {item.type === "veg" ? (
                          <span
                            className="inline-flex items-center justify-center w-4 h-4 rounded-sm border-2 border-green-600 flex-shrink-0"
                            title="Veg"
                          >
                            <span className="block w-1.5 h-1.5 rounded-full bg-green-600" />
                          </span>
                        ) : (
                          <span
                            className="inline-flex items-center justify-center w-4 h-4 rounded-sm border-2 border-red-600 flex-shrink-0"
                            title="Non-Veg"
                          >
                            <span className="block w-1.5 h-1.5 rounded-full bg-red-600" />
                          </span>
                        )}
                        <h3 className="font-semibold text-foreground text-sm">
                          {item.name}
                        </h3>
                        {item.bestseller && (
                          <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                            Bestseller
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    </div>
                    <p className="font-bold text-primary text-base flex-shrink-0">
                      Rs.{price}
                    </p>
                  </div>

                  {item.sizes && (
                    <Select
                      value={getPizzaSize(item.id)}
                      onValueChange={(v) =>
                        setPizzaSizes((prev) => ({
                          ...prev,
                          [item.id]: v as PizzaSize,
                        }))
                      }
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(item.sizes).map(([s, p]) => (
                          <SelectItem key={s} value={s}>
                            {s} - Rs.{p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  <div className="flex items-center gap-2 mt-auto">
                    <div className="flex items-center border border-border rounded-lg overflow-hidden">
                      <button
                        type="button"
                        onClick={() => decrement(key)}
                        className="px-2 py-1.5 hover:bg-muted transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 py-1.5 text-sm font-semibold min-w-[2rem] text-center">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => increment(key)}
                        className="px-2 py-1.5 hover:bg-muted transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <Button
                      size="sm"
                      className="flex-1 bg-primary hover:bg-primary/90 text-white text-xs font-bold"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingCart className="w-3 h-3 mr-1" /> Add to Cart
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
        <div className="text-center mt-10">
          <Button
            className="bg-primary hover:bg-primary/90 text-white font-bold px-8"
            onClick={() => navigate({ to: "/order" })}
          >
            <ShoppingCart className="w-4 h-4 mr-2" /> View Order
          </Button>
        </div>
      </div>
    </div>
  );
}
