
-- Create swing_analyses table
CREATE TABLE public.swing_analyses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  video_url TEXT,
  overall_score INTEGER,
  strengths JSONB DEFAULT '[]'::jsonb,
  improvements JSONB DEFAULT '[]'::jsonb,
  drills JSONB DEFAULT '[]'::jsonb,
  motivational_message TEXT,
  chat_history JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.swing_analyses ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view their own analyses"
  ON public.swing_analyses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own analyses"
  ON public.swing_analyses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own analyses"
  ON public.swing_analyses FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own analyses"
  ON public.swing_analyses FOR DELETE
  USING (auth.uid() = user_id);

-- Timestamp trigger
CREATE TRIGGER update_swing_analyses_updated_at
  BEFORE UPDATE ON public.swing_analyses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for swing videos
INSERT INTO storage.buckets (id, name, public)
VALUES ('swing-videos', 'swing-videos', true);

-- Storage policies
CREATE POLICY "Users can upload their own swing videos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'swing-videos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own swing videos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'swing-videos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own swing videos"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'swing-videos' AND auth.uid()::text = (storage.foldername(name))[1]);
