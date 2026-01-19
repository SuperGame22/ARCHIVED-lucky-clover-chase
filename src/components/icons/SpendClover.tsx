import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import cloverOutline from "@/assets/clover-outline.png";

interface SpendCloverProps {
  className?: string;
  litLeaves: number;
  earnedPulse: number;
}

export const SpendClover = ({ 
  className = "", 
  litLeaves,
  earnedPulse
}: SpendCloverProps) => {
  // Track earned pulse locally to trigger animation
  const [showEarnedEffect, setShowEarnedEffect] = useState(false);
  const [lastPulse, setLastPulse] = useState(earnedPulse);

  useEffect(() => {
    if (earnedPulse > lastPulse) {
      setShowEarnedEffect(true);
      setLastPulse(earnedPulse);
      // Reset after animation
      const timer = setTimeout(() => setShowEarnedEffect(false), 600);
      return () => clearTimeout(timer);
    }
  }, [earnedPulse, lastPulse]);

  return (
    <div className={`relative ${className}`}>
      {/* Leaf overlays positioned behind the clover - hearts with points facing center */}
      <svg 
        className="absolute inset-0 w-full h-full" 
        viewBox="0 0 100 100"
        style={{ transform: "scale(1.1) rotate(45deg) translateY(12%) translateX(-2%)" }}
      >
        {/* Top leaf - heart with point facing down (toward center) */}
        <path
          d="M50 70 C50 70, 30 50, 30 40 C30 30, 40 25, 50 35 C60 25, 70 30, 70 40 C70 50, 50 70, 50 70"
          transform="translate(0, -22) scale(0.5)"
          className={`transition-all duration-150 ${
            litLeaves >= 1 
              ? "fill-primary/60 drop-shadow-[0_0_8px_hsl(var(--primary))]" 
              : "fill-transparent"
          }`}
        />
        {/* Right leaf - heart with point facing left (toward center) */}
        <path
          d="M50 70 C50 70, 30 50, 30 40 C30 30, 40 25, 50 35 C60 25, 70 30, 70 40 C70 50, 50 70, 50 70"
          transform="translate(22, 0) scale(0.5) rotate(-90, 50, 50)"
          className={`transition-all duration-150 ${
            litLeaves >= 2 
              ? "fill-primary/60 drop-shadow-[0_0_8px_hsl(var(--primary))]" 
              : "fill-transparent"
          }`}
        />
        {/* Bottom leaf - heart with point facing up (toward center) */}
        <path
          d="M50 70 C50 70, 30 50, 30 40 C30 30, 40 25, 50 35 C60 25, 70 30, 70 40 C70 50, 50 70, 50 70"
          transform="translate(0, 22) scale(0.5) rotate(180, 50, 50)"
          className={`transition-all duration-150 ${
            litLeaves >= 3 
              ? "fill-primary/60 drop-shadow-[0_0_8px_hsl(var(--primary))]" 
              : "fill-transparent"
          }`}
        />
        {/* Left leaf - heart with point facing right (toward center) */}
        <path
          d="M50 70 C50 70, 30 50, 30 40 C30 30, 40 25, 50 35 C60 25, 70 30, 70 40 C70 50, 50 70, 50 70"
          transform="translate(-22, 0) scale(0.5) rotate(90, 50, 50)"
          className={`transition-all duration-150 ${
            litLeaves >= 4 
              ? "fill-primary/60 drop-shadow-[0_0_8px_hsl(var(--primary))]" 
              : "fill-transparent"
          }`}
        />
      </svg>

      {/* Base clover outline - 30% larger */}
      <div className="relative">
        <img 
          src={cloverOutline} 
          alt="Clover" 
          className="w-[130%] h-[130%] object-contain -m-[15%]"
        />

        {/* Glow effect when earning */}
        <AnimatePresence>
          {showEarnedEffect && (
            <motion.div
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-primary/30 rounded-full blur-xl"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Floating +1 indicator when clover earned */}
      <AnimatePresence>
        {showEarnedEffect && (
          <motion.div
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: -30, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute -top-2 left-1/2 -translate-x-1/2 text-primary font-bold text-lg"
          >
            +1
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
