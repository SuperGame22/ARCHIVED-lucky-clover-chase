import { motion } from "framer-motion";
import { CloverIcon } from "@/components/icons/CloverIcon";
import { GoldCoinIcon } from "@/components/icons/GoldCoinIcon";
import { ShoppingBag, Target, Trophy } from "lucide-react";

const activities = [
  {
    type: "clover",
    title: "Found Clover",
    subtitle: "Hole 7 at Pebble Beach",
    amount: "+1",
    time: "2h ago",
    icon: CloverIcon,
  },
  {
    type: "gold",
    title: "Gold Machine",
    subtitle: "Gold Flakes Produced",
    amount: "+$0.42",
    time: "4h ago",
    icon: GoldCoinIcon,
  },
  {
    type: "shop",
    title: "Equipment Purchase",
    subtitle: "Lucky Golf Polo",
    amount: "+3 🍀",
    time: "1d ago",
    icon: ShoppingBag,
  },
  {
    type: "round",
    title: "Completed Round",
    subtitle: "Score: 87",
    amount: "+5 🍀",
    time: "2d ago",
    icon: Trophy,
  },
];

export const RecentActivity = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass-card p-5"
    >
      <h3 className="font-display font-semibold text-lg mb-4">Recent Activity</h3>
      
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/50 transition-colors"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              activity.type === "clover" ? "bg-primary/10" :
              activity.type === "gold" ? "bg-accent/10" :
              "bg-muted"
            }`}>
              {activity.type === "clover" ? (
                <CloverIcon className="w-5 h-5 text-primary" />
              ) : activity.type === "gold" ? (
                <GoldCoinIcon className="w-5 h-5 text-accent" />
              ) : (
                <activity.icon className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{activity.title}</p>
              <p className="text-xs text-muted-foreground truncate">{activity.subtitle}</p>
            </div>
            
            <div className="text-right">
              <p className={`text-sm font-semibold ${
                activity.type === "clover" ? "text-primary" :
                activity.type === "gold" ? "text-accent" :
                "text-foreground"
              }`}>{activity.amount}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
