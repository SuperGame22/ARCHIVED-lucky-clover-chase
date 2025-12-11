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
    <path d="M12 3C10.5 3 9.2 4 9 5.5C8.8 4 7.5 3 6 3C4 3 2.5 4.8 3 7C3.5 9 6 11 12 11C18 11 20.5 9 21 7C21.5 4.8 20 3 18 3C16.5 3 15.2 4 15 5.5C14.8 4 13.5 3 12 3Z" />
    
    {/* Left leaf - heart shape */}
    <path d="M3 12C3 10.5 4 9.2 5.5 9C4 8.8 3 7.5 3 6C3 4 4.8 2.5 7 3C9 3.5 11 6 11 12C11 18 9 20.5 7 21C4.8 21.5 3 20 3 18C3 16.5 4 15.2 5.5 15C4 14.8 3 13.5 3 12Z" />
    
    {/* Right leaf - heart shape */}
    <path d="M21 12C21 10.5 20 9.2 18.5 9C20 8.8 21 7.5 21 6C21 4 19.2 2.5 17 3C15 3.5 13 6 13 12C13 18 15 20.5 17 21C19.2 21.5 21 20 21 18C21 16.5 20 15.2 18.5 15C20 14.8 21 13.5 21 12Z" />
    
    {/* Bottom leaf - heart shape */}
    <path d="M12 21C10.5 21 9.2 20 9 18.5C8.8 20 7.5 21 6 21C4 21 2.5 19.2 3 17C3.5 15 6 13 12 13C18 13 20.5 15 21 17C21.5 19.2 20 21 18 21C16.5 21 15.2 20 15 18.5C14.8 20 13.5 21 12 21Z" />
    
    {/* Stem */}
    <path d="M11.5 14C11.5 14 11 17 11 19C11 20.5 11.5 22 12 22C12.5 22 13 20.5 13 19C13 17 12.5 14 12.5 14" fill="currentColor" opacity="0.8" />
  </svg>
);
