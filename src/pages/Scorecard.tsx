import { useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { CloverIcon } from "@/components/icons/CloverIcon";
import { Flag, Plus, Minus, Check, MapPin } from "lucide-react";

const holes = Array.from({ length: 9 }, (_, i) => ({
  number: i + 1,
  par: [4, 3, 5, 4, 4, 3, 5, 4, 4][i],
  distance: [380, 165, 520, 410, 395, 185, 545, 425, 405][i],
}));

const Scorecard = () => {
  const [scores, setScores] = useState<Record<number, number>>({});
  const [activeHole, setActiveHole] = useState(1);

  const updateScore = (hole: number, delta: number) => {
    setScores((prev) => ({
      ...prev,
      [hole]: Math.max(1, (prev[hole] || holes[hole - 1].par) + delta),
    }));
  };

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const totalPar = holes.reduce((a, h) => a + h.par, 0);
  const scoreDiff = totalScore - totalPar;

  return (
    <AppLayout>
      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-display font-bold">Scorecard</h1>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Pebble Beach - Front 9</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-display font-bold">
              {totalScore > 0 ? totalScore : "--"}
            </p>
            <p
              className={`text-sm font-medium ${
                scoreDiff > 0
                  ? "text-destructive"
                  : scoreDiff < 0
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {scoreDiff > 0 ? `+${scoreDiff}` : scoreDiff < 0 ? scoreDiff : "E"}
            </p>
          </div>
        </motion.div>

        {/* Quick Score Entry */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-6 glow-green"
        >
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Flag className="w-5 h-5 text-primary" />
              <span className="text-lg font-medium">Hole {activeHole}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Par {holes[activeHole - 1].par} • {holes[activeHole - 1].distance} yds
            </p>
          </div>

          <div className="flex items-center justify-center gap-6">
            <Button
              variant="outline"
              size="icon"
              className="w-14 h-14 rounded-full"
              onClick={() => updateScore(activeHole, -1)}
            >
              <Minus className="w-6 h-6" />
            </Button>

            <div className="text-center">
              <span className="text-6xl font-display font-bold">
                {scores[activeHole] || holes[activeHole - 1].par}
              </span>
            </div>

            <Button
              variant="outline"
              size="icon"
              className="w-14 h-14 rounded-full"
              onClick={() => updateScore(activeHole, 1)}
            >
              <Plus className="w-6 h-6" />
            </Button>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            <Button
              variant="glass"
              onClick={() => setActiveHole(Math.max(1, activeHole - 1))}
              disabled={activeHole === 1}
            >
              Previous
            </Button>
            <Button
              variant="lucky"
              onClick={() => {
                if (!scores[activeHole]) {
                  setScores((prev) => ({
                    ...prev,
                    [activeHole]: holes[activeHole - 1].par,
                  }));
                }
                if (activeHole < 9) {
                  setActiveHole(activeHole + 1);
                }
              }}
            >
              <Check className="w-4 h-4" />
              {activeHole < 9 ? "Next Hole" : "Finish"}
            </Button>
          </div>
        </motion.div>

        {/* Hole Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-4"
        >
          <div className="grid grid-cols-9 gap-1 text-center text-xs mb-2">
            {holes.map((hole) => (
              <div key={hole.number} className="text-muted-foreground">
                {hole.number}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-9 gap-1 text-center text-xs mb-2">
            {holes.map((hole) => (
              <div key={hole.number} className="text-muted-foreground">
                {hole.par}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-9 gap-1">
            {holes.map((hole) => {
              const score = scores[hole.number];
              const diff = score ? score - hole.par : 0;
              return (
                <button
                  key={hole.number}
                  onClick={() => setActiveHole(hole.number)}
                  className={`aspect-square rounded-lg flex items-center justify-center text-sm font-bold transition-all ${
                    activeHole === hole.number
                      ? "ring-2 ring-primary"
                      : ""
                  } ${
                    !score
                      ? "bg-muted text-muted-foreground"
                      : diff < 0
                      ? "bg-primary/20 text-primary"
                      : diff > 0
                      ? "bg-destructive/20 text-destructive"
                      : "bg-accent/20 text-accent"
                  }`}
                >
                  {score || "-"}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Clover Reward Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex items-center gap-4"
        >
          <CloverIcon className="w-10 h-10 text-primary" />
          <div>
            <p className="font-medium">Complete your round</p>
            <p className="text-sm text-muted-foreground">
              Earn <span className="text-primary font-bold">+5 clovers</span> for finishing!
            </p>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Scorecard;
