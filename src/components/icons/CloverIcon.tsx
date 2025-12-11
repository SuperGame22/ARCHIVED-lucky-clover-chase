import { cn } from "@/lib/utils";
import cloverImage from "@/assets/clover-icon.png";

interface CloverIconProps {
  className?: string;
  animate?: boolean;
}

export const CloverIcon = ({ className, animate = false }: CloverIconProps) => (
  <img
    src={cloverImage}
    alt="Clover"
    className={cn(animate && "animate-float", className)}
  />
);
