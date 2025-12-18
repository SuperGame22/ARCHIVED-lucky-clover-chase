import { Link } from "react-router-dom";
import { Wallet } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";

export const WalletBadge = () => {
  const { balance, isLoading } = useWallet();

  return (
    <Link
      to="/wallet"
      className="flex items-center gap-1.5 bg-primary/10 px-2.5 py-1 rounded-full hover:bg-primary/20 transition-colors"
    >
      <Wallet className="w-4 h-4 text-primary" />
      <span className="text-sm font-semibold text-primary">
        {isLoading ? "..." : `$${balance.toFixed(2)}`}
      </span>
    </Link>
  );
};