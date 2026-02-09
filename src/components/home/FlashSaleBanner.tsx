import { motion, AnimatePresence } from "framer-motion";
import { Zap, X } from "lucide-react";
import { useState, useEffect } from "react";

export const FlashSaleBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-gradient-to-r from-accent via-accent to-accent/80 text-accent-foreground px-4 py-3 rounded-lg flex items-center justify-between gap-3 shadow-lg"
        >
          <div className="flex items-center gap-3">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
              <Zap className="w-5 h-5" />
            </motion.div>
            <div>
              <p className="font-bold text-sm">Flash Sale!</p>
              <p className="text-xs opacity-90">3x Clovers on your next spin 🍀</p>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-accent-foreground/20 rounded-lg transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
