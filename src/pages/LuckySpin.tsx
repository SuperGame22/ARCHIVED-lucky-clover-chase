import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { CloverIcon } from "@/components/icons/CloverIcon";
import { SpendClover } from "@/components/icons/SpendClover";
import { WeeklyRaffle } from "@/components/lucky/WeeklyRaffle";
import { useClover } from "@/contexts/CloverContext";
import { Gift, Clock, MapPin, Ticket, Star, Sparkles, RotateCcw, Shirt } from "lucide-react";

// Doubled the prizes with new items
const prizes = [
  { label: "Tee Time", color: "from-primary to-lucky-emerald", icon: Clock, rare: true },
  { label: "50% Off", color: "from-accent to-amber-600", icon: Ticket },
  { label: "+5 Clovers", color: "from-green-500 to-emerald-600", icon: CloverIcon },
  { label: "Polo Shirt", color: "from-blue-600 to-indigo-600", icon: Shirt, rare: true },
  { label: "25% Off", color: "from-blue-500 to-cyan-500", icon: Ticket },
  { label: "+10 Clovers", color: "from-primary to-lucky-green-light", icon: CloverIcon },
  { label: "Putter", color: "from-slate-500 to-zinc-600", icon: Gift, rare: true },
  { label: "+1 Clover", color: "from-gray-500 to-gray-600", icon: CloverIcon },
  { label: "Free Hat", color: "from-purple-500 to-pink-500", icon: Gift },
  { label: "Wedge", color: "from-orange-500 to-amber-600", icon: Gift, rare: true },
  { label: "Golf Balls", color: "from-orange-500 to-red-500", icon: Gift },
  { label: "+3 Clovers", color: "from-emerald-500 to-teal-600", icon: CloverIcon },
  { label: "Driver", color: "from-violet-600 to-purple-700", icon: Gift, rare: true },
  { label: "15% Off", color: "from-teal-500 to-cyan-600", icon: Ticket },
  { label: "Glove", color: "from-rose-500 to-pink-600", icon: Gift },
  { label: "+2 Clovers", color: "from-lime-500 to-green-600", icon: CloverIcon },
];

