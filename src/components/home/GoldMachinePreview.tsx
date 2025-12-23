import { motion } from "framer-motion";
import { GoldCoinIcon } from "@/components/icons/GoldCoinIcon";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";
import { GoldPot } from "@/components/gold/GoldPot";

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

        <div className="flex items-start gap-3">
          {/* Gold Pot - scaled down to 2/3 size */}
          <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
            <motion.div
              className="scale-[0.12] origin-center"
              animate={{ 
                rotateZ: [0, -1, 1, 0],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <GoldPot />
            </motion.div>
          </div>

          <div className="flex-1 ml-3">
            <p className="text-sm text-muted-foreground">Pot Value</p>
            <p className="text-3xl font-bold text-gradient-gold">${potValue.toFixed(2)}</p>
            
            {/* Health bar - aligned under Pot Value */}
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
