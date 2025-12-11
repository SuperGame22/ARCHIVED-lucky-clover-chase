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
    {/* Top leaf - heart shape, slightly smaller */}
    <path d="M12 4c-1.2 0-2.2 0.8-2.4 1.8C9.4 4.8 8.4 4 7.2 4c-1.5 0-2.7 1.3-2.3 2.8 0.4 1.5 2.4 3.3 7.1 3.3s6.7-1.8 7.1-3.3c0.4-1.5-0.8-2.8-2.3-2.8-1.2 0-2.2 0.8-2.4 1.8C14.2 4.8 13.2 4 12 4z" />
    
    {/* Left leaf - heart shape */}
    <path d="M4 12c0-1.2 0.8-2.2 1.8-2.4C4.8 9.4 4 8.4 4 7.2c0-1.5 1.3-2.7 2.8-2.3 1.5 0.4 3.3 2.4 3.3 7.1s-1.8 6.7-3.3 7.1c-1.5 0.4-2.8-0.8-2.8-2.3 0-1.2 0.8-2.2 1.8-2.4C4.8 14.2 4 13.2 4 12z" />
    
    {/* Right leaf - heart shape */}
    <path d="M20 12c0-1.2-0.8-2.2-1.8-2.4 1-0.2 1.8-1.2 1.8-2.4 0-1.5-1.3-2.7-2.8-2.3-1.5 0.4-3.3 2.4-3.3 7.1s1.8 6.7 3.3 7.1c1.5 0.4 2.8-0.8 2.8-2.3 0-1.2-0.8-2.2-1.8-2.4 1-0.2 1.8-1.2 1.8-2.4z" />
    
    {/* Bottom leaf - heart shape */}
    <path d="M12 20c-1.2 0-2.2-0.8-2.4-1.8-0.2 1-1.2 1.8-2.4 1.8-1.5 0-2.7-1.3-2.3-2.8 0.4-1.5 2.4-3.3 7.1-3.3s6.7 1.8 7.1 3.3c0.4 1.5-0.8 2.8-2.3 2.8-1.2 0-2.2-0.8-2.4-1.8-0.2 1-1.2 1.8-2.4 1.8z" />
    
    {/* Stem */}
    <path d="M11.5 14.5c0 0-0.3 2-0.3 3.5 0 1 0.4 2 0.8 2s0.8-1 0.8-2c0-1.5-0.3-3.5-0.3-3.5" fill="currentColor" opacity="0.8" />
  </svg>
);
