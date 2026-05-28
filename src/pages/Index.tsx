import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Target, Sparkles, Compass } from "lucide-react";

const Index = () => {
  const clovers = 1250;
  const cloverImg = "https://customer-assets.emergentagent.com/wingman/16a3f2f5-ecf1-454b-9fc4-22f4a2877583/attachments/f295ff82ce6342c0a141e04637ac8ee7_Untitled%20(2000%20x%202000%20px)%20(2).png";

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <div className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-4">
          <img src={cloverImg} className="w-16 h-16" alt="Clover" />
          <div>
             <p className="text-[10px] text-green-500 font-black uppercase tracking-widest">Balance</p>
             <h2 className="text-6xl font-black italic tracking-tighter text-white leading-none">{clovers}</h2>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full border-2 border-green-500 overflow-hidden bg-zinc-800"></div>
      </div>

      <h1 className="text-4xl font-black uppercase tracking-tighter mb-8 italic">Drive the Ball</h1>

      <div className="space-y-4">
        <Link to="/practice/putting">
          <div className="bg-zinc-900 border border-green-900 p-6 rounded-2xl flex justify-between items-center active:scale-95 transition-all group">
            <div>
              <h3 className="text-xl font-black uppercase tracking-tighter italic">Putting Pro</h3>
              <p className="text-green-500 text-[10px] font-bold uppercase tracking-widest">Master your stroke · +5 Clovers</p>
            </div>
            <Target className="text-green-500 group-hover:scale-125 transition-transform" size={32} />
          </div>
        </Link>

        <Link to="/practice/rangefinder">
          <div className="bg-zinc-900 border border-green-900 p-6 rounded-2xl flex justify-between items-center active:scale-95 transition-all group">
            <div>
              <h3 className="text-xl font-black uppercase tracking-tighter italic">Rangefinder</h3>
              <p className="text-green-500 text-[10px] font-bold uppercase tracking-widest">AR Monocle · Precision Distance</p>
            </div>
            <Compass className="text-green-500 group-hover:scale-125 transition-transform" size={32} />
          </div>
        </Link>

        <Link to="/coach">
          <div className="bg-zinc-900 border border-green-900 p-6 rounded-2xl flex justify-between items-center active:scale-95 transition-all group">
            <div>
              <h3 className="text-xl font-black uppercase tracking-tighter italic">Lucky Coach</h3>
              <p className="text-green-500 text-[10px] font-bold uppercase tracking-widest">AI Coaches · Pro Support</p>
            </div>
            <Sparkles className="text-green-500 group-hover:scale-125 transition-transform" size={32} />
          </div>
        </Link>
      </div>

      <div className="mt-12">
        <button className="w-full bg-green-500 text-black font-black uppercase py-5 rounded-2xl text-xl italic tracking-tighter flex items-center justify-center gap-3 active:scale-95 transition-transform">
          Play Lucky Wagers <ArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Index;