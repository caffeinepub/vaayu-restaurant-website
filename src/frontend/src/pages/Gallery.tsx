import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const galleryImages = [
  {
    src: "/assets/generated/gallery-food-1.dim_800x600.jpg",
    caption: "Indian Food Spread",
    category: "Food",
  },
  {
    src: "/assets/generated/gallery-interior-1.dim_800x600.jpg",
    caption: "Restaurant Interior",
    category: "Interior",
  },
  {
    src: "/assets/generated/gallery-interior-2.dim_800x600.jpg",
    caption: "Cozy Dining Area",
    category: "Interior",
  },
  {
    src: "/assets/generated/hero-restaurant.dim_1600x900.jpg",
    caption: "Elegant Ambiance",
    category: "Interior",
  },
  {
    src: "/assets/generated/gallery-interior-3.dim_800x600.jpg",
    caption: "Festive Decor",
    category: "Interior",
  },
  {
    src: "/assets/generated/party-hall-hero.dim_1600x900.jpg",
    caption: "Party Hall Setup",
    category: "Party Hall",
  },
  {
    src: "/assets/generated/gallery-party-anniversary.dim_800x600.jpg",
    caption: "Anniversary Celebration",
    category: "Party Hall",
  },
  {
    src: "/assets/generated/gallery-party-birthday.dim_800x600.jpg",
    caption: "Birthday Party Hall",
    category: "Party Hall",
  },
  {
    src: "/assets/generated/gallery-desserts.dim_800x600.jpg",
    caption: "Desserts & Sweets",
    category: "Food",
  },
  {
    src: "/assets/generated/menu-pizza.dim_400x300.jpg",
    caption: "Fresh Pizza",
    category: "Food",
  },
];

const allCategories = ["All", "Food", "Interior", "Party Hall"];

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filtered =
    filter === "All"
      ? galleryImages
      : galleryImages.filter((g) => g.category === filter);

  const prev = () =>
    setLightboxIdx((i) =>
      i === null ? null : (i - 1 + filtered.length) % filtered.length,
    );
  const next = () =>
    setLightboxIdx((i) => (i === null ? null : (i + 1) % filtered.length));

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-foreground text-white py-12 px-4 text-center">
        <h1 className="font-display text-3xl md:text-5xl font-bold mb-2">
          Gallery
        </h1>
        <p className="text-white/70">A glimpse into Vaayu's world</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {allCategories.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-colors ${
                filter === cat
                  ? "bg-primary text-white border-primary"
                  : "border-border text-foreground hover:border-primary hover:text-primary"
              }`}
              data-ocid="gallery.tab"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filtered.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              className="relative overflow-hidden rounded-xl cursor-pointer group aspect-square"
              onClick={() => setLightboxIdx(i)}
              data-ocid={`gallery.item.${i + 1}`}
            >
              <img
                src={img.src}
                alt={img.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end">
                <p className="text-white text-sm font-medium p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  {img.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightboxIdx(null)}
            data-ocid="gallery.modal"
          >
            <button
              type="button"
              className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
              onClick={() => setLightboxIdx(null)}
              data-ocid="gallery.close_button"
            >
              <X className="w-8 h-8" />
            </button>
            <button
              type="button"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              data-ocid="gallery.pagination_prev"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <motion.img
              key={lightboxIdx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              src={filtered[lightboxIdx].src}
              alt={filtered[lightboxIdx].caption}
              className="max-h-[85vh] max-w-[85vw] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              data-ocid="gallery.pagination_next"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm">
              {filtered[lightboxIdx].caption} ({lightboxIdx + 1}/
              {filtered.length})
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
