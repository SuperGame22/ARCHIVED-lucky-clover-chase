import { AppLayout } from "@/components/layout/AppLayout";
import { CloverBalance } from "@/components/home/CloverBalance";
import { GoldMachinePreview } from "@/components/home/GoldMachinePreview";
import { QuickActions } from "@/components/home/QuickActions";
import { LeprechaunAlert } from "@/components/home/LeprechaunAlert";
import { RecentActivity } from "@/components/home/RecentActivity";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <AppLayout>
      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-display font-bold">Welcome back!</h1>
            <p className="text-muted-foreground text-sm">Practice. Play. Buy. Get Lucky. 🍀</p>
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

        {/* Leprechaun Alert - moved up to second position */}
        <LeprechaunAlert />

        {/* Quick Actions Grid - reordered with Scorecard first, Shop last */}
        <QuickActions />

        {/* Gold Machine Preview */}
        <GoldMachinePreview potValue={4.72} generationRate={12} health={78} />

        {/* Recent Activity */}
        <RecentActivity />
      </div>
    </AppLayout>
  );
};

export default Index;
