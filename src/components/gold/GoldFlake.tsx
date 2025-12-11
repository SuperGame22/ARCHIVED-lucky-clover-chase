import { motion } from "framer-motion";
import { GoldCoinIcon } from "@/components/icons/GoldCoinIcon";

type FlakeType = "coin" | "nugget" | "sparkle" | "dust";

interface GoldFlakeProps {
  type: FlakeType;
  delay: number;
  startX: number;
}

export const GoldFlake = ({ type, delay, startX }: GoldFlakeProps) => {
  const getFlakeElement = () => {
    switch (type) {
      case "coin":
        return <GoldCoinIcon className="w-5 h-5 text-accent" />;
      case "nugget":
        return (
          <div className="w-3 h-3 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-sm rotate-45 shadow-lg" />
        );
      case "sparkle":
        return (
          <svg className="w-3 h-3 text-yellow-300" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" />
          </svg>
        );
      case "dust":
        return (
          <div className="w-1.5 h-1.5 bg-accent/80 rounded-full blur-[0.5px]" />
        );
    }
  };

  const duration = type === "dust" ? 1.8 : type === "sparkle" ? 2.2 : 2.8;

  return (
    <motion.div
      initial={{ 
        y: 95, 
        x: startX,
        opacity: 0, 
        scale: type === "dust" ? 0.3 : 0.5,
        rotate: 0 
      }}
      animate={{
        y: [95, 140, 175],
        x: [startX, startX + (Math.random() - 0.5) * 20, startX],
        opacity: [0, 1, 0],
        scale: type === "dust" ? [0.3, 0.6, 0.4] : [0.5, 1, 0.8],
        rotate: type === "coin" ? [0, 180, 360] : [0, 45, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeIn",
      }}
      className="absolute left-1/2 -translate-x-1/2"
    >
      {getFlakeElement()}
    </motion.div>
  );
};
