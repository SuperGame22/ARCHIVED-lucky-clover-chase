import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { CloverIcon } from "@/components/icons/CloverIcon";
import { GoldCoinIcon } from "@/components/icons/GoldCoinIcon";
import {
  User,
  Settings,
  Trophy,
  Target,
  Calendar,
  ChevronRight,
  Crown,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Rounds Played", value: "42", icon: Target },
  { label: "Best Score", value: "78", icon: Trophy },
  { label: "Clovers Found", value: "156", icon: CloverIcon },
  { label: "Member Since", value: "Mar '24", icon: Calendar },
];

const menuItems = [
  { label: "Membership", path: "/membership", icon: Crown },
  { label: "Scorecard History", path: "/scorecard", icon: Trophy },
  { label: "Settings", path: "/settings", icon: Settings },
];

const Profile = () => {
  return (
    <AppLayout>
      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-lucky-emerald rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-display font-bold mb-1">Lucky Player</h1>
          <p className="text-muted-foreground text-sm mb-4">@luckygolfer</p>

          <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full">
            <CloverIcon className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Free Member</span>
          </div>
        </motion.div>

        {/* Balance Cards */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <CloverIcon className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Clovers</span>
            </div>
            <p className="text-3xl font-display font-bold text-primary">47</p>
            <p className="text-xs text-muted-foreground">= $11.75 credit</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <GoldCoinIcon className="w-5 h-5 text-accent" />
              <span className="text-sm text-muted-foreground">Gold Pot</span>
            </div>
            <p className="text-3xl font-display font-bold text-accent">$4.72</p>
            <p className="text-xs text-muted-foreground">4,720mg collected</p>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-5"
        >
          <h3 className="font-display font-semibold text-lg mb-4">Your Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    {stat.icon === CloverIcon ? (
                      <CloverIcon className="w-5 h-5 text-primary" />
                    ) : (
                      <Icon className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <p className="text-lg font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Menu Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card overflow-hidden"
        >
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors border-b border-border last:border-0"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
          ))}
        </motion.div>

        {/* Upgrade CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-lucky-emerald p-[2px]"
        >
          <div className="bg-card rounded-2xl p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold">Upgrade to Gold</h3>
                <p className="text-sm text-muted-foreground">
                  Get 3x clovers on every purchase
                </p>
              </div>
            </div>
            <Link to="/membership">
              <Button variant="gold" className="w-full mt-4">
                View Plans
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Logout */}
        <Button variant="outline" className="w-full gap-2">
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </AppLayout>
  );
};

export default Profile;
