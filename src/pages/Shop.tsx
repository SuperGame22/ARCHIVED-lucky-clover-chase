import { useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { CloverIcon } from "@/components/icons/CloverIcon";
import { ShoppingBag, Filter, Search, Star, Plus } from "lucide-react";

const categories = ["All", "Clubs", "Apparel", "Balls", "Bags", "Accessories"];

const products = [
  {
    id: 1,
    name: "Lucky Driver Pro",
    category: "Clubs",
    price: 299,
    cloversEarned: 75,
    rating: 4.8,
    image: "🏌️",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Shamrock Golf Polo",
    category: "Apparel",
    price: 68,
    cloversEarned: 17,
    rating: 4.9,
    image: "👕",
    badge: "New",
  },
  {
    id: 3,
    name: "Lucky Tour Balls (12pk)",
    category: "Balls",
    price: 48,
    cloversEarned: 12,
    rating: 4.7,
    image: "⛳",
  },
  {
    id: 4,
    name: "Gold Edition Stand Bag",
    category: "Bags",
    price: 199,
    cloversEarned: 50,
    rating: 4.6,
    image: "🎒",
    badge: "Limited",
  },
  {
    id: 5,
    name: "Clover Hat - Green",
    category: "Accessories",
    price: 32,
    cloversEarned: 8,
    rating: 4.8,
    image: "🧢",
  },
  {
    id: 6,
    name: "Hybrid Rescue Club",
    category: "Clubs",
    price: 179,
    cloversEarned: 45,
    rating: 4.5,
    image: "🏌️",
  },
];

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [userClovers] = useState(47);

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <AppLayout>
      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-display font-bold">Shop</h1>
            <p className="text-muted-foreground text-sm">Earn clovers with every purchase</p>
          </div>
          <Button variant="glass" size="icon">
            <ShoppingBag className="w-5 h-5" />
          </Button>
        </motion.div>

        {/* Clover Credit Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <CloverIcon className="w-8 h-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Available Credit</p>
              <p className="text-xl font-bold text-primary">${(userClovers * 0.25).toFixed(2)}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{userClovers}</p>
            <p className="text-xs text-muted-foreground">clovers</p>
          </div>
        </motion.div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search equipment..."
            className="w-full h-12 pl-12 pr-4 bg-muted/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2">
            <Filter className="w-5 h-5" />
          </Button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card overflow-hidden group"
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-muted/30 flex items-center justify-center">
                <span className="text-5xl">{product.image}</span>
                {product.badge && (
                  <span className="absolute top-2 left-2 bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {product.badge}
                  </span>
                )}
                <Button
                  variant="glass"
                  size="icon"
                  className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {/* Product Info */}
              <div className="p-3">
                <h3 className="font-medium text-sm line-clamp-2 mb-1">{product.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-3 h-3 text-accent fill-accent" />
                  <span className="text-xs text-muted-foreground">{product.rating}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-bold">${product.price}</p>
                  <div className="flex items-center gap-1 text-primary text-xs">
                    <CloverIcon className="w-3 h-3" />
                    <span>+{product.cloversEarned}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cashback Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-4 text-center"
        >
          <p className="text-lg font-display font-bold mb-1">Earn as you shop!</p>
          <p className="text-sm text-muted-foreground">
            Every <span className="text-accent font-bold">$4</span> spent = <span className="text-primary font-bold">1 clover</span> earned
          </p>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Shop;
