import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, MessageCircle, User } from "lucide-react";
import type { MatchResult } from "@/lib/matchingAlgorithm";

interface MatchCardProps {
  match: MatchResult;
  index: number;
  onViewDetail: () => void;
  onRequestPlay: () => void;
}

export const MatchCard = ({ match, index, onViewDetail, onRequestPlay }: MatchCardProps) => {
  const { profile, score, highlights } = match;

  const scoreColor = score >= 75 ? "text-primary" : score >= 50 ? "text-accent" : "text-muted-foreground";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-card p-5 space-y-3"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center">
            <User className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="font-display font-semibold">{profile.display_name || "Anonymous Golfer"}</p>
            {profile.show_location && profile.city && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>{profile.city}</span>
              </div>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-display font-bold ${scoreColor}`}>{score}%</div>
          <div className="text-xs text-muted-foreground">Match</div>
        </div>
      </div>

      {/* Score breakdown mini bar */}
      <div className="grid grid-cols-4 gap-1 text-center">
        {[
          { label: "Golf", value: match.golfScore },
          { label: "Vibe", value: match.personalityScore },
          { label: "Interests", value: match.interestsScore },
          { label: "Biz", value: match.professionalScore },
        ].map(cat => (
          <div key={cat.label} className="space-y-1">
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary/60 rounded-full" style={{ width: `${cat.value}%` }} />
            </div>
            <span className="text-[10px] text-muted-foreground">{cat.label}</span>
          </div>
        ))}
      </div>

      {/* Highlights */}
      {highlights.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {highlights.map((h, i) => (
            <span key={i} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
              {h}
            </span>
          ))}
        </div>
      )}

      {profile.bio && (
        <p className="text-sm text-muted-foreground line-clamp-2">{profile.bio}</p>
      )}

      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1" onClick={onViewDetail}>
          View Profile
        </Button>
        <Button variant="lucky" size="sm" className="flex-1" onClick={onRequestPlay}>
          <MessageCircle className="w-4 h-4 mr-1" /> Request to Play
        </Button>
      </div>
    </motion.div>
  );
};
