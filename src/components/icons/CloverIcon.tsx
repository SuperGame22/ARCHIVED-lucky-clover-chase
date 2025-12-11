import { cn } from "@/lib/utils";

interface CloverIconProps {
  className?: string;
  animate?: boolean;
}

export const CloverIcon = ({ className, animate = false }: CloverIconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={cn(animate && "animate-float", className)}
  >
    {/* Top leaf - rounded heart shape */}
    <path d="M12 4c-1.5 0-2.7 1.2-2.7 2.7 0 .9.4 1.7 1.1 2.2-.5-.2-1-.4-1.6-.4-1.5 0-2.7 1.2-2.7 2.7 0 1.5 1.2 2.7 2.7 2.7.6 0 1.1-.2 1.6-.4-.7.5-1.1 1.3-1.1 2.2 0 1.5 1.2 2.7 2.7 2.7s2.7-1.2 2.7-2.7c0-.9-.4-1.7-1.1-2.2.5.2 1 .4 1.6.4 1.5 0 2.7-1.2 2.7-2.7 0-1.5-1.2-2.7-2.7-2.7-.6 0-1.1.2-1.6.4.7-.5 1.1-1.3 1.1-2.2C14.7 5.2 13.5 4 12 4z" />
    {/* Stem */}
    <path d="M11 16.5L10 21h1l1-1v-3.5" fill="currentColor" opacity="0.8" />
  </svg>
);
