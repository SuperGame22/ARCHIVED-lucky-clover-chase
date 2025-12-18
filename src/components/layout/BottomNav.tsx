import { Link, useLocation } from "react-router-dom";
import { Home, ShoppingBag, Gift, Coins } from "lucide-react";
import { cn } from "@/lib/utils";

// Custom Course icon with "On" (target + n outside) design
const CourseIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 30 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Outer circle */}
    <circle cx="11" cy="12" r="9" />
    {/* Inner circle */}
    <circle cx="11" cy="12" r="4.5" />
    {/* Crosshair lines */}
    <line x1="11" y1="3" x2="11" y2="5.5" />
    <line x1="11" y1="18.5" x2="11" y2="21" />
    <line x1="2" y1="12" x2="4.5" y2="12" />
    <line x1="17.5" y1="12" x2="20" y2="12" />
    {/* Flag pole with base */}
    <line x1="11" y1="8" x2="11" y2="15" strokeWidth="2" />
    <ellipse cx="11" cy="15" rx="2" ry="0.8" fill="currentColor" stroke="none" />
    {/* Flag */}
    <path d="M11 8 L15 10 L11 12" fill="currentColor" stroke="none" />
    {/* "n" letter outside circle to the right */}
    <text x="22" y="20" fontSize="9" fontWeight="bold" fill="currentColor" stroke="none" fontFamily="sans-serif">n</text>
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
                  "w-8 h-8 transition-transform duration-300",
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
