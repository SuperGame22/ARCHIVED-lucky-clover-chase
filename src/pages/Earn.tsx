import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { 
  Gift, ShoppingBag, Coins, Trophy, ChevronRight, 
  Ticket, Crown, Sparkles, ArrowRight, Zap, ChevronDown 
} from "lucide-react";
import { CloverIcon } from "@/components/icons/CloverIcon";
import { GoldCoinIcon } from "@/components/icons/GoldCoinIcon";
import { GoldPot } from "@/components/gold/GoldPot";
import { WeeklyRaffle } from "@/components/lucky/WeeklyRaffle";
import { useClover } from "@/contexts/CloverContext";

const earnSections = [
  {
    title: "Gear Shop",
    description: "Spend clovers on gear",
    icon: ShoppingBag,
    path: "/shop",
    accent: true,
  },
  {
    title: "Lucky Spin",
    description: "Spin for tee times & prizes",
    icon: Gift,
    path: "/spin",
    badge: "$7",
  },
  {
    title: "Gold Machine",
    description: "Manage your gold generator",
    icon: Coins,
    path: "/gold-machine",
  },
  {
    title: "Weekly Raffle",
    description: "This week's jackpot: $2,500",
    icon: Trophy,
    expandable: true,
  },
];

const recentWins = [
  { name: "Mike T.", prize: "Driver", time: "1 min ago" },
  { name: "Sarah L.", prize: "Polo Shirt", time: "3 min ago" },
  { name: "John D.", prize: "50% Off Gear", time: "8 min ago" },
];

const Earn = () => {
  const { cloverBalance } = useClover();
  const [raffleExpanded, setRaffleExpanded] = useState(false);

  return (
    <AppLayout>
      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-display font-bold">Earn</h1>
          <p className="text-muted-foreground text-sm">Rewards, economy & the shop</p>
        </motion.div>

        {/* Balance Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-5"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <CloverIcon className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Clovers</span>
              </div>
              <p className="text-3xl font-display font-bold text-primary">{cloverBalance}</p>
              <p className="text-xs text-muted-foreground">= ${(cloverBalance * 0.25).toFixed(2)} credit</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <GoldCoinIcon className="w-5 h-5 text-accent" />
                <span className="text-sm text-muted-foreground">Gold Pot</span>
              </div>
              <p className="text-3xl font-display font-bold text-accent">$4.72</p>
              <p className="text-xs text-muted-foreground">4,720mg collected</p>
            </div>
          </div>
        </motion.div>

        {/* Earn Sections */}
        <div className="space-y-2">
          {earnSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
            >
              {(section as any).expandable ? (
                <div>
                  <button
                    onClick={() => setRaffleExpanded(!raffleExpanded)}
                    className="w-full text-left"
                  >
                    <div className="glass-card p-4 flex items-center justify-between hover:bg-primary/5 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary/15">
                          <section.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{section.title}</p>
                          <p className="text-sm text-muted-foreground">{section.description}</p>
                        </div>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${raffleExpanded ? "rotate-180" : ""}`} />
                    </div>
                  </button>
                  {raffleExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-2"
                    >
                      <WeeklyRaffle weeklyCloverCount={cloverBalance} />
                    </motion.div>
                  )}
                </div>
              ) : (
                <Link to={(section as any).path}>
                  <div className={`glass-card p-4 flex items-center justify-between hover:bg-primary/5 transition-colors relative ${
                    section.accent ? "border-accent/30" : ""
                  }`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        section.accent ? "bg-accent/15" : "bg-primary/15"
                      }`}>
                        <section.icon className={`w-5 h-5 ${section.accent ? "text-accent" : "text-primary"}`} />
                      </div>
                      <div>
                        <p className="font-semibold">{section.title}</p>
                        <p className="text-sm text-muted-foreground">{section.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {(section as any).badge && (
                        <span className="bg-accent text-accent-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                          {(section as any).badge}
                        </span>
                      )}
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        {/* Recent Wins */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-accent" />
            <h3 className="font-display font-semibold">Recent Wins</h3>
          </div>
          <div className="space-y-2">
            {recentWins.map((winner, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">{winner.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{winner.name}</p>
                    <p className="text-xs text-muted-foreground">{winner.prize}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{winner.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cashback Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border border-primary/10 rounded-2xl p-5 text-center"
        >
          <p className="text-lg font-display font-bold mb-1">Earn as you shop!</p>
          <p className="text-sm text-muted-foreground">
            Every <span className="text-accent font-bold">$4</span> spent ={" "}
            <span className="text-primary font-bold">1 clover</span> earned
          </p>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Earn;
