import { cn } from "@/lib/utils";

interface CloverIconProps {
  className?: string;
  animate?: boolean;
}

export const CloverIcon = ({ className, animate = false }: CloverIconProps) => (
  <svg
    viewBox="0 0 100 100"
    fill="currentColor"
    className={cn(animate && "animate-float", className)}
  >
    {/* Top-left leaf */}
    <path d="M50 50 C40 50 30 45 25 35 C20 25 25 12 35 10 C42 8 48 12 50 20 C52 12 58 8 65 10 C75 12 80 25 75 35 C70 45 60 50 50 50" transform="rotate(-45 50 50)" />
    {/* Top-right leaf */}
    <path d="M50 50 C40 50 30 45 25 35 C20 25 25 12 35 10 C42 8 48 12 50 20 C52 12 58 8 65 10 C75 12 80 25 75 35 C70 45 60 50 50 50" transform="rotate(45 50 50)" />
    {/* Bottom-right leaf */}
    <path d="M50 50 C40 50 30 45 25 35 C20 25 25 12 35 10 C42 8 48 12 50 20 C52 12 58 8 65 10 C75 12 80 25 75 35 C70 45 60 50 50 50" transform="rotate(135 50 50)" />
    {/* Bottom-left leaf */}
    <path d="M50 50 C40 50 30 45 25 35 C20 25 25 12 35 10 C42 8 48 12 50 20 C52 12 58 8 65 10 C75 12 80 25 75 35 C70 45 60 50 50 50" transform="rotate(225 50 50)" />
    {/* Stem - V shape */}
    <path d="M46 58 L42 90 C42 92 44 94 46 94 L48 94 L50 70 L52 94 L54 94 C56 94 58 92 58 90 L54 58 Z" />
  </svg>
);
