import { Home, Trophy, Map, User, DollarSign } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Trophy, label: "Rounds", path: "/rounds" },
    { icon: DollarSign, label: "Wagers", path: "/wagers" },
    { icon: Map, label: "Courses", path: "/courses" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-zinc-800 px-4 py-3 flex justify-around items-center z-50 rounded-t-3xl shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      {navItems.map((item) => (
        <Link
          key={item.label}
          to={item.path}
          className={cn(
            "flex flex-col items-center gap-1.5 transition-all active:scale-90",
            location.pathname === item.path ? "text-green-500" : "text-zinc-600 hover:text-zinc-400"
          )}
        >
          <div className={cn(
            "p-2 rounded-xl transition-all",
            location.pathname === item.path ? "bg-green-500/10" : "bg-transparent"
          )}>
            <item.icon size={20} className={cn("transition-transform", location.pathname === item.path && "scale-110")} />
          </div>
          <span className={cn(
            "text-[9px] font-black uppercase tracking-widest leading-none",
            location.pathname === item.path ? "opacity-100" : "opacity-40"
          )}>
            {item.label}
          </span>
        </Link>
      ))}
    </nav>
  );
};

export default BottomNav;