const LuckySpin = () => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<typeof prizes[0] | null>(null);
  const [spinsRemaining, setSpinsRemaining] = useState(3);
  const [canRespin, setCanRespin] = useState(false);
  const weeklyCloverCount = 12;
  
  // Use shared clover context
  const { cloverBalance, triggerSpend, addClovers, litLeaves, setLitLeaves } = useClover();

  const spin = () => {
    if (spinning || spinsRemaining <= 0) return;

    setSpinning(true);
    setResult(null);
    setCanRespin(false);
    
    // Trigger the $7 spend animation through context
    triggerSpend(7);

    // Random result calculation
    const prizeIndex = Math.floor(Math.random() * prizes.length);
    const segmentAngle = 360 / prizes.length;
    // Adjust so the prize lands at the top pointer position
    const targetRotation = 360 * 5 + (360 - (prizeIndex * segmentAngle) - segmentAngle / 2);

    setRotation((prev) => prev + targetRotation);

    setTimeout(() => {
      setSpinning(false);
      setResult(prizes[prizeIndex]);
      setSpinsRemaining((prev) => prev - 1);
      // Allow respin for non-rare prizes if spins remain
      if (!prizes[prizeIndex].rare && spinsRemaining > 1) {
        setCanRespin(true);
      }
    }, 4000);
  };

  const handleCloverEarned = () => {
    addClovers(1);
  };

  const respin = () => {
    if (!canRespin || spinsRemaining <= 0) return;
    setCanRespin(false);
    setResult(null);
    spin();
  };

  return (
    <AppLayout>
      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Header with SpendClover showing global balance */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <SpendClover 
              className="w-12 h-12" 
              totalClovers={cloverBalance}
              onCloverEarned={handleCloverEarned}
              onLitLeavesChange={setLitLeaves}
              externalLitLeaves={litLeaves}
            />
            <h1 className="text-3xl font-display font-bold">Lucky Tees</h1>
            <span className="text-2xl font-bold text-primary">{cloverBalance}</span>
          </div>
          <p className="text-muted-foreground">Spin for discounted tee times & prizes!</p>
        </motion.div>

        {/* Spin Wheel - Made larger */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative flex items-center justify-center py-6"
        >
          {/* Outer glow */}
          <div className="absolute w-[26rem] h-[26rem] bg-gradient-to-r from-primary via-accent to-primary rounded-full blur-3xl opacity-30 animate-pulse" />

          {/* Wheel */}
          <div className="relative">
            {/* Pointer */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
              <div className="w-0 h-0 border-l-[18px] border-r-[18px] border-t-[30px] border-l-transparent border-r-transparent border-t-accent drop-shadow-lg" />
            </div>

            {/* Spinning wheel - now 96 (24rem / 384px) */}
            <motion.div
              animate={{ rotate: rotation }}
              transition={{ duration: 4, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative w-96 h-96"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
                {prizes.map((prize, i) => {
                  const angle = (360 / prizes.length) * i;
                  const startAngle = (angle - 90) * (Math.PI / 180);
                  const endAngle = (angle + 360 / prizes.length - 90) * (Math.PI / 180);
                  const largeArcFlag = 360 / prizes.length > 180 ? 1 : 0;

                  const x1 = 50 + 50 * Math.cos(startAngle);
                  const y1 = 50 + 50 * Math.sin(startAngle);
                  const x2 = 50 + 50 * Math.cos(endAngle);
                  const y2 = 50 + 50 * Math.sin(endAngle);

                  return (
                    <path
                      key={i}
                      d={`M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                      className={`fill-current ${
                        prize.rare 
                          ? "text-accent/80" 
                          : i % 2 === 0 
                            ? "text-card" 
                            : "text-muted"
                      }`}
                      stroke="hsl(var(--border))"
                      strokeWidth="0.3"
                    />
                  );
                })}
                {/* Center circle */}
                <circle cx="50" cy="50" r="10" className="fill-primary" />
                <circle cx="50" cy="50" r="6" className="fill-background" />
              </svg>

              {/* Prize labels */}
              {prizes.map((prize, i) => {
                const angle = (360 / prizes.length) * i + 360 / prizes.length / 2 - 90;
                const radians = angle * (Math.PI / 180);
                const x = 50 + 35 * Math.cos(radians);
                const y = 50 + 35 * Math.sin(radians);

                return (
                  <div
                    key={i}
                    className={`absolute text-[8px] font-bold ${prize.rare ? "text-accent-foreground" : "text-foreground"}`}
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: `translate(-50%, -50%) rotate(${angle + 90}deg)`,
                    }}
                  >
                    {prize.label}
                  </div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>

        {/* Result Display */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card p-6 text-center glow-gold"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ delay: 0.2 }}
                className="mb-4"
              >
                <Sparkles className="w-12 h-12 text-accent mx-auto" />
              </motion.div>
              <h3 className="text-2xl font-display font-bold text-gradient-gold mb-2">
                You Won!
              </h3>
              <p className="text-xl font-semibold">{result.label}</p>
              {result.rare && (
                <div className="flex items-center justify-center gap-1 mt-2 text-accent">
                  <Star className="w-4 h-4" />
                  <span className="text-sm font-medium">RARE PRIZE!</span>
                </div>
              )}
              
              {/* Respin option */}
              {canRespin && spinsRemaining > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 pt-4 border-t border-border"
                >
                  <p className="text-sm text-muted-foreground mb-3">Not happy? Use a spin to try again!</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={respin}
                    className="gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Re-spin ({spinsRemaining} left)
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Spin Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            variant="gold"
            size="xl"
            className="w-full"
            onClick={spin}
            disabled={spinning || spinsRemaining <= 0}
          >
            {spinning ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <CloverIcon className="w-6 h-6" />
              </motion.div>
            ) : (
              <>
                <Gift className="w-6 h-6" />
                Spin for $7
              </>
            )}
          </Button>
          <p className="text-center text-sm text-muted-foreground mt-2">
            {spinsRemaining > 0
              ? `${spinsRemaining} spin${spinsRemaining > 1 ? 's' : ''} available!`
              : "Purchase more spins to continue"}
          </p>
        </motion.div>

        {/* Weekly Raffle */}
        <WeeklyRaffle weeklyCloverCount={weeklyCloverCount} />

        {/* Recent Wins */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-5"
        >
          <h3 className="font-display font-semibold text-lg mb-4">Recent Winners</h3>
          <div className="space-y-3">
            {[
              { name: "Mike T.", prize: "Driver", time: "1 min ago" },
              { name: "Sarah L.", prize: "Polo Shirt", time: "3 min ago" },
              { name: "John D.", prize: "50% Off Gear", time: "8 min ago" },
              { name: "Emma R.", prize: "Putter", time: "15 min ago" },
            ].map((winner, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {winner.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{winner.name}</p>
                    <p className="text-xs text-muted-foreground">{winner.prize}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{winner.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Nearby Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-primary" />
            <h3 className="font-display font-semibold text-lg">Available Tee Times</h3>
          </div>
          <div className="space-y-3">
            {[
              { course: "Pebble Beach", distance: "2.4 mi", times: 3 },
              { course: "Torrey Pines", distance: "8.1 mi", times: 5 },
              { course: "Spanish Bay", distance: "3.2 mi", times: 2 },
            ].map((course, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-xl"
              >
                <div>
                  <p className="font-medium">{course.course}</p>
                  <p className="text-sm text-muted-foreground">{course.distance}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-accent">{course.times} times</p>
                  <p className="text-xs text-muted-foreground">in jackpot</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default LuckySpin;