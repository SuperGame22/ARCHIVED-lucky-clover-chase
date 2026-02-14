import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  MapPin, Target, Trophy, Users, Play as PlayIcon, 
  ChevronRight, Eye, Layers, MessageCircle 
} from "lucide-react";
import { CloverIcon } from "@/components/icons/CloverIcon";

const playFeatures = [
  {
    title: "Start Round",
    description: "GPS, rangefinder & clover finder",
    icon: PlayIcon,
    path: "/play/round",
    tier: "free",
    primary: true,
  },
  {
    title: "Scorecard",
    description: "Track your round live",
    icon: Trophy,
    path: "/scorecard",
    tier: "free",
  },
  {
    title: "Course Flyover",
    description: "Hole-by-hole aerial views",
    icon: Eye,
    path: "/course",
    tier: "free",
  },
  {
    title: "Lucky Wagers",
    description: "Friendly bets with your foursome",
    icon: CloverIcon,
    path: "/play/wagers",
    tier: "free",
  },
  {
    title: "Foursome Finder",
    description: "Find players near you",
    icon: Users,
    path: "/play/foursome",
    tier: "free",
  },
];

const overlays = [
  { label: "Personal Caddie", tier: "gold", icon: Target },
  { label: "Lucky Wagers", tier: "free", icon: CloverIcon },
  { label: "Social Messaging", tier: "free", icon: MessageCircle },
];

const Play = () => {
  return (
    <AppLayout>
      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-display font-bold">Play</h1>
          <p className="text-muted-foreground text-sm">Your on-course experience</p>
        </motion.div>

        {/* Start Round CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden glass-card p-6 glow-green"
        >
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Pebble Beach Golf Links</span>
            </div>
            <h2 className="text-xl font-display font-bold mb-1">Ready to play?</h2>
            <p className="text-sm text-muted-foreground mb-4">GPS + Rangefinder + Lep Finder active</p>
            <Button variant="default" size="lg" className="w-full gap-2">
              <PlayIcon className="w-5 h-5" />
              Start Round
            </Button>
          </div>
        </motion.div>

        {/* Feature List */}
        <div className="space-y-2">
          {playFeatures.slice(1).map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
            >
              <Link to={feature.path}>
                <div className="glass-card p-4 flex items-center justify-between hover:bg-primary/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                      {feature.icon === CloverIcon ? (
                        <CloverIcon className="w-5 h-5 text-primary" />
                      ) : (
                        <feature.icon className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold">{feature.title}</p>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Overlay Stack Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass-card p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-5 h-5 text-primary" />
            <h3 className="font-display font-semibold">Round Overlays</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Layer these on top of your active round
          </p>
          <div className="space-y-2">
            {overlays.map((overlay) => (
              <div key={overlay.label} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                <div className="flex items-center gap-2">
                  {overlay.icon === CloverIcon ? (
                    <CloverIcon className="w-4 h-4 text-primary" />
                  ) : (
                    <overlay.icon className="w-4 h-4 text-muted-foreground" />
                  )}
                  <span className="text-sm font-medium">{overlay.label}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  overlay.tier === "gold" 
                    ? "bg-accent/15 text-accent" 
                    : "bg-primary/15 text-primary"
                }`}>
                  {overlay.tier === "gold" ? "Gold" : "Free"}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Play;
