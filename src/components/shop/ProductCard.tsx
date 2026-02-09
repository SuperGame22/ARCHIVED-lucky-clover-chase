import { motion } from "framer-motion";
import { Star, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CloverIcon } from "@/components/icons/CloverIcon";
import { Badge } from "@/components/ui/badge";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  cloversEarned: number;
  rating: number;
  image: string;
  badge?: "Bestseller" | "New" | "Limited" | "Sale";
}

interface ProductCardProps {
  product: Product;
  index: number;
}

export const ProductCard = ({ product, index }: ProductCardProps) => {
  const isOnSale = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = isOnSale
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="glass-card overflow-hidden group cursor-pointer"
    >
      {/* Product Image */}
      <div className="relative aspect-square bg-gradient-to-br from-muted/50 to-muted/20 flex items-center justify-center">
        <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
          {product.image}
        </span>
        
        {/* Badge */}
        {product.badge && (
          <Badge
            className={`absolute top-2 left-2 text-[10px] font-bold ${
              product.badge === "Sale"
                ? "bg-destructive text-destructive-foreground"
                : product.badge === "Limited"
                ? "bg-accent text-accent-foreground"
                : product.badge === "New"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            {product.badge === "Sale" ? `-${discountPercent}%` : product.badge}
          </Badge>
        )}

        <Button
          variant="glass"
          size="icon"
          className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-200 h-8 w-8"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Product Info */}
      <div className="p-3 space-y-2">
        <h3 className="font-medium text-sm line-clamp-2 leading-tight">{product.name}</h3>
        
        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 text-accent fill-accent" />
          <span className="text-xs text-muted-foreground">{product.rating}</span>
          <span className="text-xs text-muted-foreground/50 ml-1">•</span>
          <span className="text-xs text-muted-foreground/70">{product.category}</span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-baseline gap-1.5">
            <p className="font-bold text-foreground">${product.price}</p>
            {isOnSale && (
              <p className="text-xs text-muted-foreground line-through">${product.originalPrice}</p>
            )}
          </div>
          <div className="flex items-center gap-1 text-primary text-xs font-medium">
            <CloverIcon className="w-3 h-3" />
            <span>+{product.cloversEarned}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
