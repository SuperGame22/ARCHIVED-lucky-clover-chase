import { motion } from "framer-motion";
import { Target, Gift, ShoppingBag, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const actions = [
  {
    icon: Trophy,
    label: "Scorecard",
    path: "/scorecard",
    color: "bg-primary/95 text-primary-foreground hover:bg-primary",
  },
  {
    icon: Target,
    label: "Rangefinder",
    path: "/rangefinder",
    color: "bg-primary/95 text-primary-foreground hover:bg-primary",
  },
  {
    icon: Gift,
    label: "Lucky Spin",
    path: "/spin",
    color: "bg-primary/95 text-primary-foreground hover:bg-primary",
    badge: "$7",
  },
  {
    icon: ShoppingBag,
    label: "Shop",
    path: "/shop",
    color: "bg-primary/95 text-primary-foreground hover:bg-primary",
  },
];

export const QuickActions = () => {
  return (
    <div className="grid grid-cols-4 gap-3">
      {actions.map((action, index) => (
        <motion.div
          key={action.path}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + index * 0.05 }}
        >
          <Link
            to={action.path}
            className={cn(
              "flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300 relative",
              action.color
            )}
          >
            {action.badge && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {action.badge}
              </span>
            )}
            <action.icon className="w-6 h-6" />
            <span className="text-xs font-medium">{action.label}</span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};
