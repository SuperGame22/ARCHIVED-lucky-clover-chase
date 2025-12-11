import { motion } from "framer-motion";
import { MachineGear } from "./MachineGear";
import { SteamParticles } from "./SteamParticles";
import { GoldPot } from "./GoldPot";
import { GoldFlake } from "./GoldFlake";
import { CloverIcon } from "@/components/icons/CloverIcon";

interface GoldMachineVisualProps {
  machineLevel: number;
  isCollecting?: boolean;
}

export const GoldMachineVisual = ({ machineLevel, isCollecting }: GoldMachineVisualProps) => {
  // Determine visual tier based on level
  const tier = machineLevel >= 10 ? 3 : machineLevel >= 5 ? 2 : 1;
  
  const flakeTypes: Array<"coin" | "nugget" | "sparkle" | "dust"> = ["coin", "nugget", "sparkle", "dust", "coin", "dust"];
  
  return (
    <div className="relative mx-auto w-64 h-80 mb-6">
      {/* Background magical aura */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent rounded-full blur-2xl"
      />
      
      {/* Machine body */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-44 h-40"
      >
        {/* Hopper/Funnel at top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2">
          {/* Hopper rim */}
          <div className="w-24 h-5 bg-gradient-to-b from-amber-700 to-amber-900 rounded-t-lg border-2 border-amber-600 relative overflow-hidden">
            {/* Clover emblem on hopper */}
            <motion.div 
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <CloverIcon className="w-4 h-4 text-primary/60" />
            </motion.div>
          </div>
          
          {/* Funnel body */}
          <div className="relative mx-auto">
            <svg width="96" height="24" viewBox="0 0 96 24" className="block">
              <defs>
                <linearGradient id="funnelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(35 70% 35%)" />
                  <stop offset="100%" stopColor="hsl(30 60% 25%)" />
                </linearGradient>
              </defs>
              <path 
                d="M8 0 L88 0 L68 24 L28 24 Z" 
                fill="url(#funnelGrad)"
                stroke="hsl(35 80% 45%)"
                strokeWidth="1"
              />
              {/* Magical green glow inside funnel */}
              <motion.ellipse
                cx="48" cy="10" rx="25" ry="6"
                fill="hsl(var(--primary))"
                opacity={0.4}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </svg>
          </div>
        </div>

        {/* Main processing chamber */}
        <div className="absolute top-[52px] left-1/2 -translate-x-1/2 w-40 h-24 bg-gradient-to-br from-zinc-600 via-zinc-700 to-zinc-800 rounded-xl border-2 border-zinc-500 shadow-2xl overflow-hidden">
          {/* Glass viewing window */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-10 bg-gradient-to-b from-zinc-900/80 to-zinc-900/60 rounded-lg border border-zinc-400/30 overflow-hidden">
            {/* Swirling gold inside */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-accent/60 rounded-full blur-sm" />
              <div className="absolute top-1 left-2 w-2 h-2 bg-yellow-400/50 rounded-full blur-[1px]" />
              <div className="absolute bottom-1 right-2 w-2 h-2 bg-amber-500/50 rounded-full blur-[1px]" />
            </motion.div>
            {/* Glass reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          </div>
          
          {/* Gears */}
          <div className="absolute bottom-1 left-2">
            <MachineGear size={28} duration={3} direction={1} teeth={8} />
          </div>
          <div className="absolute bottom-3 left-8">
            <MachineGear size={20} duration={2} direction={-1} teeth={6} />
          </div>
          <div className="absolute bottom-1 right-2">
            <MachineGear size={28} duration={3} direction={-1} teeth={8} />
          </div>
          <div className="absolute bottom-3 right-8">
            <MachineGear size={20} duration={2} direction={1} teeth={6} />
          </div>
          
          {/* Pressure gauge */}
          <div className="absolute top-2 right-2 w-6 h-6 bg-zinc-800 rounded-full border border-zinc-500">
            <motion.div
              animate={{ rotate: [-30, 30, -30] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 w-0.5 h-2 bg-red-500 origin-bottom -translate-x-1/2 -translate-y-full"
            />
            <div className="absolute inset-0 rounded-full border border-amber-500/30" />
          </div>
          
          {/* Status lights */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_6px_rgba(34,197,94,0.8)]"
            />
            <div className="w-2 h-2 bg-amber-500/30 rounded-full" />
            <div className="w-2 h-2 bg-red-500/30 rounded-full" />
          </div>
          
          {/* Rivets */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-zinc-400 rounded-full shadow-inner"
              style={{
                top: i < 2 ? 14 : 'auto',
                bottom: i >= 2 ? 4 : 'auto',
                left: i % 2 === 0 ? 14 : 'auto',
                right: i % 2 === 1 ? 14 : 'auto',
              }}
            />
          ))}
          
          {/* Output pipe */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-6 h-8 bg-gradient-to-b from-zinc-600 to-zinc-800 border-x-2 border-zinc-500 rounded-b-sm">
            {/* Pipe detail */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-zinc-500/50 rounded" />
          </div>
        </div>
        
        {/* Steam vents on sides */}
        <SteamParticles count={3} className="top-16 -left-2" />
        <SteamParticles count={3} className="top-16 -right-2" />
        
        {/* Copper pipes on sides */}
        {tier >= 2 && (
          <>
            <div className="absolute top-14 -left-1 w-2 h-16 bg-gradient-to-b from-amber-700 to-amber-800 rounded-full border border-amber-600" />
            <div className="absolute top-14 -right-1 w-2 h-16 bg-gradient-to-b from-amber-700 to-amber-800 rounded-full border border-amber-600" />
          </>
        )}
        
        {/* Level badge */}
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-2 -right-2 bg-gradient-to-br from-primary to-lucky-emerald text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full z-10 shadow-lg border border-primary/50"
        >
          Lv.{machineLevel}
        </motion.div>
        
        {/* Tier 3 magical aura */}
        {tier >= 3 && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 pointer-events-none"
          >
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                className="absolute w-2 h-2 bg-accent rounded-full blur-[2px]"
                style={{
                  top: `${20 + Math.sin(i * Math.PI / 2) * 40}%`,
                  left: `${50 + Math.cos(i * Math.PI / 2) * 45}%`,
                }}
              />
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Falling gold flakes - varied types */}
      {flakeTypes.map((type, i) => (
        <GoldFlake 
          key={i} 
          type={type} 
          delay={i * 0.6} 
          startX={(i % 3 - 1) * 8}
        />
      ))}

      {/* Gold pot at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <GoldPot isCollecting={isCollecting} />
      </div>

      {/* Magical sparkles around machine */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.5],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 0.4,
            repeat: Infinity,
          }}
          className="absolute"
          style={{
            top: `${15 + i * 15}%`,
            left: i % 2 === 0 ? '5%' : '88%',
          }}
        >
          <CloverIcon className="w-3 h-3 text-primary/60" />
        </motion.div>
      ))}
    </div>
  );
};
