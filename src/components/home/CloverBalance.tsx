import { CloverIcon } from "@/components/icons/CloverIcon";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface CloverBalanceProps {
  balance: number;
  todayEarned: number;
}

export const CloverBalance = ({ balance, todayEarned }: CloverBalanceProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden glass-card p-6 glow-green"
    >
      {/* Background glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
      
      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Your Clovers</p>
          <div className="flex items-center gap-3">
            <CloverIcon className="w-10 h-10 text-primary animate-float" />
            <span className="text-5xl font-display font-bold text-gradient-green">{balance}</span>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-primary">
            <Sparkles className="w-4 h-4" />
            <span>+{todayEarned} today</span>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-sm text-muted-foreground mb-1">Worth</p>
          <p className="text-2xl font-bold text-foreground">${(balance * 0.25).toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-1">in store credit</p>
        </div>
      </div>
    </motion.div>
  );
};
