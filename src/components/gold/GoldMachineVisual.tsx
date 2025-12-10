import { motion } from "framer-motion";
import { GoldCoinIcon } from "@/components/icons/GoldCoinIcon";

interface GoldMachineVisualProps {
  machineLevel: number;
  isCollecting?: boolean;
}

export const GoldMachineVisual = ({ machineLevel, isCollecting }: GoldMachineVisualProps) => {
  return (
    <div className="relative mx-auto w-48 h-56 mb-6">
      {/* Machine body */}
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-28"
      >
        {/* Machine top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-gradient-to-b from-zinc-600 to-zinc-700 rounded-t-lg border-2 border-zinc-500" />
        
        {/* Funnel */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[20px] border-r-[20px] border-t-[16px] border-l-zinc-700 border-r-zinc-700 border-t-zinc-500" />
        
        {/* Main machine body */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-28 h-20 bg-gradient-to-br from-zinc-600 via-zinc-700 to-zinc-800 rounded-lg border-2 border-zinc-500 shadow-xl overflow-hidden">
          {/* Gears visual */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute top-2 left-3 w-6 h-6 border-2 border-amber-500/50 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute top-4 right-3 w-4 h-4 border-2 border-amber-500/50 rounded-full"
          />
          
          {/* Output pipe */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-6 bg-gradient-to-b from-zinc-600 to-zinc-800 border-x-2 border-zinc-500" />
        </div>
        
        {/* Level badge */}
        <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full z-10">
          Lv.{machineLevel}
        </div>
      </motion.div>

      {/* Falling gold flakes */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: 85, opacity: 0, scale: 0.5 }}
          animate={{
            y: [85, 120, 155],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.8],
            x: [0, (i % 2 === 0 ? 5 : -5), 0],
          }}
          transition={{
            duration: 2.5,
            delay: i * 0.8,
            repeat: Infinity,
            ease: "easeIn",
          }}
          className="absolute left-1/2 -translate-x-1/2"
        >
          <GoldCoinIcon className="w-4 h-4 text-accent" />
        </motion.div>
      ))}

      {/* Gold pot at bottom */}
      <motion.div
        animate={isCollecting ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 0.5, repeat: isCollecting ? Infinity : 0 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
      >
        {/* Pot body */}
        <div className="relative w-24 h-16">
          {/* Pot rim */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-3 bg-gradient-to-b from-amber-600 to-amber-700 rounded-t-lg" />
          
          {/* Pot body */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-14 bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-600 rounded-b-[40%] shadow-lg overflow-hidden animate-pulse-glow">
            {/* Gold inside pot */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-yellow-400 via-amber-400 to-transparent" />
            
            {/* Shimmer effect */}
            <motion.div
              animate={{ x: [-40, 60] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
            />
          </div>
          
          {/* Coins in pot */}
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute top-1 left-1/2 -translate-x-1/2"
          >
            <GoldCoinIcon className="w-6 h-6 text-amber-900" />
          </motion.div>
        </div>
      </motion.div>

      {/* Sparkles around machine */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.5,
            repeat: Infinity,
          }}
          className="absolute"
          style={{
            top: `${20 + i * 25}%`,
            left: i === 1 ? '10%' : '80%',
          }}
        >
          <div className="w-2 h-2 bg-accent rounded-full blur-[1px]" />
        </motion.div>
      ))}
    </div>
  );
};