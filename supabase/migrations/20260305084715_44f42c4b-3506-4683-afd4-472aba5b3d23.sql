
-- Golfer compatibility profiles for Foursome Finder
CREATE TABLE public.golfer_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  handicap_index numeric,
  preferred_handicap_min numeric DEFAULT 0,
  preferred_handicap_max numeric DEFAULT 36,
  pace_preference text DEFAULT 'moderate',
  competitive_preference text DEFAULT 'casual',
  formats_enjoyed text[] DEFAULT '{}',
  preferred_tee_times text[] DEFAULT '{}',
  preferred_days text[] DEFAULT '{}',
  home_course text,
  talkative_level integer DEFAULT 3,
  introvert_extrovert text DEFAULT 'ambivert',
  topics_to_avoid text[] DEFAULT '{}',
  humor_style text DEFAULT 'friendly',
  encouragement_style text DEFAULT 'low_key',
  hobbies text[] DEFAULT '{}',
  lifestyle_flexibility text DEFAULT 'somewhat',
  industry text,
  business_topics text[] DEFAULT '{}',
  networking_openness text DEFAULT 'casual',
  deal_breakers text[] DEFAULT '{}',
  group_size_preference text DEFAULT 'any',
  gender_preference text DEFAULT 'no_preference',
  show_photo boolean DEFAULT false,
  show_handicap boolean DEFAULT true,
  show_location boolean DEFAULT true,
  bio text,
  display_name text,
  city text,
  search_radius_miles integer DEFAULT 25,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.golfer_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all golfer profiles" ON public.golfer_profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can insert their own profile" ON public.golfer_profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.golfer_profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own profile" ON public.golfer_profiles FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Match requests between golfers
CREATE TABLE public.match_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id uuid NOT NULL,
  to_user_id uuid NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  message text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(from_user_id, to_user_id)
);

ALTER TABLE public.match_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own match requests" ON public.match_requests FOR SELECT TO authenticated USING (auth.uid() = from_user_id OR auth.uid() = to_user_id);
CREATE POLICY "Users can create match requests" ON public.match_requests FOR INSERT TO authenticated WITH CHECK (auth.uid() = from_user_id);
CREATE POLICY "Users can update requests sent to them" ON public.match_requests FOR UPDATE TO authenticated USING (auth.uid() = to_user_id OR auth.uid() = from_user_id);

-- Foursome posts ("Need 1 more")
CREATE TABLE public.foursome_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  course_name text NOT NULL,
  tee_time timestamptz NOT NULL,
  spots_needed integer NOT NULL DEFAULT 1,
  description text,
  is_active boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.foursome_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone authenticated can view active posts" ON public.foursome_posts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create their own posts" ON public.foursome_posts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own posts" ON public.foursome_posts FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own posts" ON public.foursome_posts FOR DELETE TO authenticated USING (auth.uid() = user_id);
