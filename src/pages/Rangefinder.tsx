import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Camera, RotateCcw } from 'lucide-react';

const Rangefinder = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [distance, setDistance] = useState(145);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera error:", err);
        setError("Camera access denied. Please allow camera permissions.");
      }
    }
    startCamera();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="h-screen bg-black relative overflow-hidden flex flex-col items-center">
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-80 h-80 border-4 border-green-500 rounded-full relative flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.3)]">
          <div className="w-full h-[2px] bg-green-500/30 absolute top-1/2" />
          <div className="w-[2px] h-full bg-green-500/30 absolute left-1/2" />
          <div className="w-4 h-4 border-2 border-green-500 rounded-full" />
          <div className="absolute top-1/4 bg-black/80 px-4 py-1 rounded-full border border-green-500">
            <span className="text-green-500 font-black text-xl italic">{distance} YDS</span>
          </div>
        </div>
      </div>

      <div className="w-full p-6 flex justify-between items-center z-10">
        <div className="bg-black/50 p-3 rounded-xl border border-green-900">
          <p className="text-[10px] text-green-500 font-black uppercase tracking-widest">Pin Location</p>
          <p className="text-white font-black uppercase">Center Green</p>
        </div>
        <div className="bg-green-500 p-3 rounded-full">
          <Target size={24} className="text-black" />
        </div>
      </div>

      {error && (
        <div className="absolute top-1/2 bg-red-600 text-white p-4 rounded-xl font-bold">
          {error}
        </div>
      )}

      <div className="mt-auto w-full p-8 bg-gradient-to-t from-black to-transparent z-10 text-center">
        <h2 className="text-5xl font-black italic tracking-tighter text-white uppercase mb-2">Pebble Beach</h2>
        <p className="text-green-500 font-bold uppercase tracking-[0.4em] text-xs">Hole 7 · Par 3</p>
      </div>
    </div>
  );
};

export default Rangefinder;