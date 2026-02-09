import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ShopHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between"
    >
      <div>
        <h1 className="text-2xl font-display font-bold">Pro Shop</h1>
        <p className="text-muted-foreground text-sm">Earn clovers with every purchase</p>
      </div>
      <Button variant="glass" size="icon" className="relative">
        <ShoppingBag className="w-5 h-5" />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
          0
        </span>
      </Button>
    </motion.div>
  );
};
