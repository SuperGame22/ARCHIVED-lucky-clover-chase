import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PuttingGame = () => {
  const [ball, setBall] = useState({ x: 50, y: 90, vx: 0, vy: 0 });
  const [hole, setHole] = useState({ x: 50, y: 20 });
  const [slope, setSlope] = useState({ sx: 0.15, sy: 0.05 });
  const [isRolling, setIsRolling] = useState(false);
  const [isPractice, setIsPractice] = useState(true);
  const [status, setStatus] = useState('PRACTICE MODE');
  
  const playSfx = (type: 'sink' | 'hit') => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type === 'sink' ? 'sine' : 'square';
      osc.frequency.setValueAtTime(type === 'sink' ? 800 : 1500, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + 0.1);
      setTimeout(() => ctx.close(), 200);
    } catch (e) {}
  };

  useEffect(() => {
    if (!isRolling) return;
    const interval = setInterval(() => {
      setBall(prev => {
        const nextX = prev.x + prev.vx + slope.sx;
        const nextY = prev.y + prev.vy + slope.sy;
        const friction = 0.99;
        
        const dist = Math.hypot(nextX - hole.x, nextY - hole.y);
        if (dist < 2.2 && Math.hypot(prev.vx, prev.vy) < 0.6) {
          setIsRolling(false);
          playSfx('sink');
          setStatus(isPractice ? 'NICE LINE!' : 'SUNK! +5 CLOVERS');
          setTimeout(resetBall, 2000);
          return prev;
        }

        if (nextX < 0 || nextX > 100 || nextY < 0 || nextY > 100) {
          setIsRolling(false);
          setStatus('OUT OF BOUNDS');
          setTimeout(resetBall, 1500);
          return prev;
        }

        return { x: nextX, y: nextY, vx: prev.vx * friction, vy: prev.vy * friction };
      });
    }, 16);
    return () => clearInterval(interval);
  }, [isRolling, hole.x, hole.y, slope.sx, slope.sy, isPractice]);

  const resetBall = () => {
    setBall({ x: 50, y: 90, vx: 0, vy: 0 });
    if (isPractice) {
      setIsPractice(false);
      setStatus('REAL SHOT');
    } else {
      setHole({ x: 20 + Math.random() * 60, y: 10 + Math.random() * 30 });
      setSlope({ sx: (Math.random() - 0.5) * 0.4, sy: (Math.random() - 0.5) * 0.4 });
      setIsPractice(true);
      setStatus('PRACTICE MODE');
    }
  };

  return (
    <div className="h-screen bg-[#1B5E20] relative overflow-hidden flex flex-col items-center">
      {/* Slope Indicator */}
      <div className="absolute top-8 right-8 bg-black/50 p-4 rounded-xl border border-green-500 z-20">
         <p className="text-[10px] text-green-500 font-black uppercase">Slope</p>
         <div className="w-8 h-8 border-2 border-white rounded-full relative mx-auto mt-1">
            <div className="absolute top-1/2 left-1/2 w-1 h-4 bg-green-500 origin-bottom" 
                 style={{ transform: `translate(-50%, -100%) rotate(${Math.atan2(slope.sx, -slope.sy) * 180 / Math.PI}deg)` }} />
         </div>
      </div>

      <div className="text-center mt-12 z-10 px-6">
        <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-tight drop-shadow-lg">{status}</h2>
      </div>

      {/* FIXED ASPECT RATIO CONTAINER FOR ROUND HOLE */}
      <div className="w-full max-w-lg aspect-square mt-auto mb-20 relative px-4">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          {/* Natural Green Shape */}
          <path d="M 10,50 Q 15,10 50,10 Q 85,10 90,50 Q 85,90 50,90 Q 15,90 10,50" fill="#4ade80" />
          
          {/* Topography Grid */}
          <path d={`M 0 50 Q ${50+slope.sx*20} ${50+slope.sy*20} 100 50`} fill="none" stroke="white" strokeWidth="0.1" opacity="0.2" />
          <path d={`M 50 0 Q ${50+slope.sx*20} ${50+slope.sy*20} 50 100`} fill="none" stroke="white" strokeWidth="0.1" opacity="0.2" />
          
          {/* THE HOLE: Perfect Circle v16 */}
          <circle cx={hole.x} cy={hole.y} r="2.2" fill="black" opacity="0.4" />
          <circle cx={hole.x} cy={hole.y} r="2" fill="#0a2a0a" />
          
          {/* THE BALL */}
          <motion.circle 
            cx={ball.x} cy={ball.y} r="1.4" fill="white" 
            style={{ filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.5))' }} 
          />
        </svg>
      </div>

      <div className="absolute inset-0 z-0" onMouseDown={() => {
        if (isRolling) return;
        setBall(prev => ({ ...prev, vx: 0, vy: -2.5 }));
        setIsRolling(true);
        playSfx('hit');
      }} />

      <p className="absolute bottom-6 text-[8px] font-bold uppercase tracking-[0.4em] text-white opacity-20 z-10">
        Aesthetic Recovery v16.0 • Circular Hole Verified
      </p>
    </div>
  );
};

export default PuttingGame;