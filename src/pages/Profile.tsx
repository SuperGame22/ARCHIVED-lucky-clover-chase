import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Camera, Settings, MessageSquare, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const cloverImg = "https://customer-assets.emergentagent.com/wingman/16a3f2f5-ecf1-454b-9fc4-22f4a2877583/attachments/f295ff82ce6342c0a141e04637ac8ee7_Untitled%20(2000%20x%202000%20px)%20(2).png";

  return (
    <div className="flex flex-col items-center p-6 pb-24 bg-black min-h-screen text-white">
      <div className="w-full flex justify-between items-center mb-8 pt-4">
        <Settings className="text-zinc-600" />
        <h2 className="text-xs font-black uppercase tracking-[0.3em]">Clover Club</h2>
        <div className="w-6 h-6"></div>
      </div>

      <div className="relative group">
        <div className="h-32 w-32 rounded-full border-4 border-green-500 overflow-hidden bg-zinc-900 flex items-center justify-center text-5xl font-black text-white italic">
           {avatar ? <img src={avatar} className="w-full h-full object-cover" alt="avatar" /> : "JD"}
        </div>
        <label className="absolute bottom-0 right-0 bg-green-500 p-2 rounded-full cursor-pointer hover:scale-110 transition-transform">
          <Camera size={16} className="text-black" />
          <input type="file" className="hidden" onChange={(e) => e.target.files && setAvatar(URL.createObjectURL(e.target.files[0]))} />
        </label>
      </div>

      <h1 className="text-3xl font-black uppercase mt-6 tracking-tighter italic">John Doe</h1>
      <p className="text-green-500 text-[10px] font-black uppercase tracking-widest mt-2">Gold Member · Level 1</p>

      <div className="w-full bg-zinc-900 border border-green-900/30 p-4 rounded-3xl mt-8 flex justify-between items-center px-8">
        <div className="flex items-center gap-3">
          <img src={cloverImg} className="w-8 h-8" alt="Clover" />
          <span className="text-3xl font-black italic tracking-tighter">1,250</span>
        </div>
        <div className="h-8 w-[1px] bg-zinc-800"></div>
        <div className="text-right">
          <p className="text-[8px] text-zinc-500 font-black uppercase">Earnings</p>
          <p className="text-lg font-black text-green-500">$45.00</p>
        </div>
      </div>

      <div className="w-full space-y-3 mt-8">
        <Link to="/coach" className="block">
          <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex justify-between items-center group hover:border-green-500 transition-colors">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-500/10 rounded-lg text-green-500"><MessageSquare size={20} /></div>
              <div>
                <p className="text-sm font-black uppercase tracking-tighter">Lucky Coach</p>
                <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">AI Coaches · Clover Support</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-zinc-700 group-hover:text-green-500" />
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full mt-4">
        <div className="bg-zinc-900 p-5 rounded-3xl border border-zinc-800">
          <p className="text-[9px] font-black uppercase text-zinc-500 tracking-widest">Handicap</p>
          <p className="text-3xl font-black italic tracking-tighter mt-1">2.4</p>
        </div>
        <div className="bg-zinc-900 p-5 rounded-3xl border border-zinc-800">
          <p className="text-[9px] font-black uppercase text-zinc-500 tracking-widest">Avg Score</p>
          <p className="text-3xl font-black italic tracking-tighter mt-1">76.4</p>
        </div>
      </div>
    </div>
  );
};
export default Profile;