import { motion } from "framer-motion";
import { GoldCoinIcon } from "@/components/icons/GoldCoinIcon";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";

interface GoldMachinePreviewProps {
  potValue: number;
  generationRate: number;
  health: number;
}

export const GoldMachinePreview = ({ potValue, generationRate, health }: GoldMachinePreviewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card p-5 relative overflow-hidden"
    >
      {/* Gold glow effect */}
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold text-lg">Gold Machine</h3>
          <div className="flex items-center gap-1 text-accent text-sm">
            <Zap className="w-4 h-4" />
            <span>{generationRate} mg/hr</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Animated pot */}
          <div className="relative">
            <motion.div
              animate={{ 
                rotateZ: [0, -2, 2, 0],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-20 h-20 bg-gradient-to-br from-lucky-gold to-amber-600 rounded-2xl flex items-center justify-center shadow-lg animate-pulse-glow"
            >
              <GoldCoinIcon className="w-10 h-10 text-accent-foreground" animate />
            </motion.div>
            {/* Floating coins */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-2 -right-2"
            >
              <GoldCoinIcon className="w-5 h-5 text-accent" />
            </motion.div>
          </div>

          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Pot Value</p>
            <p className="text-3xl font-bold text-gradient-gold">${potValue.toFixed(2)}</p>
            
            {/* Health bar */}
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Health</span>
                <span className="text-foreground">{health}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${health}%` }}
                  className={`h-full rounded-full ${
                    health > 60 ? 'bg-primary' : health > 30 ? 'bg-accent' : 'bg-destructive'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        <Link to="/gold-machine">
          <Button variant="glass" className="w-full mt-4 group">
            Manage Machine
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};
