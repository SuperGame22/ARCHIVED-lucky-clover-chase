import { SpendClover } from "@/components/icons/SpendClover";
import { motion } from "framer-motion";
import { Sparkles, Trophy, Calendar, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useClover } from "@/contexts/CloverContext";

interface CloverBalanceProps {
  balance?: number;
  todayEarned: number;
  jackpotAmount?: number;
  teeTimesCount?: number;
  unreadMessages?: number;
}

export const CloverBalance = ({ 
  todayEarned, 
  jackpotAmount = 2500,
  teeTimesCount = 3,
  unreadMessages = 2,
}: CloverBalanceProps) => {
  const { cloverBalance, litLeaves, earnedPulse } = useClover();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden glass-card p-8 glow-green border-2 border-green-500/20 shadow-[0_0_50px_rgba(34,197,94,0.15)]"
    >
      {/* Background glow */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/20 rounded-full blur-3xl" />
      
      <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left side - Massive Clover balance */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <p className="text-xl font-display font-bold text-muted-foreground uppercase tracking-widest mb-4 opacity-50">Lucky Balance</p>
          <div className="flex items-center gap-6">
            <SpendClover 
              className="w-[130px] h-[130px] drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]" 
              litLeaves={litLeaves}
              earnedPulse={earnedPulse}
            />
            <span className="text-[10rem] font-display font-black leading-none text-gradient-green tracking-tighter">
              {cloverBalance}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-6 text-xl font-bold text-primary italic uppercase tracking-tighter">
            <Sparkles className="w-6 h-6" />
            <span>+{todayEarned} earned this week</span>
          </div>
        </div>
        
        {/* Right side - Preview windows */}
        <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto md:max-w-[180px]">
          {/* Jackpot preview */}
          <Link to="/spin" className="flex-1">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-accent/10 border-2 border-accent/30 rounded-2xl px-4 py-3 transition-colors hover:bg-accent/20"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <Trophy className="w-4 h-4 text-accent" />
                <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Jackpot</span>
              </div>
              <p className="text-2xl font-black text-accent">${jackpotAmount.toLocaleString()}</p>
            </motion.div>
          </Link>
          
          <div className="flex flex-col gap-2 flex-1">
            {/* Tee Times preview */}
            <Link to="/spin">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-primary/10 border border-primary/30 rounded-xl px-4 py-2 transition-colors hover:bg-primary/20"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold uppercase tracking-tight text-foreground">Tee Times</span>
                  </div>
                  <span className="text-lg font-black text-primary">{teeTimesCount}</span>
                </div>
              </motion.div>
            </Link>
            
            {/* Messages preview */}
            {unreadMessages > 0 && (
              <Link to="/chat">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-secondary border border-border rounded-xl px-4 py-2 transition-colors hover:bg-secondary/80"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs font-bold uppercase tracking-tight text-foreground">Chat</span>
                    </div>
                    <span className="text-lg font-black text-foreground">{unreadMessages}</span>
                  </div>
                </motion.div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};