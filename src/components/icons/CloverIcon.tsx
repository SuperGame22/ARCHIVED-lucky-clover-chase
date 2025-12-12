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
    {/* Top-left leaf - rounded heart shape */}
    <path d="M50 50 C45 48 38 45 32 40 C26 35 24 28 26 22 C28 16 34 14 40 16 C44 17 47 20 50 25 C53 20 56 17 60 16 C66 14 72 16 74 22 C76 28 74 35 68 40 C62 45 55 48 50 50" transform="rotate(-45 50 50)" />
    {/* Top-right leaf */}
    <path d="M50 50 C45 48 38 45 32 40 C26 35 24 28 26 22 C28 16 34 14 40 16 C44 17 47 20 50 25 C53 20 56 17 60 16 C66 14 72 16 74 22 C76 28 74 35 68 40 C62 45 55 48 50 50" transform="rotate(45 50 50)" />
    {/* Bottom-right leaf */}
    <path d="M50 50 C45 48 38 45 32 40 C26 35 24 28 26 22 C28 16 34 14 40 16 C44 17 47 20 50 25 C53 20 56 17 60 16 C66 14 72 16 74 22 C76 28 74 35 68 40 C62 45 55 48 50 50" transform="rotate(135 50 50)" />
    {/* Bottom-left leaf */}
    <path d="M50 50 C45 48 38 45 32 40 C26 35 24 28 26 22 C28 16 34 14 40 16 C44 17 47 20 50 25 C53 20 56 17 60 16 C66 14 72 16 74 22 C76 28 74 35 68 40 C62 45 55 48 50 50" transform="rotate(225 50 50)" />
    {/* Center notch detail */}
    <ellipse cx="50" cy="50" rx="3" ry="3" />
    {/* Stem - double line V shape */}
    <path d="M47 55 L44 85 C44 87 45 88 47 88 L48 88 L50 65 L52 88 L53 88 C55 88 56 87 56 85 L53 55 Z" />
  </svg>
);
