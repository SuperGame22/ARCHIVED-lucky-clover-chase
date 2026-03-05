import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Users, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { GolferInterview } from "@/components/foursome/GolferInterview";
import { MatchDashboard } from "@/components/foursome/MatchDashboard";
import { useNavigate } from "react-router-dom";

const FoursomeFinder = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }
      setUserId(user.id);
      // Check if profile exists
      const { data } = await supabase
        .from("golfer_profiles" as any)
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();
      setHasProfile(!!data);
    };
    checkAuth();
  }, [navigate]);

  if (userId === null || hasProfile === null) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center py-20">
          <RefreshCw className="w-6 h-6 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  }

  const showInterview = !hasProfile || editMode;

  return (
    <AppLayout>
      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold">Foursome Finder</h1>
              <p className="text-sm text-muted-foreground">
                {showInterview ? "Build your golf personality profile" : "Match with golfers you'll enjoy playing with"}
              </p>
            </div>
          </div>
        </motion.div>

        {showInterview ? (
          <GolferInterview
            userId={userId}
            onComplete={() => {
              setHasProfile(true);
              setEditMode(false);
            }}
          />
        ) : (
          <MatchDashboard
            userId={userId}
            onEditProfile={() => setEditMode(true)}
          />
        )}
      </div>
    </AppLayout>
  );
};

export default FoursomeFinder;
