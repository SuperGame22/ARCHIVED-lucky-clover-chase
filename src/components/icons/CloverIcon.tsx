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
    <path d="M12 2C10.5 2 9 3.5 9 5C9 6.5 10 7.5 11 8C10 8.5 9 9.5 9 11C9 12.5 10.5 14 12 14C13.5 14 15 12.5 15 11C15 9.5 14 8.5 13 8C14 7.5 15 6.5 15 5C15 3.5 13.5 2 12 2Z" />
    <path d="M5 9C3.5 9 2 10.5 2 12C2 13.5 3.5 15 5 15C6.5 15 7.5 14 8 13C8.5 14 9.5 15 11 15C12.5 15 14 13.5 14 12C14 10.5 12.5 9 11 9C9.5 9 8.5 10 8 11C7.5 10 6.5 9 5 9Z" />
    <path d="M19 9C17.5 9 16.5 10 16 11C15.5 10 14.5 9 13 9C11.5 9 10 10.5 10 12C10 13.5 11.5 15 13 15C14.5 15 15.5 14 16 13C16.5 14 17.5 15 19 15C20.5 15 22 13.5 22 12C22 10.5 20.5 9 19 9Z" />
    <path d="M12 10C10.5 10 9 11.5 9 13C9 14.5 10 15.5 11 16C10 16.5 9 17.5 9 19C9 20.5 10.5 22 12 22C13.5 22 15 20.5 15 19C15 17.5 14 16.5 13 16C14 15.5 15 14.5 15 13C15 11.5 13.5 10 12 10Z" />
    <rect x="11" y="20" width="2" height="4" rx="1" />
  </svg>
);
