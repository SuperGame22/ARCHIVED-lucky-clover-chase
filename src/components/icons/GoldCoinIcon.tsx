import { cn } from "@/lib/utils";

interface GoldCoinIconProps {
  className?: string;
  animate?: boolean;
}

export const GoldCoinIcon = ({ className, animate = false }: GoldCoinIconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={cn(animate && "animate-shimmer", className)}
  >
    <circle cx="12" cy="12" r="10" fill="url(#goldGradient)" />
    <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
    <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="currentColor" opacity="0.8">$</text>
    <defs>
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="50%" stopColor="#FFA500" />
        <stop offset="100%" stopColor="#FF8C00" />
      </linearGradient>
    </defs>
  </svg>
);
