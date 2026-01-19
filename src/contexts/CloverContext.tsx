import { createContext, useContext, useState, ReactNode, useCallback, useEffect, useRef } from "react";

interface CloverContextType {
  cloverBalance: number;
  litLeaves: number;
  earnedPulse: number;
  triggerSpend: (amount: number) => void;
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
  initialBalance?: number;
}

export const CloverProvider = ({ children, initialBalance = 47 }: CloverProviderProps) => {
  const [cloverBalance, setCloverBalance] = useState(initialBalance);
  const [litLeaves, setLitLeaves] = useState(0);
  const [pendingDollars, setPendingDollars] = useState(0);
  const [earnedPulse, setEarnedPulse] = useState(0);
  const isAnimatingRef = useRef(false);

  const triggerSpend = useCallback((amount: number) => {
    setPendingDollars(prev => prev + amount);
  }, []);

  // Animation effect - processes pending dollars one at a time
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
          // Each dollar lights the next leaf (1 -> 2 -> 3 -> 4)
          const nextLeaf = currentLeaves + 1;
          
          if (nextLeaf >= 4) {
            // Completed a full cycle - earn a clover
            setCloverBalance(bal => bal + 1);
            setEarnedPulse(p => p + 1);
            // Reset to 0 after earning
            return 0;
          }
          
          return nextLeaf;
        });

        return prev - 1;
      });
    }, 120); // Slightly slower for better visibility

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
        triggerSpend,
      }}
    >
      {children}
    </CloverContext.Provider>
  );
};
