import { motion } from "framer-motion";
import { CloverIcon } from "@/components/icons/CloverIcon";
import { Ticket, Trophy, Clock, Gift } from "lucide-react";

interface WeeklyRaffleProps {
  weeklyCloverCount: number;
}

export const WeeklyRaffle = ({ weeklyCloverCount }: WeeklyRaffleProps) => {
  const daysLeft = 4; // Mock days until raffle
  const jackpot = "$2500 Pro Shop Credit";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="glass-card p-5 relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Ticket className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg">Weekly Raffle</h3>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{daysLeft} days left</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-accent">
            <Trophy className="w-4 h-4" />
          </div>
        </div>

        {/* Jackpot display */}
        <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-xl p-4 mb-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">This Week's Jackpot</p>
          <p className="text-lg font-bold text-gradient-gold">{jackpot}</p>
        </div>

        {/* Your tickets */}
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <CloverIcon className="w-5 h-5 text-primary" />
              <span className="font-medium">{weeklyCloverCount}</span>
            </div>
            <span className="text-muted-foreground">=</span>
            <div className="flex items-center gap-1">
              <Ticket className="w-5 h-5 text-accent" />
              <span className="font-bold text-accent">{weeklyCloverCount}</span>
            </div>
          </div>
          <span className="text-sm text-muted-foreground">Raffle Tickets</span>
        </div>

        {/* Explanation */}
        <p className="text-xs text-muted-foreground mt-3 text-center">
          Every clover you find this week = 1 raffle ticket! 🍀
        </p>

        {/* Past winners teaser */}
        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center gap-2 text-sm">
            <Gift className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Last week's winner:</span>
            <span className="font-medium">Mike T. won a new driver!</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};