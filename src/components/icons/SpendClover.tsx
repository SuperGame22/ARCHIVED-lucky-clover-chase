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
  const [showEarnedEffect, setShowEarnedEffect] = useState(false);
  const [lastPulse, setLastPulse] = useState(earnedPulse);

  useEffect(() => {
    if (earnedPulse > lastPulse) {
      setShowEarnedEffect(true);
      setLastPulse(earnedPulse);
      const timer = setTimeout(() => setShowEarnedEffect(false), 600);
      return () => clearTimeout(timer);
    }
  }, [earnedPulse, lastPulse]);

  // Heart path: lobes at top, point at bottom
  const heartPath = "M0,-8 C-4,-12 -10,-8 -10,-2 C-10,5 0,10 0,10 C0,10 10,5 10,-2 C10,-8 4,-12 0,-8 Z";

  // 4-leaf clover: each heart's POINTY TIP faces the CENTER
  // Rotation makes the bottom point toward center
  // Flip 180° so pointy tip faces CENTER (lobes face outward)
  const leaves = [
    { id: 1, cx: 30, cy: 30, rotation: 225 },   // Top-left: point down-right to center
    { id: 2, cx: 70, cy: 30, rotation: 315 },   // Top-right: point down-left to center
    { id: 3, cx: 30, cy: 70, rotation: 135 },   // Bottom-left: point up-right to center
    { id: 4, cx: 70, cy: 70, rotation: 45 },    // Bottom-right: point up-left to center
  ];

  return (
    <div className={`relative ${className}`} style={{ aspectRatio: '1' }}>
      {/* Heart overlays - behind clover */}
      <svg 
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        style={{ 
          transform: "scale(1.15) translate(1%, 1%)",
          overflow: "visible"
        }}
      >
        {leaves.map((leaf) => (
          <g 
            key={leaf.id}
            transform={`translate(${leaf.cx}, ${leaf.cy}) rotate(${leaf.rotation}) scale(1.5)`}
          >
            <path
              d={heartPath}
              fill={litLeaves >= leaf.id ? "hsl(142 71% 45% / 0.65)" : "transparent"}
              style={litLeaves >= leaf.id ? {
                filter: "drop-shadow(0 0 8px hsl(142 71% 45%))"
              } : undefined}
              className="transition-all duration-150"
            />
          </g>
        ))}
      </svg>

      {/* Clover logo on top - scaled larger to cover the hearts */}
      <img 
        src={cloverOutline} 
        alt="Clover" 
        className="absolute inset-0 w-full h-full object-contain"
        style={{ transform: "scale(1.45)" }}
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

      {/* Floating +1 indicator */}
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
