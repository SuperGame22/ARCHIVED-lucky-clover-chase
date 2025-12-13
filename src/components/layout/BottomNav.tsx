import { Link, useLocation } from "react-router-dom";
import { Home, ShoppingBag, Gift, Coins } from "lucide-react";
import { cn } from "@/lib/utils";

// Custom Course icon with target and flag
const CourseIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Outer circle */}
    <circle cx="12" cy="12" r="10" />
    {/* Inner circle */}
    <circle cx="12" cy="12" r="5" />
    {/* Crosshair lines */}
    <line x1="12" y1="2" x2="12" y2="5" />
    <line x1="12" y1="19" x2="12" y2="22" />
    <line x1="2" y1="12" x2="5" y2="12" />
    <line x1="19" y1="12" x2="22" y2="12" />
    {/* Flag pole */}
    <line x1="12" y1="7" x2="12" y2="14" strokeWidth="2.5" />
    {/* Flag - larger and more visible */}
    <path d="M12 7 L17 9.5 L12 12" fill="currentColor" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/course", icon: CourseIcon, label: "Course" },
  { path: "/gold-machine", icon: Coins, label: "Gold" },
  { path: "/spin", icon: Gift, label: "Lucky" },
  { path: "/shop", icon: ShoppingBag, label: "Shop" },
];

export const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-xl border-t border-border safe-area-pb">
      <div className="flex items-center justify-around h-18 max-w-lg mx-auto px-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
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
