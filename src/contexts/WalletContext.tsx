import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "buy_in" | "winnings" | "purchase" | "refund";
  amount: number;
  description: string | null;
  created_at: string;
}

interface WalletContextType {
  balance: number;
  transactions: Transaction[];
  isLoading: boolean;
  refreshWallet: () => Promise<void>;
  addFunds: (amount: number, description?: string) => Promise<boolean>;
  deductFunds: (amount: number, type: "buy_in" | "purchase", description?: string) => Promise<boolean>;
  creditWinnings: (amount: number, description?: string) => Promise<boolean>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [walletId, setWalletId] = useState<string | null>(null);

  const refreshWallet = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setBalance(0);
        setTransactions([]);
        setIsLoading(false);
        return;
      }

      // Get wallet
      const { data: wallet, error: walletError } = await supabase
        .from("wallets")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (walletError && walletError.code !== "PGRST116") {
        console.error("Error fetching wallet:", walletError);
        return;
      }

      if (wallet) {
        setBalance(Number(wallet.balance));
        setWalletId(wallet.id);

        // Get transactions
        const { data: txns, error: txnError } = await supabase
          .from("transactions")
          .select("*")
          .eq("wallet_id", wallet.id)
          .order("created_at", { ascending: false })
          .limit(20);

        if (txnError) {
          console.error("Error fetching transactions:", txnError);
        } else {
          setTransactions(txns as Transaction[] || []);
        }
      }
    } catch (error) {
      console.error("Error refreshing wallet:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addFunds = async (amount: number, description = "Deposit"): Promise<boolean> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !walletId) {
        toast.error("Please sign in to add funds");
        return false;
      }

      // Use atomic database function to prevent race conditions
      const { data, error } = await supabase.rpc('add_wallet_funds', {
        p_wallet_id: walletId,
        p_user_id: user.id,
        p_amount: amount,
        p_description: description,
        p_transaction_type: 'deposit'
      });

      if (error) throw error;

      await refreshWallet();
      toast.success(`Added $${amount.toFixed(2)} to your wallet`);
      return true;
    } catch (error) {
      console.error("Error adding funds:", error);
      toast.error("Failed to add funds");
      return false;
    }
  };

  const deductFunds = async (
    amount: number, 
    type: "buy_in" | "purchase", 
    description?: string
  ): Promise<boolean> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !walletId) {
        toast.error("Please sign in");
        return false;
      }

      // Use atomic database function with row locking to prevent race conditions
      const { data, error } = await supabase.rpc('deduct_wallet_funds', {
        p_wallet_id: walletId,
        p_user_id: user.id,
        p_amount: amount,
        p_description: description || (type === "buy_in" ? "Competition buy-in" : "Purchase"),
        p_transaction_type: type
      });

      if (error) {
        if (error.message.includes("Insufficient funds")) {
          toast.error("Insufficient funds");
        } else {
          toast.error("Transaction failed");
        }
        console.error("Error deducting funds:", error);
        return false;
      }

      await refreshWallet();
      return true;
    } catch (error) {
      console.error("Error deducting funds:", error);
      toast.error("Transaction failed");
      return false;
    }
  };

  const creditWinnings = async (amount: number, description = "Competition winnings"): Promise<boolean> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !walletId) return false;

      // Use atomic database function to prevent race conditions
      const { data, error } = await supabase.rpc('add_wallet_funds', {
        p_wallet_id: walletId,
        p_user_id: user.id,
        p_amount: amount,
        p_description: description,
        p_transaction_type: 'winnings'
      });

      if (error) throw error;

      await refreshWallet();
      toast.success(`You won $${amount.toFixed(2)}! 🏆`);
      return true;
    } catch (error) {
      console.error("Error crediting winnings:", error);
      return false;
    }
  };

  useEffect(() => {
    refreshWallet();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      refreshWallet();
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <WalletContext.Provider
      value={{
        balance,
        transactions,
        isLoading,
        refreshWallet,
        addFunds,
        deductFunds,
        creditWinnings,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};