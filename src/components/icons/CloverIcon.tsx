import { cn } from "@/lib/utils";

interface CloverIconProps {
  className?: string;
  animate?: boolean;
}

export const CloverIcon = ({ className, animate = false }: CloverIconProps) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn(animate && "animate-float", className)}
  >
    {/* Top-left leaf */}
    <path d="M50 50 C50 40, 40 30, 30 30 C20 30, 15 40, 15 45 C15 55, 25 55, 35 50 C40 48, 45 50, 50 50" />
    {/* Top-right leaf */}
    <path d="M50 50 C50 40, 60 30, 70 30 C80 30, 85 40, 85 45 C85 55, 75 55, 65 50 C60 48, 55 50, 50 50" />
    {/* Bottom-left leaf */}
    <path d="M50 50 C40 50, 30 55, 30 65 C30 75, 40 80, 45 80 C55 80, 55 70, 50 60 C48 55, 50 52, 50 50" />
    {/* Bottom-right leaf */}
    <path d="M50 50 C60 50, 70 55, 70 65 C70 75, 60 80, 55 80 C45 80, 45 70, 50 60 C52 55, 50 52, 50 50" />
    {/* Stem */}
    <path d="M46 75 Q44 90, 42 95" />
    <path d="M54 75 Q56 90, 58 95" />
  </svg>
);
