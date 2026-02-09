import { motion } from "framer-motion";
import { CloverIcon } from "@/components/icons/CloverIcon";

interface CloverCreditBannerProps {
  clovers: number;
}

export const CloverCreditBanner = ({ clovers }: CloverCreditBannerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-primary/15 via-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-4 flex items-center justify-between"
    >
      <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Available Credit</p>
          <p className="text-3xl font-bold text-white">${(clovers * 0.25).toFixed(2)}</p>
      </div>
      <div className="text-right">
        <p className="text-3xl font-bold">{clovers}</p>
        <p className="text-xs text-muted-foreground">clovers</p>
      </div>
    </motion.div>
  );
};
