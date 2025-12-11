import { CloverIcon } from "@/components/icons/CloverIcon";
import { motion } from "framer-motion";
import { Sparkles, Trophy, Calendar, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface CloverBalanceProps {
  balance: number;
  todayEarned: number;
  jackpotAmount?: number;
  teeTimesCount?: number;
  unreadMessages?: number;
}

export const CloverBalance = ({ 
  balance, 
  todayEarned, 
  jackpotAmount = 2500,
  teeTimesCount = 3,
  unreadMessages = 2
}: CloverBalanceProps) => {
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
          <p className="text-base font-medium text-muted-foreground mb-1">Your Clovers</p>
          <div className="flex items-center gap-3">
            <CloverIcon className="w-11 h-11 text-primary animate-float" />
            <span className="text-5xl font-display font-bold text-gradient-green">{balance}</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-base font-medium text-primary">
            <Sparkles className="w-4 h-4" />
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
          )}
        </div>
      </div>
    </motion.div>
  );
};
