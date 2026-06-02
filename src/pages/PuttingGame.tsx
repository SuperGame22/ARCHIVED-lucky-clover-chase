import React, { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const PuttingGame = () => {
  const [ball, setBall] = useState({ x: 50, y: 110, vx: 0, vy: 0 });
  const [hole, setHole] = useState({ x: 50, y: 25 });
  const [slope, setSlope] = useState({ sx: 0.05, sy: 0.02 });
  const [isRolling, setIsRolling] = useState(false);
  const [status, setStatus] = useState("PRACTICE MODE");
  const [practiceShots, setPracticeShots] = useState(1);

  const playSfx = (freq: number, duration: number = 0.1, type: "sine" | "square" | "triangle" = "sine") => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
      setTimeout(() => ctx.close(), duration * 1000 + 100);
    } catch (e) {}
  };

  useEffect(() => {
    if (!isRolling) return;
    const interval = setInterval(() => {
      setBall(prev => {
        const friction = 0.985;
        const vx = (prev.vx + slope.sx * 0.05) * friction;
        const vy = (prev.vy + slope.sy * 0.05) * friction;
        
        const nextX = prev.x + vx;
        const nextY = prev.y + vy;
        
        const dist = Math.hypot(nextX - hole.x, nextY - hole.y);
        const velocity = Math.hypot(vx, vy);

        if (dist < 3) {
          if (dist < 1.8 && velocity < 0.6) {
            setIsRolling(false);
            playSfx(400, 0.3, "triangle");
            setStatus("SUNK! +5 CLOVERS");
            return { x: hole.x, y: hole.y, vx: 0, vy: 0 };
          } else if (dist < 2.5 && velocity < 1.2) {
            const angle = Math.atan2(nextY - hole.y, nextX - hole.x);
            return { 
              ...prev, 
              vx: Math.cos(angle + 0.4) * velocity * 0.8, 
              vy: Math.sin(angle + 0.4) * velocity * 0.8 
            };
          }
        }

        if (nextX < 0 || nextX > 100 || nextY < 0 || nextY > 125) {
          setIsRolling(false);
          setStatus("OUT OF BOUNDS");
          return { ...prev, vx: 0, vy: 0 };
        }

        if (velocity < 0.01) {
          setIsRolling(false);
          setStatus(practiceShots > 0 ? "TRY AGAIN (PRACTICE)" : "STOPPED");
          return { ...prev, vx: 0, vy: 0 };
        }

        return { x: nextX, y: nextY, vx, vy };
      });
    }, 16);
    return () => clearInterval(interval);
  }, [isRolling, hole, slope, practiceShots]);

  const handleStrike = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isRolling) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 125;
    
    const dx = clickX - ball.x;
    const dy = clickY - ball.y;
    const angle = Math.atan2(dy, dx);
    const power = Math.min(Math.hypot(dx, dy) * 0.15, 4);
    
    setBall(p => ({ ...p, vx: Math.cos(angle) * power * -1, vy: Math.sin(angle) * power * -1 }));
    setIsRolling(true);
    playSfx(1000, 0.05, "square");
    if (practiceShots > 0) setPracticeShots(p => p - 1);
  };

  const reset = () => {
    setBall({ x: 50, y: 110, vx: 0, vy: 0 });
    setIsRolling(false);
    setStatus("PRACTICE MODE");
    setPracticeShots(1);
  };

  return (
    <AppLayout>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="max-w-lg mx-auto px-6 py-6 bg-black min-h-screen text-white font-sans flex flex-col"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-display font-black uppercase tracking-tighter italic text-green-500">Putting Pro</h1>
            <p className="text-white text-[10px] font-black uppercase tracking-widest opacity-70">{status}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={reset} className="hover:bg-green-900/30">
            <RefreshCw size={20} className="text-green-500" />
          </Button>
        </div>

        <div className="relative aspect-[4/5] glass-card overflow-hidden bg-[#0A2F10] border-2 border-green-800/30 rounded-3xl shadow-2xl">
          <svg className="w-full h-full" viewBox="0 0 100 125" preserveAspectRatio="xMidYMid meet">
            <rect width="100" height="125" fill="#1B5E20" />
            <path d="M 5,60 Q 5,5 50,5 Q 95,5 95,60 Q 95,120 50,120 Q 5,120 5,60" fill="#2E7D32" opacity="0.6" />
            
            {[...Array(13)].map((_, i) => (
              <path 
                key={`h-${i}`}
                d={`M 0 ${i*10} Q ${50+slope.sx*200} ${i*10+slope.sy*100} 100 ${i*10}`} 
                fill="none" stroke="white" strokeWidth="0.1" opacity="0.1" 
              />
            ))}
            {[...Array(11)].map((_, i) => (
              <path 
                key={`v-${i}`}
                d={`M ${i*10} 0 Q ${i*10+slope.sx*100} ${62.5+slope.sy*200} ${i*10} 125`} 
                fill="none" stroke="white" strokeWidth="0.1" opacity="0.1" 
              />
            ))}

            <circle cx={hole.x} cy={hole.y} r="3" fill="black" />
            <circle cx={hole.x} cy={hole.y} r="3.2" fill="none" stroke="#2E7D32" strokeWidth="0.5" opacity="0.5" />
            
            <motion.circle 
              cx={ball.x} cy={ball.y} r="1.6" fill="white" 
              style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.8))' }}
            />

            {!isRolling && (
              <line 
                x1={ball.x} y1={ball.y} x2={ball.x} y2={ball.y - 10} 
                stroke="white" strokeWidth="0.5" strokeDasharray="1,1" opacity="0.3" 
              />
            )}
          </svg>
          
          <div 
            className="absolute inset-0 z-10 cursor-crosshair" 
            onClick={handleStrike}
          />
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="glass-card p-3 text-center border-green-900/30">
            <p className="text-[8px] uppercase tracking-widest opacity-50">Practice Left</p>
            <p className="text-xl font-black text-green-500">{practiceShots}</p>
          </div>
          <div className="glass-card p-3 text-center border-green-900/30">
            <p className="text-[8px] uppercase tracking-widest opacity-50">Green Speed</p>
            <p className="text-xl font-black text-green-500">11.5</p>
          </div>
        </div>

        <p className="mt-auto pt-6 text-center text-[8px] font-bold uppercase tracking-[0.3em] opacity-20">
          Mechanical Physics Engine v14.2 • Perfect Circle Confirmed
        </p>
      </motion.div>
    </AppLayout>
  );
};

export default PuttingGame;