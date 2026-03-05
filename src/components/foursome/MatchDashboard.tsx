import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Settings2, RefreshCw, UserCog, Search, Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { computeMatches, type MatchResult } from "@/lib/matchingAlgorithm";
import { MatchCard } from "./MatchCard";
import { MatchDetailModal } from "./MatchDetailModal";

interface MatchDashboardProps {
  userId: string;
  onEditProfile: () => void;
}

export const MatchDashboard = ({ userId, onEditProfile }: MatchDashboardProps) => {
  const { toast } = useToast();
  const [myProfile, setMyProfile] = useState<any>(null);
  const [allProfiles, setAllProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<MatchResult | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [handicapFilter, setHandicapFilter] = useState<[number, number]>([0, 36]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const { data: mine } = await supabase.from("golfer_profiles" as any).select("*").eq("user_id", userId).single();
      const { data: all } = await supabase.from("golfer_profiles" as any).select("*");
      setMyProfile(mine);
      setAllProfiles((all as any[]) || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProfiles(); }, [userId]);

  const matches = useMemo(() => {
    if (!myProfile || allProfiles.length < 2) return [];
    let filtered = allProfiles.filter(p => {
      if (p.user_id === userId) return false;
      if (p.handicap_index != null) {
        if (p.handicap_index < handicapFilter[0] || p.handicap_index > handicapFilter[1]) return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const name = (p.display_name || "").toLowerCase();
        const city = (p.city || "").toLowerCase();
        if (!name.includes(q) && !city.includes(q)) return false;
      }
      return true;
    });
    return computeMatches(myProfile, filtered).slice(0, 10);
  }, [myProfile, allProfiles, handicapFilter, searchQuery, userId]);

  const handleSendRequest = async (toUserId: string, message: string) => {
    try {
      const { error } = await supabase.from("match_requests" as any).insert({
        from_user_id: userId,
        to_user_id: toUserId,
        message: message || "I'd like to play a round together!",
      } as any);
      if (error) throw error;
      toast({ title: "Request sent!", description: "They'll be notified of your interest." });
      setSelectedMatch(null);
    } catch (e: any) {
      if (e.message?.includes("duplicate")) {
        toast({ title: "Already sent", description: "You've already sent a request to this golfer.", variant: "destructive" });
      } else {
        toast({ title: "Error", description: e.message, variant: "destructive" });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <RefreshCw className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header actions */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or city..."
            className="pl-9"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)}>
          <Filter className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={onEditProfile}>
          <UserCog className="w-4 h-4" />
        </Button>
      </div>

      {/* Filters */}
      {showFilters && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="glass-card p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Settings2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold">Filters</span>
          </div>
          <div>
            <Label className="text-xs">Handicap Range: {handicapFilter[0]} – {handicapFilter[1]}</Label>
            <Slider
              value={handicapFilter}
              onValueChange={v => setHandicapFilter(v as [number, number])}
              min={0} max={36} step={1}
              className="mt-2"
            />
          </div>
        </motion.div>
      )}

      {/* Results */}
      {matches.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-8 text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <Search className="w-8 h-8 text-primary/50" />
          </div>
          <h3 className="font-display font-semibold">No matches yet</h3>
          <p className="text-sm text-muted-foreground">
            As more golfers complete their profiles, you'll start seeing compatible matches here.
          </p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">{matches.length} compatible golfer{matches.length !== 1 ? "s" : ""} found</p>
          {matches.map((match, i) => (
            <MatchCard
              key={match.profile.user_id}
              match={match}
              index={i}
              onViewDetail={() => setSelectedMatch(match)}
              onRequestPlay={() => setSelectedMatch(match)}
            />
          ))}
        </div>
      )}

      <MatchDetailModal
        match={selectedMatch}
        open={!!selectedMatch}
        onClose={() => setSelectedMatch(null)}
        onSendRequest={(msg) => handleSendRequest(selectedMatch!.profile.user_id, msg)}
      />
    </div>
  );
};
