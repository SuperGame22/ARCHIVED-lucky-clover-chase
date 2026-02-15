import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Brain, Target, BarChart3, Lock, ChevronRight, Zap, TrendingUp } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CloverIcon } from "@/components/icons/CloverIcon";
import { GoldCoinIcon } from "@/components/icons/GoldCoinIcon";

const practiceModules = [
  {
    title: "Lucky Coach",
    description: "AI swing analysis & tips",
    icon: Brain,
    tier: "clover",
    path: "/practice/coach",
    available: true,
  },
  {
    title: "Gold Coach",
    description: "Advanced pattern modeling",
    icon: Zap,
    tier: "gold",
    path: "/practice/coach",
    available: false,
  },
  {
    title: "Rangefinder Simulator",
    description: "Distance control drills",
    icon: Target,
    tier: "free",
    path: "/practice/rangefinder-sim",
    available: true,
  },
  {
    title: "Putting Grid",
    description: "Precision putting drills",
    icon: Target,
    tier: "free",
    path: "/practice/putting",
    available: true,
  },
  {
    title: "Progress Charts",
    description: "Track your improvement",
    icon: BarChart3,
    tier: "free",
    path: "/practice/progress",
    available: true,
  },
  {
    title: "Enhanced Stats Deep Dive",
    description: "Advanced swing pattern modeling",
    icon: TrendingUp,
    tier: "gold",
    path: "/practice/stats-deep-dive",
    available: false,
  },
];

const Practice = () => {
  return (
    <AppLayout>
      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-display font-bold">Practice</h1>
          <p className="text-muted-foreground text-sm">Sharpen your skills off the course</p>
        </motion.div>

        {/* Session Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display font-semibold">This Week</h3>
            <span className="text-sm text-primary font-medium">3 sessions</span>
          </div>
          <div className="flex gap-1">
            {[true, true, true, false, false, false, false].map((done, i) => (
              <div
                key={i}
                className={`flex-1 h-2 rounded-full ${done ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">Keep practicing to earn bonus clovers!</p>
        </motion.div>

        {/* Practice Modules */}
        <div className="space-y-3">
          {practiceModules.map((module, index) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
            >
              {module.available ? (
                <Link to={module.path} className="block">
                  <div className="glass-card p-4 flex items-center justify-between transition-colors hover:bg-primary/5 cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        module.tier === "gold" ? "bg-accent/15" : "bg-primary/15"
                      }`}>
                        <module.icon className={`w-6 h-6 ${
                          module.tier === "gold" ? "text-accent" : "text-primary"
                        }`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{module.title}</p>
                          {module.tier === "clover" && <CloverIcon className="w-3.5 h-3.5 text-primary" />}
                          {module.tier === "gold" && <GoldCoinIcon className="w-3.5 h-3.5 text-accent" />}
                        </div>
                        <p className="text-sm text-muted-foreground">{module.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </Link>
              ) : (
                <div className="glass-card p-4 flex items-center justify-between opacity-60">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      module.tier === "gold" ? "bg-accent/15" : "bg-primary/15"
                    }`}>
                      <module.icon className={`w-6 h-6 ${
                        module.tier === "gold" ? "text-accent" : "text-primary"
                      }`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{module.title}</p>
                        {module.tier === "clover" && <CloverIcon className="w-3.5 h-3.5 text-primary" />}
                        {module.tier === "gold" && <GoldCoinIcon className="w-3.5 h-3.5 text-accent" />}
                      </div>
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                    </div>
                  </div>
                  <Lock className="w-5 h-5 text-muted-foreground" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Skill Match Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-5"
        >
          <h3 className="font-display font-semibold text-lg mb-3">Skill Match Results</h3>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-muted/50 rounded-xl p-3">
              <p className="text-2xl font-bold text-primary">72%</p>
              <p className="text-xs text-muted-foreground">Accuracy</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-3">
              <p className="text-2xl font-bold text-accent">85%</p>
              <p className="text-xs text-muted-foreground">Consistency</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-3">
              <p className="text-2xl font-bold text-primary">68%</p>
              <p className="text-xs text-muted-foreground">Short Game</p>
            </div>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Practice;
