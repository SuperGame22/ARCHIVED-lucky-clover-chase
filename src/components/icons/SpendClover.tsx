import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import cloverOutline from "@/assets/clover-outline.png";

interface SpendCloverProps {
  className?: string;
  litLeaves: number;
  earnedPulse: number;
}

export const SpendClover = ({ className = "", litLeaves, earnedPulse }: SpendCloverProps) => {
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
  const heartPath = `
M 0 -10
C -6 -14  -14 -8  -14 -1
C -14 8   -2 12   0 14
C 2 12    14 8    14 -1
C 14 -8   6 -14   0 -10
Z
`;

  // Heart path: point at bottom when rotation=0
  // To face CENTER: top-left needs point toward bottom-right (45°), etc.
  const leaves = [
    { id: 1, cx: 30, cy: 30, rotation: 45 }, // Top-left: point to center (down-right)
    { id: 2, cx: 70, cy: 30, rotation: -45 }, // Top-right: point to center (down-left)
    { id: 3, cx: 30, cy: 70, rotation: 90 }, // Bottom-left: point to center (up-right)
    { id: 4, cx: 70, cy: 70, rotation: -90 }, // Bottom-right: point to center (up-left)
  ];

  return (
    <div className={`relative ${className}`} style={{ aspectRatio: "1" }}>
      {/* Heart overlays - behind clover */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        style={{
          transform: "scale(1.15) translate(1%, 1%)",
          overflow: "visible",
        }}
      >
        {leaves.map((leaf) => (
          <g key={leaf.id} transform={`translate(${leaf.cx}, ${leaf.cy}) rotate(${leaf.rotation}) scale(1.15, 0.95)`}>
            <path
              d={heartPath}
              fill={litLeaves >= leaf.id ? "hsl(142 71% 45% / 0.65)" : "transparent"}
              style={
                litLeaves >= leaf.id
                  ? {
                      filter: "drop-shadow(0 0 8px hsl(142 71% 45%))",
                    }
                  : undefined
              }
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
