import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import leprechaunMascot from "@/assets/leprechaun-mascot-transparent.png";

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
          {/* Leprechaun mascot - with golden glow */}
          <motion.div 
            className="relative w-14 h-14 flex items-center justify-center -ml-1"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Golden glow behind leprechaun */}
            <div className="absolute inset-0 bg-accent/40 rounded-full blur-lg scale-110" />
            <img src={leprechaunMascot} alt="Leprechaun" className="relative w-14 h-14 object-contain" />
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
