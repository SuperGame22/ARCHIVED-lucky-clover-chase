import { Link, useLocation } from "react-router-dom";
import { Home, Crosshair, Play, Trophy, Coins } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/practice", icon: Crosshair, label: "Practice" },
  { path: "/play", icon: Play, label: "Play" },
  { path: "/career", icon: Trophy, label: "Career" },
  { path: "/earn", icon: Coins, label: "Earn" },
];

export const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-xl border-t border-border safe-area-pb">
      <div className="flex items-center justify-around h-18 max-w-lg mx-auto px-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path || 
            (path !== "/" && location.pathname.startsWith(path));
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-300",
                isActive
                  ? "text-[hsl(var(--lucky-gold-dark))] bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Icon
                className={cn(
                  "w-6 h-6 transition-transform duration-300",
                  isActive && "scale-110"
                )}
              />
              <span className="text-[11px] font-medium">{label}</span>
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
