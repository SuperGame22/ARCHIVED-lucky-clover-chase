import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { CloverBalance } from "@/components/home/CloverBalance";
import { GoldMachinePreview } from "@/components/home/GoldMachinePreview";
import { QuickActions } from "@/components/home/QuickActions";
import { LeprechaunAlert } from "@/components/home/LeprechaunAlert";
import { RecentActivity } from "@/components/home/RecentActivity";
import { FlashSaleBanner } from "@/components/home/FlashSaleBanner";
import { MatchRequestModal } from "@/components/home/MatchRequestModal";
import { motion } from "framer-motion";

const Index = () => {
  const [showMatchRequest, setShowMatchRequest] = useState(false);

  // Show match request modal on mount (demo)
  useEffect(() => {
    const timer = setTimeout(() => setShowMatchRequest(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppLayout>
      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Flash Sale Banner */}
        <FlashSaleBanner />

        {/* Match Request Modal */}
        <MatchRequestModal isOpen={showMatchRequest} onClose={() => setShowMatchRequest(false)} />
        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-display font-bold">Welcome back!</h1>
            <p className="text-muted-foreground text-sm">Shop. Swing. Win. 🍀</p>
          </div>
        </motion.div>

        {/* Clover Balance Card with Jackpot/Tee Times previews */}
        <CloverBalance 
          balance={47} 
          todayEarned={3} 
          jackpotAmount={2500}
          teeTimesCount={3}
          unreadMessages={2}
        />

        {/* Quick Actions Grid - moved above leprechaun alert */}
        <QuickActions />

        {/* Leprechaun Alert */}
        <LeprechaunAlert />

        {/* Gold Machine Preview */}
        <GoldMachinePreview potValue={4.72} generationRate={12} health={78} />

      </div>
    </AppLayout>
  );
};

export default Index;
