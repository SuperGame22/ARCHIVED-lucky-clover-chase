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
    {/* Top leaf - heart shape */}
    <path d="M12 3c-1.5 0-2.8 0.8-3.5 2-0.7-1.2-2-2-3.5-2-2.2 0-4 1.8-4 4 0 3 3.5 5 7.5 5h0c4 0 7.5-2 7.5-5 0-2.2-1.8-4-4-4-1.5 0-2.8 0.8-3.5 2 0.7-1.2 2-2 3.5-2z" />
    
    {/* Left leaf - heart shape */}
    <path d="M3 12c0-1.5 0.8-2.8 2-3.5-1.2-0.7-2-2-2-3.5 0-2.2 1.8-4 4-4 3 0 5 3.5 5 7.5v0c0 4-2 7.5-5 7.5-2.2 0-4-1.8-4-4 0-1.5 0.8-2.8 2-3.5-1.2 0.7-2 2-2 3.5z" />
    
    {/* Right leaf - heart shape */}
    <path d="M21 12c0-1.5-0.8-2.8-2-3.5 1.2-0.7 2-2 2-3.5 0-2.2-1.8-4-4-4-3 0-5 3.5-5 7.5v0c0 4 2 7.5 5 7.5 2.2 0 4-1.8 4-4 0-1.5-0.8-2.8-2-3.5 1.2 0.7 2 2 2 3.5z" />
    
    {/* Bottom leaf - heart shape */}
    <path d="M12 21c-1.5 0-2.8-0.8-3.5-2-0.7 1.2-2 2-3.5 2-2.2 0-4-1.8-4-4 0-3 3.5-5 7.5-5h0c4 0 7.5 2 7.5 5 0 2.2-1.8 4-4 4-1.5 0-2.8-0.8-3.5-2 0.7 1.2 2 2 3.5 2z" />
    
    {/* Stem */}
    <path d="M12 14c0 0 -0.5 3-0.5 5 0 1 0.5 2 0.5 2s0.5-1 0.5-2c0-2-0.5-5-0.5-5" fill="currentColor" opacity="0.7" />
  </svg>
);
