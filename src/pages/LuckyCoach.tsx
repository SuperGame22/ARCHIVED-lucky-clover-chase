import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { CloverIcon } from "@/components/icons/CloverIcon";
import { supabase } from "@/integrations/supabase/client";
import {
  Upload,
  Video,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Target,
  Send,
  History,
  ChevronRight,
  Loader2,
  X,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";

interface SwingAnalysis {
  id?: string;
  overall_score: number;
  strengths: string[];
  improvements: string[];
  drills: { name: string; description: string; link: string }[];
  motivational_message: string;
  video_url?: string;
  created_at?: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/coach-chat`;

const LuckyCoach = () => {
  const { toast } = useToast();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<SwingAnalysis | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [history, setHistory] = useState<SwingAnalysis[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const validTypes = ["video/mp4", "video/webm", "video/quicktime", "video/x-m4v"];
    if (!file.type.startsWith("video/")) {
      toast({ title: "Unsupported format", description: "Please upload MP4, WebM, or MOV video files.", variant: "destructive" });
      return;
    }
    if (file.size > 100 * 1024 * 1024) {
      toast({ title: "File too large", description: "Max 100MB. Try trimming to just your swing (5-15 seconds).", variant: "destructive" });
      return;
    }
    setVideoFile(file);
    setVideoPreviewUrl(URL.createObjectURL(file));
    setAnalysis(null);
    setChatMessages([]);
  };

  const removeVideo = () => {
    setVideoFile(null);
    setVideoPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const loadHistory = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    const { data } = await supabase
      .from("swing_analyses")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);
    if (data) setHistory(data as unknown as SwingAnalysis[]);
  }, []);

  const analyzeSwing = async () => {
    setIsAnalyzing(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      let videoUrl: string | null = null;

      if (videoFile) {
        const userId = session?.user?.id || "anonymous";
        const filePath = `${userId}/${Date.now()}-${videoFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from("swing-videos")
          .upload(filePath, videoFile);
        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("swing-videos")
          .getPublicUrl(filePath);
        videoUrl = urlData.publicUrl;
      }

      const { data, error } = await supabase.functions.invoke("analyze-swing", {
        body: { videoUrl },
      });

      if (error) throw error;
      setAnalysis(data as SwingAnalysis);
      setChatMessages([]);
      if (session) loadHistory();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Analysis failed";
      toast({ title: "Analysis error", description: msg, variant: "destructive" });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim() || isChatLoading) return;

    const userMsg: ChatMessage = { role: "user", content: chatInput.trim() };
    const allMessages = [...chatMessages, userMsg];
    setChatMessages(allMessages);
    setChatInput("");
    setIsChatLoading(true);

    let assistantSoFar = "";
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (session?.access_token) {
        headers["Authorization"] = `Bearer ${session.access_token}`;
      } else {
        headers["apikey"] = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      }

      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers,
        body: JSON.stringify({
          messages: allMessages,
          analysisContext: analysis,
        }),
      });

      if (!resp.ok || !resp.body) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error((errData as { error?: string }).error || "Chat failed");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantSoFar += content;
              setChatMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
                }
                return [...prev, { role: "assistant", content: assistantSoFar }];
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Chat failed";
      toast({ title: "Chat error", description: msg, variant: "destructive" });
    } finally {
      setIsChatLoading(false);
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const ScoreRing = ({ score }: { score: number }) => {
    const circumference = 2 * Math.PI * 54;
    const offset = circumference - (score / 100) * circumference;
    return (
      <div className="relative w-36 h-36 mx-auto">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
          <motion.circle
            cx="60" cy="60" r="54" fill="none"
            stroke="hsl(var(--primary))" strokeWidth="8" strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <CloverIcon className="w-5 h-5 mb-1" animate />
          <span className="text-3xl font-display font-bold text-foreground">{score}</span>
          <span className="text-xs text-muted-foreground">/100</span>
        </div>
      </div>
    );
  };

  return (
    <AppLayout>
      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">Lucky Coach</h1>
            <p className="text-muted-foreground text-sm">AI-powered swing analysis 🍀</p>
          </div>
          <Button
            variant="ghost" size="icon"
            onClick={() => { setShowHistory(!showHistory); if (!showHistory) loadHistory(); }}
          >
            <History className="w-5 h-5" />
          </Button>
        </motion.div>

        {/* History Panel */}
        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <Card className="border-primary/20 bg-card/80">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <History className="w-4 h-4 text-primary" /> Past Analyses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {history.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No analyses yet. Upload a swing to get started!</p>
                  ) : (
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {history.map((h) => (
                        <button
                          key={h.id}
                          onClick={() => { setAnalysis(h); setShowHistory(false); setChatMessages([]); }}
                          className="w-full flex items-center justify-between p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-left"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
                              <Video className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold">Score: {h.overall_score}/100</p>
                              <p className="text-xs text-muted-foreground">
                                {h.created_at ? new Date(h.created_at).toLocaleDateString() : "Recent"}
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upload Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-primary/20 bg-card/80 overflow-hidden">
            <CardContent className="p-5">
              {videoPreviewUrl ? (
                <div className="relative rounded-xl overflow-hidden">
                  <video src={videoPreviewUrl} controls className="w-full rounded-xl max-h-52 object-cover" />
                  <button
                    onClick={removeVideo}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center hover:bg-background"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-primary/30 rounded-xl p-8 flex flex-col items-center gap-3 hover:border-primary/60 hover:bg-primary/5 transition-colors"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-foreground">Upload Your Swing</p>
                    <p className="text-sm text-muted-foreground mt-1">MP4, WebM, or MOV · max 100MB</p>
                  </div>
                </button>
              )}
              <input
                ref={fileInputRef} type="file" accept="video/*" capture="environment"
                onChange={handleFileSelect} className="hidden"
              />

              <Button
                onClick={analyzeSwing}
                disabled={isAnalyzing}
                variant="lucky" size="lg"
                className="w-full mt-4"
              >
                {isAnalyzing ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
                      <CloverIcon className="w-5 h-5" />
                    </motion.div>
                    Analyzing Your Swing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Analyze My Swing
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Loading Animation */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="glass-card p-8 flex flex-col items-center gap-4"
            >
              <motion.div
                animate={{ y: [0, -16, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                className="text-4xl"
              >
                ⛳
              </motion.div>
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }}>
                <CloverIcon className="w-10 h-10" />
              </motion.div>
              <p className="text-sm text-muted-foreground font-medium">Analyzing your swing... 🍀</p>
              <div className="w-full max-w-xs">
                <Progress value={undefined} className="h-2 animate-pulse" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {analysis && !isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Score */}
              <Card className="border-primary/20 bg-card/80">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-lg text-center mb-4">Swing Score</h3>
                  <ScoreRing score={analysis.overall_score} />
                </CardContent>
              </Card>

              {/* Strengths */}
              <Card className="border-primary/20 bg-card/80">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" /> Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysis.strengths.map((s, i) => (
                      <motion.li
                        key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                        className="flex items-start gap-2 text-sm"
                      >
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-foreground">{s}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Improvements */}
              <Card className="border-primary/20 bg-card/80">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-accent" /> Areas to Improve
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysis.improvements.map((imp, i) => (
                      <motion.li
                        key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                        className="flex items-start gap-2 text-sm"
                      >
                        <AlertTriangle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                        <span className="text-foreground">{imp}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Drills */}
              <Card className="border-primary/20 bg-card/80">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" /> Recommended Drills
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {analysis.drills.map((drill, i) => (
                    <Link key={i} to={drill.link}>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 * i }}
                        className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                      >
                        <div>
                          <p className="font-semibold text-sm">{drill.name}</p>
                          <p className="text-xs text-muted-foreground">{drill.description}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </motion.div>
                    </Link>
                  ))}
                </CardContent>
              </Card>

              {/* Motivational */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-5 text-center glow-green"
              >
                <p className="text-sm font-medium text-foreground italic">{analysis.motivational_message}</p>
              </motion.div>

              {/* Chat Section */}
              <Card className="border-primary/20 bg-card/80">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-primary" /> Ask Lucky Coach
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {chatMessages.length > 0 && (
                    <ScrollArea className="max-h-64">
                      <div className="space-y-3 pr-2">
                        {chatMessages.map((msg, i) => (
                          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                            <div
                              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                                msg.role === "user"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-secondary text-foreground"
                              }`}
                            >
                              {msg.role === "assistant" ? (
                                <div className="prose prose-sm prose-invert max-w-none">
                                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                                </div>
                              ) : (
                                msg.content
                              )}
                            </div>
                          </div>
                        ))}
                        <div ref={chatEndRef} />
                      </div>
                    </ScrollArea>
                  )}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask about your swing..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendChatMessage()}
                      className="bg-secondary/50 border-primary/20"
                    />
                    <Button
                      size="icon" variant="lucky"
                      onClick={sendChatMessage}
                      disabled={isChatLoading || !chatInput.trim()}
                    >
                      {isChatLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
};

export default LuckyCoach;
