import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { GoldCoinIcon } from "@/components/icons/GoldCoinIcon";
import { Zap, Wrench, ArrowUp, Sparkles, Clock, TrendingUp } from "lucide-react";

const GoldMachine = () => {
  const [potValue, setPotValue] = useState(4.72);
  const [generationRate, setGenerationRate] = useState(12);
  const [machineHealth, setMachineHealth] = useState(78);
  const [machineLevel, setMachineLevel] = useState(3);
  const [collecting, setCollecting] = useState(false);

  // Simulate gold generation
  useEffect(() => {
    const interval = setInterval(() => {
      setPotValue((prev) => prev + 0.001);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const collectFlakes = () => {
    setCollecting(true);
    setTimeout(() => {
      setPotValue(0);
      setCollecting(false);
    }, 1500);
  };

  const upgradeMachine = () => {
    if (potValue >= 5) {
      setPotValue((prev) => prev - 5);
      setMachineLevel((prev) => prev + 1);
      setGenerationRate((prev) => prev + 3);
    }
  };

  const maintainMachine = () => {
    if (potValue >= 1) {
      setPotValue((prev) => prev - 1);
      setMachineHealth(100);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-display font-bold">Gold Machine</h1>
          <p className="text-muted-foreground text-sm">Build wealth while you play</p>
        </motion.div>

        {/* Main Machine Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative glass-card p-8 overflow-hidden glow-gold"
        >
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute -right-20 -top-20 w-60 h-60 bg-accent/10 rounded-full blur-3xl"
          />

          <div className="relative text-center">
            {/* Animated Machine */}
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative mx-auto w-32 h-32 mb-6"
            >
              {/* Pot of gold */}
              <div className="w-full h-full bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500 rounded-3xl shadow-2xl flex items-center justify-center animate-pulse-glow">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <GoldCoinIcon className="w-16 h-16 text-amber-900" />
                </motion.div>
              </div>

              {/* Floating coins */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -20, 0],
                    x: [0, i === 1 ? 10 : -10, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.3,
                    repeat: Infinity,
                  }}
                  className="absolute"
                  style={{
                    top: `${20 + i * 15}%`,
                    left: `${10 + i * 30}%`,
                  }}
                >
                  <GoldCoinIcon className="w-6 h-6 text-accent" />
                </motion.div>
              ))}

              {/* Level badge */}
              <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                Lv.{machineLevel}
              </div>
            </motion.div>

            {/* Pot Value */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-1">Pot Value</p>
              <motion.div
                key={potValue.toFixed(2)}
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                className="flex items-baseline justify-center gap-1"
              >
                <span className="text-5xl font-display font-bold text-gradient-gold">
                  ${potValue.toFixed(2)}
                </span>
              </motion.div>
              <p className="text-sm text-accent mt-2">
                {(potValue * 1000).toFixed(0)}mg of gold flakes
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-muted/50 rounded-xl p-3">
                <div className="flex items-center justify-center gap-1 text-accent mb-1">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-medium">Generation</span>
                </div>
                <p className="text-xl font-bold">{generationRate} mg/hr</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-3">
                <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">Daily Max</span>
                </div>
                <p className="text-xl font-bold">{generationRate * 24}mg</p>
              </div>
            </div>

            {/* Health Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Machine Health</span>
                <span className={machineHealth > 60 ? "text-primary" : machineHealth > 30 ? "text-accent" : "text-destructive"}>
                  {machineHealth}%
                </span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${machineHealth}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-full rounded-full transition-colors ${
                    machineHealth > 60 ? "bg-primary" : machineHealth > 30 ? "bg-accent" : "bg-destructive"
                  }`}
                />
              </div>
              {machineHealth < 50 && (
                <p className="text-xs text-destructive mt-2">
                  ⚠️ Machine degrading! Maintain to avoid reduced output.
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="gold"
                size="lg"
                onClick={collectFlakes}
                disabled={potValue < 0.01 || collecting}
                className="relative overflow-hidden"
              >
                {collecting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Collect
                  </>
                )}
              </Button>
              <Button
                variant="glass"
                size="lg"
                onClick={maintainMachine}
                disabled={potValue < 1 || machineHealth === 100}
              >
                <Wrench className="w-5 h-5" />
                Maintain ($1)
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Upgrade Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="font-display font-semibold text-lg">Upgrade Machine</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
              <div className="flex items-center gap-3">
                <ArrowUp className="w-5 h-5 text-accent" />
                <div>
                  <p className="font-medium">Increase Capacity</p>
                  <p className="text-sm text-muted-foreground">+3 mg/hr generation</p>
                </div>
              </div>
              <Button
                variant="gold"
                size="sm"
                onClick={upgradeMachine}
                disabled={potValue < 5}
              >
                $5.00
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Educational Tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-primary/5 border border-primary/20 rounded-2xl p-4"
        >
          <p className="text-sm font-medium text-primary mb-1">💡 Gold Machine Wisdom</p>
          <p className="text-sm text-muted-foreground">
            Spend your gold flakes (income), not your gold machine (principal). 
            Upgrade your machine to build long-term wealth!
          </p>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default GoldMachine;
