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
    {/* Four heart-shaped leaves */}
    {/* Top leaf */}
    <path d="M50 12 C40 12 32 20 32 30 C32 40 50 50 50 50 C50 50 68 40 68 30 C68 20 60 12 50 12" />
    {/* Right leaf */}
    <path d="M88 50 C88 40 80 32 70 32 C60 32 50 50 50 50 C50 50 60 68 70 68 C80 68 88 60 88 50" />
    {/* Bottom leaf */}
    <path d="M50 88 C60 88 68 80 68 70 C68 60 50 50 50 50 C50 50 32 60 32 70 C32 80 40 88 50 88" />
    {/* Left leaf */}
    <path d="M12 50 C12 60 20 68 30 68 C40 68 50 50 50 50 C50 50 40 32 30 32 C20 32 12 40 12 50" />
    {/* Stem */}
    <path d="M46 50 L44 92 Q44 96 50 96 Q56 96 56 92 L54 50 Z" />
  </svg>
);
