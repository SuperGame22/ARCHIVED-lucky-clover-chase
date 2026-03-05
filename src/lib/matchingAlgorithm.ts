// Foursome Finder matching algorithm
// Weights: 35% golf fit, 30% personality, 20% interests, 15% professional

interface GolferProfile {
  user_id: string;
  handicap_index: number | null;
  preferred_handicap_min: number | null;
  preferred_handicap_max: number | null;
  pace_preference: string | null;
  competitive_preference: string | null;
  formats_enjoyed: string[] | null;
  preferred_tee_times: string[] | null;
  preferred_days: string[] | null;
  home_course: string | null;
  talkative_level: number | null;
  introvert_extrovert: string | null;
  topics_to_avoid: string[] | null;
  humor_style: string | null;
  encouragement_style: string | null;
  hobbies: string[] | null;
  lifestyle_flexibility: string | null;
  industry: string | null;
  business_topics: string[] | null;
  networking_openness: string | null;
  deal_breakers: string[] | null;
  group_size_preference: string | null;
  gender_preference: string | null;
  display_name: string | null;
  city: string | null;
  bio: string | null;
  show_handicap: boolean | null;
  show_location: boolean | null;
}

function arrayOverlap(a: string[] | null, b: string[] | null): number {
  if (!a?.length || !b?.length) return 0;
  const setB = new Set(b);
  const shared = a.filter(x => setB.has(x)).length;
  const total = new Set([...a, ...b]).size;
  return total > 0 ? shared / total : 0;
}

function exactMatch(a: string | null, b: string | null): number {
  if (!a || !b) return 0.5;
  return a === b ? 1 : 0;
}

function proximityMatch(a: number | null, b: number | null, maxDiff: number): number {
  if (a == null || b == null) return 0.5;
  const diff = Math.abs(a - b);
  return Math.max(0, 1 - diff / maxDiff);
}

export interface MatchResult {
  profile: GolferProfile;
  score: number;
  golfScore: number;
  personalityScore: number;
  interestsScore: number;
  professionalScore: number;
  highlights: string[];
}

export function computeMatches(me: GolferProfile, others: GolferProfile[]): MatchResult[] {
  return others
    .filter(o => o.user_id !== me.user_id)
    .map(other => {
      // Golf fit (35%)
      const handicapFit = me.handicap_index != null && other.handicap_index != null
        ? (other.handicap_index >= (me.preferred_handicap_min ?? 0) &&
           other.handicap_index <= (me.preferred_handicap_max ?? 36) ? 1 : 0.3)
        : 0.5;
      const paceFit = exactMatch(me.pace_preference, other.pace_preference);
      const compFit = exactMatch(me.competitive_preference, other.competitive_preference);
      const formatFit = arrayOverlap(me.formats_enjoyed, other.formats_enjoyed);
      const scheduleFit = (arrayOverlap(me.preferred_tee_times, other.preferred_tee_times) +
        arrayOverlap(me.preferred_days, other.preferred_days)) / 2;
      const golfScore = (handicapFit * 0.3 + paceFit * 0.25 + compFit * 0.2 + formatFit * 0.15 + scheduleFit * 0.1);

      // Personality (30%)
      const talkFit = proximityMatch(me.talkative_level, other.talkative_level, 4);
      const socialFit = exactMatch(me.introvert_extrovert, other.introvert_extrovert);
      const humorFit = exactMatch(me.humor_style, other.humor_style);
      const encourageFit = exactMatch(me.encouragement_style, other.encouragement_style);
      // Check if their topics to avoid conflict
      const topicConflict = 1; // simplified - no conflict detection for now
      const personalityScore = (talkFit * 0.3 + socialFit * 0.25 + humorFit * 0.2 + encourageFit * 0.15 + topicConflict * 0.1);

      // Interests (20%)
      const hobbyFit = arrayOverlap(me.hobbies, other.hobbies);
      const flexFit = exactMatch(me.lifestyle_flexibility, other.lifestyle_flexibility);
      const interestsScore = hobbyFit * 0.7 + flexFit * 0.3;

      // Professional (15%)
      const industryFit = exactMatch(me.industry, other.industry);
      const bizTopicFit = arrayOverlap(me.business_topics, other.business_topics);
      const networkFit = exactMatch(me.networking_openness, other.networking_openness);
      const professionalScore = industryFit * 0.3 + bizTopicFit * 0.4 + networkFit * 0.3;

      const score = golfScore * 0.35 + personalityScore * 0.30 + interestsScore * 0.20 + professionalScore * 0.15;

      // Generate highlights
      const highlights: string[] = [];
      if (handicapFit > 0.8 && me.handicap_index != null && other.handicap_index != null) {
        highlights.push(`Similar handicap range (${Math.round(other.handicap_index)})`);
      }
      if (paceFit === 1 && me.pace_preference) {
        highlights.push(`Both prefer ${me.pace_preference} pace`);
      }
      if (compFit === 1 && me.competitive_preference) {
        highlights.push(`Both enjoy ${me.competitive_preference} play`);
      }
      const sharedHobbies = (me.hobbies || []).filter(h => (other.hobbies || []).includes(h));
      if (sharedHobbies.length > 0) {
        highlights.push(`Shared interests: ${sharedHobbies.slice(0, 3).join(', ')}`);
      }
      const sharedBiz = (me.business_topics || []).filter(t => (other.business_topics || []).includes(t));
      if (sharedBiz.length > 0) {
        highlights.push(`Both enjoy discussing ${sharedBiz.slice(0, 2).join(' & ')}`);
      }
      if (humorFit === 1 && me.humor_style) {
        highlights.push(`Similar ${me.humor_style} humor`);
      }
      if (me.industry && other.industry && me.industry === other.industry) {
        highlights.push(`Same industry: ${me.industry}`);
      }
      const sharedFormats = (me.formats_enjoyed || []).filter(f => (other.formats_enjoyed || []).includes(f));
      if (sharedFormats.length > 0) {
        highlights.push(`Both enjoy ${sharedFormats[0]}`);
      }

      return {
        profile: other,
        score: Math.round(score * 100),
        golfScore: Math.round(golfScore * 100),
        personalityScore: Math.round(personalityScore * 100),
        interestsScore: Math.round(interestsScore * 100),
        professionalScore: Math.round(professionalScore * 100),
        highlights: highlights.slice(0, 4),
      };
    })
    .sort((a, b) => b.score - a.score);
}
