import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { ChevronRight, ChevronLeft, Flag, Users, MessageCircle, Heart, Briefcase, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface GolferInterviewProps {
  userId: string;
  onComplete: () => void;
}

const TOTAL_STEPS = 6;

const ToggleChip = ({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
      selected
        ? "bg-primary/20 border-primary text-primary"
        : "bg-muted/30 border-border text-muted-foreground hover:border-primary/40"
    }`}
  >
    {label}
  </button>
);

export const GolferInterview = ({ userId, onComplete }: GolferInterviewProps) => {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const [data, setData] = useState({
    display_name: "",
    city: "",
    handicap_index: "",
    preferred_handicap_min: "0",
    preferred_handicap_max: "36",
    pace_preference: "moderate",
    competitive_preference: "casual",
    formats_enjoyed: [] as string[],
    preferred_tee_times: [] as string[],
    preferred_days: [] as string[],
    home_course: "",
    talkative_level: 3,
    introvert_extrovert: "ambivert",
    topics_to_avoid: [] as string[],
    humor_style: "friendly",
    encouragement_style: "low_key",
    hobbies: [] as string[],
    lifestyle_flexibility: "somewhat",
    bio: "",
    industry: "",
    business_topics: [] as string[],
    networking_openness: "casual",
    deal_breakers: [] as string[],
    group_size_preference: "any",
    gender_preference: "no_preference",
  });

  const toggle = (field: keyof typeof data, value: string) => {
    const arr = data[field] as string[];
    setData(d => ({
      ...d,
      [field]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value],
    }));
  };

  const set = (field: keyof typeof data, value: any) => setData(d => ({ ...d, [field]: value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        user_id: userId,
        display_name: data.display_name || "Anonymous Golfer",
        city: data.city || null,
        handicap_index: data.handicap_index ? parseFloat(data.handicap_index) : null,
        preferred_handicap_min: parseFloat(data.preferred_handicap_min),
        preferred_handicap_max: parseFloat(data.preferred_handicap_max),
        pace_preference: data.pace_preference,
        competitive_preference: data.competitive_preference,
        formats_enjoyed: data.formats_enjoyed,
        preferred_tee_times: data.preferred_tee_times,
        preferred_days: data.preferred_days,
        home_course: data.home_course || null,
        talkative_level: data.talkative_level,
        introvert_extrovert: data.introvert_extrovert,
        topics_to_avoid: data.topics_to_avoid,
        humor_style: data.humor_style,
        encouragement_style: data.encouragement_style,
        hobbies: data.hobbies,
        lifestyle_flexibility: data.lifestyle_flexibility,
        bio: data.bio || null,
        industry: data.industry || null,
        business_topics: data.business_topics,
        networking_openness: data.networking_openness,
        deal_breakers: data.deal_breakers,
        group_size_preference: data.group_size_preference,
        gender_preference: data.gender_preference,
      };

      const { error } = await supabase.from("golfer_profiles" as any).upsert(payload as any, { onConflict: "user_id" });
      if (error) throw error;
      toast({ title: "Profile saved!", description: "Let's find your ideal foursome." });
      onComplete();
    } catch (e: any) {
      toast({ title: "Error saving profile", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const stepIcons = [Flag, Flag, MessageCircle, Heart, Briefcase, Shield];
  const stepLabels = ["Your Game", "Schedule & Courses", "On-Course Personality", "Interests & Lifestyle", "Professional & Networking", "Preferences & Boundaries"];
  const StepIcon = stepIcons[step - 1];

  return (
    <div className="max-w-lg mx-auto space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <StepIcon className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">{stepLabels[step - 1]}</span>
          </div>
          <span className="text-muted-foreground">{step}/{TOTAL_STEPS}</span>
        </div>
        <Progress value={(step / TOTAL_STEPS) * 100} className="h-2" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          className="glass-card p-6 space-y-5"
        >
          {step === 1 && (
            <>
              <h2 className="text-xl font-display font-bold">Let's start with your game</h2>
              <p className="text-sm text-muted-foreground">Like a first-tee handshake — tell us about your golf.</p>
              <div className="space-y-4">
                <div>
                  <Label>Display Name</Label>
                  <Input placeholder="What should golfers call you?" value={data.display_name} onChange={e => set("display_name", e.target.value)} />
                </div>
                <div>
                  <Label>City / Area</Label>
                  <Input placeholder="e.g., Scottsdale, AZ" value={data.city} onChange={e => set("city", e.target.value)} />
                </div>
                <div>
                  <Label>Handicap Index</Label>
                  <Input type="number" step="0.1" placeholder="e.g., 12.4" value={data.handicap_index} onChange={e => set("handicap_index", e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Partner Handicap Min</Label>
                    <Input type="number" value={data.preferred_handicap_min} onChange={e => set("preferred_handicap_min", e.target.value)} />
                  </div>
                  <div>
                    <Label>Partner Handicap Max</Label>
                    <Input type="number" value={data.preferred_handicap_max} onChange={e => set("preferred_handicap_max", e.target.value)} />
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-xl font-display font-bold">Pace & Playing Style</h2>
              <p className="text-sm text-muted-foreground">How do you like your rounds?</p>
              <div className="space-y-4">
                <div>
                  <Label>Preferred Pace</Label>
                  <div className="flex gap-2 mt-1">
                    {["fast", "moderate", "leisurely"].map(p => (
                      <ToggleChip key={p} label={p.charAt(0).toUpperCase() + p.slice(1)} selected={data.pace_preference === p} onClick={() => set("pace_preference", p)} />
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Playing Style</Label>
                  <div className="flex gap-2 mt-1">
                    {["competitive", "casual", "either"].map(p => (
                      <ToggleChip key={p} label={p.charAt(0).toUpperCase() + p.slice(1)} selected={data.competitive_preference === p} onClick={() => set("competitive_preference", p)} />
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Formats You Enjoy</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {["Stroke Play", "Match Play", "Scrambles", "Best Ball", "Skins", "Stableford"].map(f => (
                      <ToggleChip key={f} label={f} selected={data.formats_enjoyed.includes(f)} onClick={() => toggle("formats_enjoyed", f)} />
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Preferred Tee Times</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {["Dawn Patrol", "Morning", "Midday", "Afternoon", "Twilight"].map(t => (
                      <ToggleChip key={t} label={t} selected={data.preferred_tee_times.includes(t)} onClick={() => toggle("preferred_tee_times", t)} />
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Preferred Days</Label>
                  <div className="flex gap-2 mt-1">
                    {["Weekdays", "Weekends", "Any"].map(d => (
                      <ToggleChip key={d} label={d} selected={data.preferred_days.includes(d)} onClick={() => toggle("preferred_days", d)} />
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Home Course</Label>
                  <Input placeholder="e.g., TPC Scottsdale" value={data.home_course} onChange={e => set("home_course", e.target.value)} />
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-xl font-display font-bold">On-Course Personality</h2>
              <p className="text-sm text-muted-foreground">A great round is about the people as much as the score.</p>
              <div className="space-y-4">
                <div>
                  <Label>How talkative are you on the course?</Label>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-muted-foreground">Quiet</span>
                    <Slider value={[data.talkative_level]} onValueChange={v => set("talkative_level", v[0])} min={1} max={5} step={1} className="flex-1" />
                    <span className="text-xs text-muted-foreground">Chatterbox</span>
                  </div>
                </div>
                <div>
                  <Label>Social Style</Label>
                  <div className="flex gap-2 mt-1">
                    {["introvert", "ambivert", "extrovert"].map(p => (
                      <ToggleChip key={p} label={p.charAt(0).toUpperCase() + p.slice(1)} selected={data.introvert_extrovert === p} onClick={() => set("introvert_extrovert", p)} />
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Humor Style</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {["dry", "sarcastic", "goofy", "friendly", "reserved"].map(h => (
                      <ToggleChip key={h} label={h.charAt(0).toUpperCase() + h.slice(1)} selected={data.humor_style === h} onClick={() => set("humor_style", h)} />
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Encouragement Style</Label>
                  <div className="flex gap-2 mt-1">
                    {["high_energy", "low_key", "silent"].map(e => (
                      <ToggleChip key={e} label={e.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase())} selected={data.encouragement_style === e} onClick={() => set("encouragement_style", e)} />
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Topics to Avoid</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {["Politics", "Religion", "Work Stress", "None"].map(t => (
                      <ToggleChip key={t} label={t} selected={data.topics_to_avoid.includes(t)} onClick={() => toggle("topics_to_avoid", t)} />
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="text-xl font-display font-bold">Interests & Lifestyle</h2>
              <p className="text-sm text-muted-foreground">What do you talk about between shots?</p>
              <div className="space-y-4">
                <div>
                  <Label>Hobbies & Interests</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {["Travel", "Sports", "Food & Drink", "Outdoors", "Music", "Family", "Fitness", "Cars", "Tech", "Reading", "Fishing", "Hunting"].map(h => (
                      <ToggleChip key={h} label={h} selected={data.hobbies.includes(h)} onClick={() => toggle("hobbies", h)} />
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Schedule Flexibility</Label>
                  <div className="flex gap-2 mt-1">
                    {["very_flexible", "somewhat", "rigid"].map(f => (
                      <ToggleChip key={f} label={f.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase())} selected={data.lifestyle_flexibility === f} onClick={() => set("lifestyle_flexibility", f)} />
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Short Bio (optional)</Label>
                  <Textarea placeholder="A few words about yourself — what makes a great round for you?" value={data.bio} onChange={e => set("bio", e.target.value)} rows={3} />
                </div>
              </div>
            </>
          )}

          {step === 5 && (
            <>
              <h2 className="text-xl font-display font-bold">Professional & Networking</h2>
              <p className="text-sm text-muted-foreground">Some of the best connections happen on the course.</p>
              <div className="space-y-4">
                <div>
                  <Label>Industry / Field</Label>
                  <Input placeholder="e.g., Real Estate, Tech, Finance" value={data.industry} onChange={e => set("industry", e.target.value)} />
                </div>
                <div>
                  <Label>Topics You Enjoy Discussing</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {["Entrepreneurship", "Finance", "Tech", "Real Estate", "Marketing", "Leadership", "Investing", "Local Business"].map(t => (
                      <ToggleChip key={t} label={t} selected={data.business_topics.includes(t)} onClick={() => toggle("business_topics", t)} />
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Networking Openness</Label>
                  <div className="flex gap-2 mt-1">
                    {["open", "casual", "social_only"].map(n => (
                      <ToggleChip key={n} label={n === "social_only" ? "Social Only" : n.charAt(0).toUpperCase() + n.slice(1)} selected={data.networking_openness === n} onClick={() => set("networking_openness", n)} />
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 6 && (
            <>
              <h2 className="text-xl font-display font-bold">Preferences & Boundaries</h2>
              <p className="text-sm text-muted-foreground">Last step — let's make sure your matches are spot on.</p>
              <div className="space-y-4">
                <div>
                  <Label>Deal-Breakers</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {["No Gambling", "No Slow Play", "No Phone Use", "No Music", "No Smoking"].map(d => (
                      <ToggleChip key={d} label={d} selected={data.deal_breakers.includes(d)} onClick={() => toggle("deal_breakers", d)} />
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Group Size Preference</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {[
                      { value: "need_fourth", label: "Need a 4th" },
                      { value: "pairs", label: "Twosome" },
                      { value: "threes", label: "Threesome" },
                      { value: "any", label: "Any Size" },
                    ].map(g => (
                      <ToggleChip key={g.value} label={g.label} selected={data.group_size_preference === g.value} onClick={() => set("group_size_preference", g.value)} />
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Group Makeup</Label>
                  <div className="flex gap-2 mt-1">
                    {[
                      { value: "no_preference", label: "No Preference" },
                      { value: "all_male", label: "All Male" },
                      { value: "mixed", label: "Mixed" },
                    ].map(g => (
                      <ToggleChip key={g.value} label={g.label} selected={data.gender_preference === g.value} onClick={() => set("gender_preference", g.value)} />
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => setStep(s => s - 1)} disabled={step === 1}>
          <ChevronLeft className="w-4 h-4 mr-1" /> Back
        </Button>
        {step < TOTAL_STEPS ? (
          <Button variant="lucky" onClick={() => setStep(s => s + 1)}>
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        ) : (
          <Button variant="lucky" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Find My Foursome"} <Users className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
};
