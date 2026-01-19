import { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface CloverContextType {
  cloverBalance: number;
  litLeaves: number;
  spendAmount: number;
  triggerSpend: (amount: number) => void;
  addClovers: (count: number) => void;
  setLitLeaves: (count: number) => void;
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
  const [spendAmount, setSpendAmount] = useState(0);

  const triggerSpend = useCallback((amount: number) => {
    // Set the spend amount - SpendClover will pick this up
    setSpendAmount(prev => prev + amount);
  }, []);

  const addClovers = useCallback((count: number) => {
    setCloverBalance(prev => prev + count);
  }, []);

  const handleSetLitLeaves = useCallback((count: number) => {
    setLitLeaves(count);
  }, []);

  return (
    <CloverContext.Provider
      value={{
        cloverBalance,
        litLeaves,
        spendAmount,
        triggerSpend,
        addClovers,
        setLitLeaves: handleSetLitLeaves,
      }}
    >
      {children}
    </CloverContext.Provider>
  );
};
