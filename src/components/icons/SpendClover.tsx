import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import cloverOutline from "@/assets/clover-outline.png";

interface SpendCloverProps {
  className?: string;
  totalClovers: number;
  /** Amount spent in dollars to trigger leaf animation */
  spendAmount?: number;
  /** Callback when a full clover is earned (every $4) */
  onCloverEarned?: () => void;
  /** Callback to sync lit leaves state */
  onLitLeavesChange?: (count: number) => void;
  /** External lit leaves state for syncing across instances */
  externalLitLeaves?: number;
}

export const SpendClover = ({ 
  className = "", 
  totalClovers,
  spendAmount = 0,
  onCloverEarned,
  onLitLeavesChange,
  externalLitLeaves
}: SpendCloverProps) => {
  // Track which leaves are currently lit (0-4)
  const [litLeaves, setLitLeaves] = useState(externalLitLeaves ?? 0);
  // Track pending dollars to animate
  const [pendingDollars, setPendingDollars] = useState(0);
  // Track if animation is running
  const [isAnimating, setIsAnimating] = useState(false);
  // Track earned clovers during current animation
  const [earnedClovers, setEarnedClovers] = useState(0);

  // Sync with external lit leaves
  useEffect(() => {
    if (externalLitLeaves !== undefined) {
      setLitLeaves(externalLitLeaves);
    }
  }, [externalLitLeaves]);

  // Handle new spend amount
  useEffect(() => {
    if (spendAmount > 0) {
      setPendingDollars(prev => prev + spendAmount);
    }
  }, [spendAmount]);

  // Animate leaf lighting
  const animateLeaves = useCallback(() => {
    if (pendingDollars <= 0 || isAnimating) return;

    setIsAnimating(true);
    
    const interval = setInterval(() => {
      setPendingDollars(prev => {
        if (prev <= 0) {
          clearInterval(interval);
          setIsAnimating(false);
          return 0;
        }

        setLitLeaves(current => {
          const next = (current + 1) % 5;
          // If we complete a full rotation (back to 0 after 4)
          if (next === 0) {
            setEarnedClovers(prev => prev + 1);
            onCloverEarned?.();
          }
          // Notify parent of lit leaves change
          onLitLeavesChange?.(next === 5 ? 0 : next);
          return next === 5 ? 0 : next;
        });

        return prev - 1;
      });
    }, 83); // ~1/3 second for 4 leaves = 83ms per leaf

    return () => clearInterval(interval);
  }, [pendingDollars, isAnimating, onCloverEarned, onLitLeavesChange]);

  useEffect(() => {
    if (pendingDollars > 0 && !isAnimating) {
      animateLeaves();
    }
  }, [pendingDollars, isAnimating, animateLeaves]);

  return (
    <div className={`relative ${className}`}>
      {/* Base clover outline */}
      <div className="relative">
        <img 
          src={cloverOutline} 
          alt="Clover" 
          className="w-full h-full object-contain"
        />
        
        {/* Leaf overlays rotated 45° to align with actual clover leaves */}
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 100 100"
          style={{ transform: "scale(0.85) rotate(45deg)" }}
        >
          {/* Top-right leaf (was top) */}
          <ellipse
            cx="50"
            cy="25"
            rx="15"
            ry="18"
            className={`transition-all duration-150 ${
              litLeaves >= 1 
                ? "fill-primary/60 drop-shadow-[0_0_8px_hsl(var(--primary))]" 
                : "fill-transparent"
            }`}
          />
          {/* Bottom-right leaf (was right) */}
          <ellipse
            cx="75"
            cy="50"
            rx="18"
            ry="15"
            className={`transition-all duration-150 ${
              litLeaves >= 2 
                ? "fill-primary/60 drop-shadow-[0_0_8px_hsl(var(--primary))]" 
                : "fill-transparent"
            }`}
          />
          {/* Bottom-left leaf (was bottom) */}
          <ellipse
            cx="50"
            cy="75"
            rx="15"
            ry="18"
            className={`transition-all duration-150 ${
              litLeaves >= 3 
                ? "fill-primary/60 drop-shadow-[0_0_8px_hsl(var(--primary))]" 
                : "fill-transparent"
            }`}
          />
          {/* Top-left leaf (was left) */}
          <ellipse
            cx="25"
            cy="50"
            rx="18"
            ry="15"
            className={`transition-all duration-150 ${
              litLeaves >= 4 
                ? "fill-primary/60 drop-shadow-[0_0_8px_hsl(var(--primary))]" 
                : "fill-transparent"
            }`}
          />
        </svg>

        {/* Glow effect when earning */}
        <AnimatePresence>
          {earnedClovers > 0 && (
            <motion.div
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-primary/30 rounded-full blur-xl"
              onAnimationComplete={() => setEarnedClovers(0)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Floating +1 indicator when clover earned */}
      <AnimatePresence>
        {earnedClovers > 0 && (
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
