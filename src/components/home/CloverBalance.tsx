import { SpendClover } from "@/components/icons/SpendClover";
import { motion } from "framer-motion";
import { Sparkles, Trophy, Calendar, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

interface CloverBalanceProps {
  balance: number;
  todayEarned: number;
  jackpotAmount?: number;
  teeTimesCount?: number;
  unreadMessages?: number;
  /** Recent spend amount to trigger leaf animation */
  recentSpend?: number;
}

export const CloverBalance = ({ 
  balance, 
  todayEarned, 
  jackpotAmount = 2500,
  teeTimesCount = 3,
  unreadMessages = 2,
  recentSpend = 0
}: CloverBalanceProps) => {
  const [displayBalance, setDisplayBalance] = useState(balance);

  const handleCloverEarned = () => {
    setDisplayBalance(prev => prev + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden glass-card p-5 glow-green"
    >
      {/* Background glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
      
      <div className="relative flex items-start justify-between gap-4">
        {/* Left side - Clover balance */}
        <div className="flex-shrink-0">
          <p className="text-lg font-semibold text-muted-foreground mb-2">Your Clovers</p>
          <div className="flex items-center gap-4">
            <SpendClover 
              className="w-[76px] h-[76px]" 
              totalClovers={displayBalance}
              spendAmount={recentSpend}
              onCloverEarned={handleCloverEarned}
            />
            <span className="text-6xl font-display font-bold text-gradient-green">{displayBalance}</span>
          </div>
          <div className="flex items-center gap-2 mt-3 text-lg font-medium text-primary">
            <Sparkles className="w-5 h-5" />
            <span>+{todayEarned} this week</span>
          </div>
        </div>
        
        {/* Right side - Preview windows */}
        <div className="flex flex-col gap-2 flex-1 max-w-[140px]">
          {/* Jackpot preview */}
          <Link to="/spin" className="block">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-accent/10 border border-accent/30 rounded-lg px-3 py-2 transition-colors hover:bg-accent/20"
            >
              <div className="flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-accent" />
                <span className="text-[10px] text-muted-foreground uppercase tracking-wide">This Week's Jackpot</span>
              </div>
              <p className="text-lg font-bold text-accent mt-0.5">${jackpotAmount.toLocaleString()}</p>
            </motion.div>
          </Link>
          
          {/* Tee Times preview */}
          <Link to="/spin" className="block">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-primary/10 border border-primary/30 rounded-lg px-3 py-1.5 transition-colors hover:bg-primary/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs text-foreground">Tee Times</span>
                </div>
                <span className="text-sm font-bold text-primary">{teeTimesCount}</span>
              </div>
            </motion.div>
          </Link>
          
          {/* Messages preview - only if there's space and unread messages */}
          {unreadMessages > 0 && (
            <Link to="/chat" className="block">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-secondary border border-border rounded-lg px-3 py-1.5 transition-colors hover:bg-secondary/80 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-xs text-foreground">Messages</span>
                  </div>
                  <span className="text-sm font-bold text-foreground">{unreadMessages}</span>
                </div>
              </motion.div>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};
