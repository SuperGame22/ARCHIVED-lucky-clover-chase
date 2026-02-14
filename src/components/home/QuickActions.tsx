import { motion } from "framer-motion";
import { Play, Crosshair, Gift, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const actions = [
  {
    icon: Play,
    label: "Start Round",
    path: "/play",
    color: "bg-primary/80 text-primary-foreground hover:bg-primary/90",
  },
  {
    icon: Crosshair,
    label: "Practice",
    path: "/practice",
    color: "bg-primary/80 text-primary-foreground hover:bg-primary/90",
  },
  {
    icon: Gift,
    label: "Lucky Spin",
    path: "/spin",
    color: "bg-primary/80 text-primary-foreground hover:bg-primary/90",
    badge: "$7",
  },
  {
    icon: BarChart3,
    label: "View Stats",
    path: "/career",
    color: "bg-primary/80 text-primary-foreground hover:bg-primary/90",
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
            <action.icon className="w-8 h-8" />
            <span className="text-xs font-medium">{action.label}</span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};
