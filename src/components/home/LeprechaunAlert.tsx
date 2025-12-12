import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const LeprechaunAlert = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-lucky-emerald to-primary p-[2px]"
    >
      <div className="relative bg-card rounded-2xl p-4 overflow-hidden">
        {/* Rainbow shimmer effect */}
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent skew-x-12"
        />
        
        <div className="relative flex items-center gap-4">
          {/* Gold pot icon - inline SVG for consistent styling */}
          <motion.div
            animate={{ rotate: [-5, 5, -5], scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-10 h-10 flex items-center justify-center"
          >
            <svg viewBox="0 0 32 32" className="w-8 h-8">
              {/* Pot body */}
              <ellipse cx="16" cy="22" rx="12" ry="8" fill="url(#potGradient)" />
              {/* Gold inside */}
              <ellipse cx="16" cy="18" rx="10" ry="5" fill="#FFD700" />
              {/* Gold coins on top */}
              <circle cx="12" cy="16" r="3" fill="#FFC107" stroke="#B8860B" strokeWidth="0.5" />
              <circle cx="16" cy="15" r="3" fill="#FFD700" stroke="#DAA520" strokeWidth="0.5" />
              <circle cx="20" cy="16" r="3" fill="#FFC107" stroke="#B8860B" strokeWidth="0.5" />
              <defs>
                <linearGradient id="potGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="50%" stopColor="#FBBF24" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold text-accent">Leprechaun Nearby!</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Trade your clovers for gold at Hole 9
            </p>
          </div>
          
          <Link to="/rangefinder">
            <Button variant="gold" size="sm" className="gap-1">
              <MapPin className="w-4 h-4" />
              Find
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
