import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { User, MapPin, Flag, MessageCircle, Heart, Briefcase } from "lucide-react";
import { useState } from "react";
import type { MatchResult } from "@/lib/matchingAlgorithm";

interface MatchDetailModalProps {
  match: MatchResult | null;
  open: boolean;
  onClose: () => void;
  onSendRequest: (message: string) => void;
}

const Section = ({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2 text-sm font-semibold">
      <Icon className="w-4 h-4 text-primary" />
      {title}
    </div>
    {children}
  </div>
);

const Tag = ({ label, shared }: { label: string; shared?: boolean }) => (
  <span className={`text-xs px-2 py-1 rounded-full border ${
    shared ? "bg-primary/10 border-primary/30 text-primary" : "bg-muted/30 border-border text-muted-foreground"
  }`}>
    {label}
  </span>
);

export const MatchDetailModal = ({ match, open, onClose, onSendRequest }: MatchDetailModalProps) => {
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  if (!match) return null;
  const { profile, score, golfScore, personalityScore, interestsScore, professionalScore } = match;

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto bg-card border-primary/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center">
              <User className="w-7 h-7 text-primary" />
            </div>
            <div>
              <p className="font-display text-lg">{profile.display_name || "Anonymous"}</p>
              {profile.show_location && profile.city && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground font-normal">
                  <MapPin className="w-3 h-3" /> {profile.city}
                </div>
              )}
            </div>
            <div className="ml-auto text-right">
              <div className="text-3xl font-display font-bold text-primary">{score}%</div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          {/* Score breakdown */}
          <div className="grid grid-cols-4 gap-3 text-center">
            {[
              { label: "Golf Fit", value: golfScore, icon: Flag },
              { label: "Personality", value: personalityScore, icon: MessageCircle },
              { label: "Interests", value: interestsScore, icon: Heart },
              { label: "Professional", value: professionalScore, icon: Briefcase },
            ].map(cat => (
              <div key={cat.label} className="glass-card p-2">
                <cat.icon className="w-4 h-4 mx-auto mb-1 text-primary/60" />
                <div className="text-lg font-bold">{cat.value}%</div>
                <div className="text-[10px] text-muted-foreground">{cat.label}</div>
              </div>
            ))}
          </div>

          {profile.bio && (
            <div className="text-sm text-muted-foreground bg-muted/20 p-3 rounded-xl">"{profile.bio}"</div>
          )}

          <Section icon={Flag} title="Golf Profile">
            <div className="grid grid-cols-2 gap-2 text-sm">
              {profile.show_handicap && profile.handicap_index != null && (
                <div><span className="text-muted-foreground">Handicap:</span> {profile.handicap_index}</div>
              )}
              {profile.pace_preference && (
                <div><span className="text-muted-foreground">Pace:</span> {profile.pace_preference}</div>
              )}
              {profile.competitive_preference && (
                <div><span className="text-muted-foreground">Style:</span> {profile.competitive_preference}</div>
              )}
              {profile.home_course && (
                <div className="col-span-2"><span className="text-muted-foreground">Home:</span> {profile.home_course}</div>
              )}
            </div>
            {(profile.formats_enjoyed as string[])?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {(profile.formats_enjoyed as string[]).map(f => <Tag key={f} label={f} />)}
              </div>
            )}
          </Section>

          <Section icon={Heart} title="Interests">
            {(profile.hobbies as string[])?.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {(profile.hobbies as string[]).map(h => <Tag key={h} label={h} />)}
              </div>
            )}
          </Section>

          <Section icon={Briefcase} title="Professional">
            {profile.industry && <p className="text-sm"><span className="text-muted-foreground">Industry:</span> {profile.industry}</p>}
            {(profile.business_topics as string[])?.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {(profile.business_topics as string[]).map(t => <Tag key={t} label={t} />)}
              </div>
            )}
          </Section>

          {/* Request to play / message */}
          {!showMessage ? (
            <Button variant="lucky" className="w-full" onClick={() => setShowMessage(true)}>
              <MessageCircle className="w-4 h-4 mr-2" /> Request to Play
            </Button>
          ) : (
            <div className="space-y-3">
              <Textarea
                placeholder="Hey! I'd love to get a round in — I play at TPC most weekends..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={3}
              />
              <Button variant="lucky" className="w-full" onClick={() => { onSendRequest(message); setShowMessage(false); setMessage(""); }}>
                Send Request
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
