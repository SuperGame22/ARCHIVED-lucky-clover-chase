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
    {/* Top leaf - heart shape */}
    <path d="M50 8c-6 0-11 4-13 10-2-6-7-10-13-10-8 0-14 6-14 14 0 12 27 28 27 28s27-16 27-28c0-8-6-14-14-14z" transform="rotate(0 50 50) translate(13 0)" />
    {/* Right leaf - heart shape */}
    <path d="M50 8c-6 0-11 4-13 10-2-6-7-10-13-10-8 0-14 6-14 14 0 12 27 28 27 28s27-16 27-28c0-8-6-14-14-14z" transform="rotate(90 50 50) translate(13 0)" />
    {/* Bottom leaf - heart shape */}
    <path d="M50 8c-6 0-11 4-13 10-2-6-7-10-13-10-8 0-14 6-14 14 0 12 27 28 27 28s27-16 27-28c0-8-6-14-14-14z" transform="rotate(180 50 50) translate(13 0)" />
    {/* Left leaf - heart shape */}
    <path d="M50 8c-6 0-11 4-13 10-2-6-7-10-13-10-8 0-14 6-14 14 0 12 27 28 27 28s27-16 27-28c0-8-6-14-14-14z" transform="rotate(270 50 50) translate(13 0)" />
    {/* Stem */}
    <path d="M47 55v35c0 2 1.5 3 3 3s3-1 3-3V55h-6z" />
  </svg>
);
