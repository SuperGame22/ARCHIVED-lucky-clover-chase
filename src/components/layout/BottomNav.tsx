import { Link, useLocation } from "react-router-dom";
import { Home, Target, ShoppingBag, Gift, Coins } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/rangefinder", icon: Target, label: "Range" },
  { path: "/gold-machine", icon: Coins, label: "Gold" },
  { path: "/spin", icon: Gift, label: "Lucky" },
  { path: "/shop", icon: ShoppingBag, label: "Shop" },
];

export const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-xl border-t border-border safe-area-pb">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-300",
                isActive
                  ? "text-[hsl(var(--lucky-gold-dark))] bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 transition-transform duration-300",
                  isActive && "scale-110"
                )}
              />
              <span className="text-[10px] font-medium">{label}</span>
              {isActive && (
                <div className="absolute -bottom-0 w-8 h-0.5 bg-[hsl(var(--lucky-gold-dark))] rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
