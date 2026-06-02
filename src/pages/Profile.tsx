import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { CloverIcon } from "@/components/icons/CloverIcon";
import { GoldCoinIcon } from "@/components/icons/GoldCoinIcon";
import {
  User,
  Settings,
  Trophy,
  Target,
  Calendar,
  ChevronRight,
  Crown,
  LogOut,
  Camera,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const stats = [
  { label: "Rounds Played", value: "42", icon: Target },
  { label: "Best Score", value: "78", icon: Trophy },
  { label: "Clovers Found", value: "156", icon: CloverIcon },
  { label: "Member Since", value: "Mar '24", icon: Calendar },
];

const menuItems = [
  { label: "Membership", path: "/membership", icon: Crown },
  { label: "Scorecard History", path: "/scorecard", icon: Trophy },
  { label: "Settings", path: "/settings", icon: Settings },
];

const Profile = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const { data: profile } = await supabase
          .from("golfer_profiles")
          .select("avatar_url")
          .eq("user_id", user.id)
          .single();
        
        if (profile?.avatar_url) {
          setAvatarUrl(profile.avatar_url);
        }
      }
    };
    fetchProfile();
  }, []);

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from("golfer_profiles")
        .update({ avatar_url: publicUrl })
        .eq("user_id", user.id);

      if (updateError) throw updateError;

      setAvatarUrl(publicUrl);
      toast.success("Profile picture updated!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 text-center"
        >
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="w-full h-full bg-gradient-to-br from-primary to-lucky-emerald rounded-full flex items-center justify-center overflow-hidden border-4 border-green-500/20">
              {avatarUrl ? (
                <img src={avatarUrl} className="w-full h-full object-cover" alt="avatar" />
              ) : (
                <User className="w-12 h-12 text-primary-foreground" />
              )}
              {uploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-white" />
                </div>
              )}
            </div>
            <label className="absolute bottom-0 right-0 bg-primary p-2 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-lg">
              <Camera size={16} className="text-primary-foreground" />
              <input 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={uploadAvatar} 
                disabled={uploading}
              />
            </label>
          </div>
          <h1 className="text-2xl font-display font-bold mb-1">Lucky Player</h1>
          <p className="text-muted-foreground text-sm mb-4">@luckygolfer</p>

          <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full">
            <CloverIcon className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Free Member</span>
          </div>
        </motion.div>

        {/* Balance Cards */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <CloverIcon className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground font-bold uppercase tracking-tight">Clovers</span>
            </div>
            <p className="text-3xl font-display font-black text-primary">47</p>
            <p className="text-[10px] text-muted-foreground font-bold uppercase">$11.75 CREDIT</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <GoldCoinIcon className="w-5 h-5 text-accent" />
              <span className="text-sm text-muted-foreground font-bold uppercase tracking-tight">Gold Pot</span>
            </div>
            <p className="text-3xl font-display font-black text-accent">$4.72</p>
            <p className="text-[10px] text-muted-foreground font-bold uppercase">4,720MG COLLECTED</p>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-5"
        >
          <h3 className="font-display font-black uppercase text-lg mb-4 italic text-green-500">Your Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl border border-white/5" key={index}>
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-black">{stat.value}</p>
                    <p className="text-[10px] font-bold uppercase opacity-50">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Menu Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card overflow-hidden"
        >
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors border-b border-white/5 last:border-0"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-muted-foreground" />
                <span className="font-bold uppercase text-sm tracking-tight">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
          ))}
        </motion.div>

        {/* Logout */}
        <Button variant="outline" className="w-full gap-2 border-red-500/20 text-red-500 hover:bg-red-500/10 font-bold uppercase tracking-widest text-xs h-12">
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </AppLayout>
  );
};

export default Profile;