import { createContext, useContext, useState, ReactNode, useCallback, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CloverContextType {
  cloverBalance: number;
  litLeaves: number;
  earnedPulse: number;
  isLoading: boolean;
  triggerSpend: (amount: number) => Promise<void>;
  refreshBalance: () => Promise<void>;
}

const CloverContext = createContext<CloverContextType | undefined>(undefined);

export const useClover = () => {
  const context = useContext(CloverContext);
  if (!context) {
    throw new Error("useClover must be used within a CloverProvider");
  }
  return context;
};

interface CloverProviderProps {
  children: ReactNode;
}

export const CloverProvider = ({ children }: CloverProviderProps) => {
  const [cloverBalance, setCloverBalance] = useState(0);
  const [litLeaves, setLitLeaves] = useState(0);
  const [pendingDollars, setPendingDollars] = useState(0);
  const [earnedPulse, setEarnedPulse] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const isAnimatingRef = useRef(false);

  // Fetch clover balance from database
  const refreshBalance = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setCloverBalance(0);
        setIsLoading(false);
        return;
      }

      const { data: wallet, error } = await supabase
        .from("wallets")
        .select("clover_balance")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;
      setCloverBalance(wallet?.clover_balance ?? 0);
    } catch (error) {
      console.error("Error fetching clover balance:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load balance on mount and auth changes
  useEffect(() => {
    refreshBalance();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      refreshBalance();
    });

    return () => subscription.unsubscribe();
  }, [refreshBalance]);

  // Call RPC to award clovers and trigger animation
  const triggerSpend = useCallback(async (amount: number) => {
    if (amount <= 0) return;

    // Start the visual animation immediately
    setPendingDollars(prev => prev + Math.floor(amount));

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in to earn clovers");
        return;
      }

      // Call the award_clovers RPC
      const { data, error } = await supabase.rpc("award_clovers", {
        p_user_id: user.id,
        p_amount: amount,
      });

      if (error) throw error;

      const result = data as { success: boolean; clovers_awarded?: number; new_balance?: number; error?: string };
      
      if (result.success && result.new_balance !== undefined) {
        // Update local balance to match database after animation completes
        setTimeout(() => {
          setCloverBalance(result.new_balance!);
        }, Math.floor(amount) * 120 + 200);
      }
    } catch (error) {
      console.error("Error awarding clovers:", error);
      toast.error("Failed to award clovers");
    }
  }, []);

  // Animation effect - processes pending dollars one at a time (visual only)
  useEffect(() => {
    if (pendingDollars <= 0 || isAnimatingRef.current) return;

    isAnimatingRef.current = true;

    const interval = setInterval(() => {
      setPendingDollars(prev => {
        if (prev <= 0) {
          clearInterval(interval);
          isAnimatingRef.current = false;
          return 0;
        }

        setLitLeaves(currentLeaves => {
          const nextLeaf = currentLeaves + 1;
          
          if (nextLeaf > 4) {
            // Visual pulse when completing a cycle
            setEarnedPulse(p => p + 1);
            return 1;
          }
          
          return nextLeaf;
        });

        return prev - 1;
      });
    }, 120);

    return () => {
      clearInterval(interval);
      isAnimatingRef.current = false;
    };
  }, [pendingDollars]);

  return (
    <CloverContext.Provider
      value={{
        cloverBalance,
        litLeaves,
        earnedPulse,
        isLoading,
        triggerSpend,
        refreshBalance,
      }}
    >
      {children}
    </CloverContext.Provider>
  );
};
