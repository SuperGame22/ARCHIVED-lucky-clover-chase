import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Brain, Target, Lock, ChevronRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { CloverIcon } from "@/components/icons/CloverIcon";
import { GoldCoinIcon } from "@/components/icons/GoldCoinIcon";

const practiceModules = [
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

        {/* AI Coach Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link to="/practice/coach" className="block">
            <div className="glass-card p-1 flex items-stretch gap-1 overflow-hidden">
              {/* Lucky Coach - Active Side */}
              <div className="flex-1 bg-primary/15 border border-primary/30 rounded-xl p-4 flex items-center gap-3 transition-colors hover:bg-primary/20">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-semibold">Lucky Coach</p>
                    <CloverIcon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">AI swing analysis & tips</p>
                </div>
              </div>
              {/* Gold Coach - Locked Side */}
              <div className="flex-1 bg-muted/30 rounded-xl p-4 flex items-center gap-3 opacity-60">
                <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-semibold">Gold Coach</p>
                    <GoldCoinIcon className="w-3.5 h-3.5 text-accent" />
                    <Lock className="w-3 h-3 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">Advanced pattern modeling</p>
                  <span className="inline-block mt-1 text-[10px] font-semibold bg-accent/20 text-accent px-2 py-0.5 rounded-full">Upgrade</span>
                </div>
              </div>
            </div>
          </Link>
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
      </div>
    </AppLayout>
  );
};

export default Practice;
