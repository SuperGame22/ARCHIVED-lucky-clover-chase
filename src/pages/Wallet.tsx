import { motion } from "framer-motion";
import { Wallet, Plus, ArrowUpRight, ArrowDownLeft, Trophy, ShoppingBag, RefreshCw } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "sonner";

const transactionIcons = {
  deposit: ArrowDownLeft,
  withdrawal: ArrowUpRight,
  buy_in: ArrowUpRight,
  winnings: Trophy,
  purchase: ShoppingBag,
  refund: ArrowDownLeft,
};

const transactionColors = {
  deposit: "text-primary",
  withdrawal: "text-destructive",
  buy_in: "text-destructive",
  winnings: "text-accent",
  purchase: "text-muted-foreground",
  refund: "text-primary",
};

export default function WalletPage() {
  const { balance, transactions, isLoading, addFunds } = useWallet();

  const handleAddFunds = async () => {
    // For testing without Stripe - add $20
    const success = await addFunds(20, "Test deposit");
    if (!success) {
      toast.info("Connect Stripe to add real funds");
    }
  };

  return (
    <AppLayout>
      <div className="p-4 pb-24 max-w-lg mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-2xl font-bold">Wallet</h1>
          <p className="text-muted-foreground text-sm">Your competition balance</p>
        </motion.div>

        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-muted/50 px-3 py-1 rounded-full mb-4">
              <Wallet className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Available Balance</span>
            </div>
            
            <div className="text-5xl font-display font-bold text-gradient-gold mb-2">
              ${balance.toFixed(2)}
            </div>
            
            <p className="text-sm text-muted-foreground mb-6">
              Use for competition buy-ins & shop purchases
            </p>

            <Button variant="lucky" size="lg" onClick={handleAddFunds} className="gap-2">
              <Plus className="w-5 h-5" />
              Add Funds
            </Button>
          </div>
        </motion.div>

        {/* Transaction History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold">Recent Activity</h2>
            <Button variant="ghost" size="sm" className="text-xs gap-1">
              <RefreshCw className="w-3 h-3" />
              Refresh
            </Button>
          </div>

          {isLoading ? (
            <div className="glass-card p-8 text-center">
              <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto" />
            </div>
          ) : transactions.length === 0 ? (
            <div className="glass-card p-8 text-center">
              <Wallet className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">No transactions yet</p>
              <p className="text-sm text-muted-foreground/70 mt-1">
                Add funds to join competitions
              </p>
            </div>
          ) : (
            <div className="glass-card divide-y divide-border">
              {transactions.map((txn, index) => {
                const Icon = transactionIcons[txn.type];
                const colorClass = transactionColors[txn.type];
                const isPositive = txn.amount > 0;

                return (
                  <motion.div
                    key={txn.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full bg-muted ${colorClass}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">
                          {txn.description || txn.type.replace("_", " ")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(txn.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span className={`font-semibold ${isPositive ? "text-primary" : "text-foreground"}`}>
                      {isPositive ? "+" : ""}${Math.abs(txn.amount).toFixed(2)}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-4 bg-primary/5 border-primary/20"
        >
          <p className="text-sm text-muted-foreground">
            💡 <strong className="text-foreground">Tip:</strong> Winnings from competitions are automatically added to your wallet. Use your balance for future buy-ins or shop purchases.
          </p>
        </motion.div>
      </div>
    </AppLayout>
  );
}