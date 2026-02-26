import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { 
  Trophy, Target, Crown, TrendingUp, Award, 
  BarChart3, ChevronRight, Star, Lock
} from "lucide-react";
import { GoldCoinIcon } from "@/components/icons/GoldCoinIcon";
import { Link } from "react-router-dom";

const stats = [
  { label: "Rounds", value: "42", icon: Target },
  { label: "Best Score", value: "78", icon: Trophy },
  { label: "Avg Score", value: "84.2", icon: BarChart3 },
  { label: "Handicap", value: "12.4", icon: TrendingUp },
];

const achievements = [
  { label: "First Birdie", earned: true, icon: "🐦" },
  { label: "Eagle Eye", earned: true, icon: "🦅" },
  { label: "Under Par Round", earned: false, icon: "⭐" },
  { label: "10 Rounds Streak", earned: true, icon: "🔥" },
  { label: "Hole in One", earned: false, icon: "🏆" },
  { label: "50 Clovers Found", earned: true, icon: "🍀" },
];

const Career = () => {
  return (
    <AppLayout>
      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-display font-bold">Career</h1>
            <p className="text-muted-foreground text-sm">Your golfing identity</p>
          </div>
          <div className="flex items-center gap-1.5 bg-accent/15 px-3 py-1.5 rounded-full">
            <Crown className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-accent">Free Tier</span>
          </div>
        </motion.div>

        {/* Tier Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-5"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Progress to become eligible for Gold</span>
            <span className="text-sm font-medium text-accent">62%</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "62%" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-accent/80 to-accent"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Gain 38 more clovers to unlock Gold tier eligibility
          </p>
        </motion.div>

        {/* Stats Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-5"
        >
          <h3 className="font-display font-semibold text-lg mb-4">Stats Overview</h3>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-muted/50 rounded-xl p-3 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Handicap Progression */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display font-semibold text-lg">Handicap Trend</h3>
            <span className="text-sm text-primary font-medium">↓ 1.2 this month</span>
          </div>
          <div className="flex items-end gap-1 h-20">
            {[18, 16.5, 15.8, 14.2, 13.8, 13.1, 12.4].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t bg-primary/60"
                  style={{ height: `${(val / 20) * 100}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-muted-foreground">6 mo ago</span>
            <span className="text-[10px] text-muted-foreground">Now</span>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-accent" />
            <h3 className="font-display font-semibold text-lg">Achievements</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {achievements.map((badge) => (
              <div
                key={badge.label}
                className={`text-center p-3 rounded-xl ${
                  badge.earned ? "bg-primary/10" : "bg-muted/30 opacity-50"
                }`}
              >
                <span className="text-2xl">{badge.icon}</span>
                <p className="text-[10px] font-medium mt-1">{badge.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Leaderboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass-card p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-accent" />
              <h3 className="font-display font-semibold text-lg">Leaderboard</h3>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            {[
              { rank: 1, name: "Mike T.", score: 72, crown: true },
              { rank: 2, name: "Sarah L.", score: 74 },
              { rank: 3, name: "You", score: 78, isUser: true },
            ].map((player) => (
              <div
                key={player.rank}
                className={`flex items-center justify-between p-2.5 rounded-lg ${
                  player.isUser ? "bg-primary/10 border border-primary/20" : "bg-muted/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold w-6 text-center text-muted-foreground">
                    #{player.rank}
                  </span>
                  <span className="font-medium">{player.name}</span>
                  {player.crown && <Crown className="w-4 h-4 text-accent" />}
                </div>
                <span className="font-bold">{player.score}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Progress & Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <h3 className="font-display font-semibold text-lg px-1">Analytics</h3>
          <Link to="/practice/progress" className="block">
            <div className="glass-card p-4 flex items-center justify-between transition-colors hover:bg-primary/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Progress Charts</p>
                  <p className="text-sm text-muted-foreground">Track your improvement</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Link>
          <div className="glass-card p-4 flex items-center justify-between opacity-60">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">Enhanced Stats Deep Dive</p>
                  <GoldCoinIcon className="w-3.5 h-3.5 text-accent" />
                </div>
                <p className="text-sm text-muted-foreground">Advanced swing pattern modeling</p>
              </div>
            </div>
            <Lock className="w-5 h-5 text-muted-foreground" />
          </div>
        </motion.div>

      </div>
    </AppLayout>
  );
};

export default Career;
