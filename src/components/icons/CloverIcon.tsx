import { cn } from "@/lib/utils";
import cloverGameIcon from "@/assets/clover-game-icon.png";

interface CloverIconProps {
  className?: string;
  animate?: boolean;
}

export const CloverIcon = ({ className, animate = false }: CloverIconProps) => (
  <img
    src={cloverGameIcon}
    alt="Clover"
    className={cn("aspect-[0.78]", animate && "animate-float", className)}
  />
);
