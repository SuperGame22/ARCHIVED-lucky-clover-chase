import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { ShopHeader } from "@/components/shop/ShopHeader";
import { CloverCreditBanner } from "@/components/shop/CloverCreditBanner";
import { SearchBar } from "@/components/shop/SearchBar";
import { CategoryTabs } from "@/components/shop/CategoryTabs";
import { ProductCard } from "@/components/shop/ProductCard";
import { products } from "@/components/shop/productData";

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [userClovers] = useState(47);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "all" || product.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <AppLayout>
      <div className="max-w-lg mx-auto px-4 py-6 space-y-5">
        <ShopHeader />
        <CloverCreditBanner clovers={userClovers} />
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <CategoryTabs
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">No products found</p>
          </motion.div>
        )}

        {/* Cashback Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border border-primary/10 rounded-2xl p-5 text-center"
        >
          <p className="text-lg font-display font-bold mb-1">Earn as you shop!</p>
          <p className="text-sm text-muted-foreground">
            Every <span className="text-accent font-bold">$4</span> spent ={" "}
            <span className="text-primary font-bold">1 clover</span> earned
          </p>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Shop;
