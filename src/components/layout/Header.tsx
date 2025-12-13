import cloverSquare from "@/assets/clover-square.png";
import { CloverIcon } from "@/components/icons/CloverIcon";
import { GoldCoinIcon } from "@/components/icons/GoldCoinIcon";
import { Bell, User } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  clovers?: number;
  gold?: number;
}

export const Header = ({ clovers = 47, gold = 2.34 }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={cloverSquare} alt="Clover" className="w-7 h-7" />
          <span className="font-display font-bold text-lg">Lucky Golf</span>
        </Link>

        {/* Currency Display */}
        <div className="flex items-center gap-3">
          {/* Clovers */}
          <div className="flex items-center gap-1.5 bg-primary/10 px-2.5 py-1 rounded-full">
            <CloverIcon className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">{clovers}</span>
          </div>

          {/* Gold */}
          <div className="flex items-center gap-1.5 bg-accent/10 px-2.5 py-1 rounded-full">
            <GoldCoinIcon className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-accent">${gold.toFixed(2)}</span>
          </div>

          {/* Notifications */}
          <button className="p-2 rounded-full hover:bg-muted transition-colors relative">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          </button>

          {/* Profile */}
          <Link to="/profile" className="p-2 rounded-full hover:bg-muted transition-colors">
            <User className="w-5 h-5 text-muted-foreground" />
          </Link>
        </div>
      </div>
    </header>
  );
};
