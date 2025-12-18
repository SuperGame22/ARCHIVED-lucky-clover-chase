import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Clock, MapPin, Send, Check, X, DollarSign, Trophy, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CloverIcon } from "@/components/icons/CloverIcon";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "sonner";

interface Player {
  id: string;
  name: string;
  luckyLevel: number;
  avatar: string;
}

interface TeeTimeInvite {
  id: string;
  courseName: string;
  date: string;
  time: string;
  host: Player;
  acceptedPlayers: Player[];
  maxPlayers: number;
  isCompetition?: boolean;
  buyIn?: number;
  potTotal?: number;
}

const mockPlayers: Player[] = [
  { id: "1", name: "Paddy O'Birdie", luckyLevel: 3, avatar: "🧔" },
  { id: "2", name: "Sean Fairway", luckyLevel: 3, avatar: "👨" },
  { id: "3", name: "Molly Mulligan", luckyLevel: 4, avatar: "👩" },
  { id: "4", name: "Finn McPutter", luckyLevel: 3, avatar: "🧑" },
];

const mockInvites: TeeTimeInvite[] = [
  {
    id: "inv1",
    courseName: "Pebble Beach",
    date: "Tomorrow",
    time: "8:30 AM",
    host: { id: "5", name: "Liam Links", luckyLevel: 3, avatar: "👴" },
    acceptedPlayers: [
      { id: "6", name: "Erin Eagle", luckyLevel: 3, avatar: "👱‍♀️" },
    ],
    maxPlayers: 4,
    isCompetition: true,
    buyIn: 20,
    potTotal: 40,
  },
];

const BUY_IN_OPTIONS = [5, 10, 20, 50];

interface FindPlayersProps {
  userLuckyLevel: number;
}

export const FindPlayers = ({ userLuckyLevel }: FindPlayersProps) => {
  const [showCreateInvite, setShowCreateInvite] = useState(false);
  const [invites, setInvites] = useState(mockInvites);
  const [isCompetition, setIsCompetition] = useState(false);
  const [selectedBuyIn, setSelectedBuyIn] = useState(20);
  
  const { balance, deductFunds } = useWallet();

  const handleAcceptInvite = async (inviteId: string) => {
    const invite = invites.find((inv) => inv.id === inviteId);
    if (!invite) return;

    // Check if competition and handle payment
    if (invite.isCompetition && invite.buyIn) {
      if (balance < invite.buyIn) {
        toast.error(`Insufficient funds. Need $${invite.buyIn.toFixed(2)}`);
        return;
      }

      const success = await deductFunds(invite.buyIn, "buy_in", `Competition buy-in: ${invite.courseName}`);
      if (!success) return;
    }

    setInvites((prev) =>
      prev.map((inv) => {
        if (inv.id === inviteId && inv.acceptedPlayers.length < inv.maxPlayers - 1) {
          const updated = {
            ...inv,
            acceptedPlayers: [
              ...inv.acceptedPlayers,
              { id: "me", name: "You", luckyLevel: userLuckyLevel, avatar: "🍀" },
            ],
            potTotal: inv.isCompetition ? (inv.potTotal || 0) + (inv.buyIn || 0) : undefined,
          };
          
          if (updated.acceptedPlayers.length === inv.maxPlayers - 1) {
            toast.success("Foursome complete! Tee time confirmed! ⛳");
          } else {
            toast.success("You're in! Waiting for more players...");
          }
          
          return updated;
        }
        return inv;
      })
    );
  };

  const handleCreateInvite = async () => {
    // If competition, check balance
    if (isCompetition) {
      if (balance < selectedBuyIn) {
        toast.error(`Insufficient funds. Need $${selectedBuyIn.toFixed(2)}`);
        return;
      }

      const success = await deductFunds(selectedBuyIn, "buy_in", "Competition buy-in (host)");
      if (!success) return;
    }

    const newInvite: TeeTimeInvite = {
      id: `inv-${Date.now()}`,
      courseName: "Pebble Beach",
      date: "Saturday",
      time: "9:00 AM",
      host: { id: "me", name: "You", luckyLevel: userLuckyLevel, avatar: "🍀" },
      acceptedPlayers: [],
      maxPlayers: 4,
      isCompetition,
      buyIn: isCompetition ? selectedBuyIn : undefined,
      potTotal: isCompetition ? selectedBuyIn : undefined,
    };
    setInvites((prev) => [newInvite, ...prev]);
    setShowCreateInvite(false);
    toast.success(
      isCompetition 
        ? `Competition created! $${selectedBuyIn} pot started 🏆` 
        : "Tee time invite sent to players at your Lucky Level!"
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-primary/20 rounded-xl">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-bold">Find Yer Foursome</h3>
            <p className="text-xs text-muted-foreground">
              Connect with players at your Lucky Level
            </p>
          </div>
        </div>

        {/* Available players at similar level */}
        <div className="flex items-center gap-2 mb-4">
          <p className="text-sm text-muted-foreground">Players nearby:</p>
          <div className="flex -space-x-2">
            {mockPlayers.slice(0, 4).map((player) => (
              <div
                key={player.id}
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-lg border-2 border-background"
                title={player.name}
              >
                {player.avatar}
              </div>
            ))}
          </div>
          <span className="text-xs text-primary font-medium">+12 more</span>
        </div>

        <Button
          variant="lucky"
          className="w-full"
          onClick={() => setShowCreateInvite(true)}
        >
          <Send className="w-4 h-4 mr-2" />
          Create Tee Time Invite
        </Button>
      </div>

      {/* Create Invite Modal */}
      <AnimatePresence>
        {showCreateInvite && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card p-4 border-2 border-primary/30"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-display font-bold">New Tee Time</h4>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowCreateInvite(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>Pebble Beach Golf Links</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>Saturday, 9:00 AM</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CloverIcon className="w-4 h-4 text-primary" />
                <span>
                  Inviting players at <strong>Lucky Level 3</strong>
                </span>
              </div>
            </div>

            {/* Competition Toggle */}
            <div className="bg-muted/50 rounded-xl p-4 mb-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-accent" />
                  <Label htmlFor="competition-mode" className="font-medium">
                    Competition Mode
                  </Label>
                </div>
                <Switch
                  id="competition-mode"
                  checked={isCompetition}
                  onCheckedChange={setIsCompetition}
                />
              </div>

              <AnimatePresence>
                {isCompetition && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3"
                  >
                    <p className="text-xs text-muted-foreground">
                      Winner takes all! Lowest score wins the pot.
                    </p>
                    
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">Buy-in Amount</Label>
                      <div className="grid grid-cols-4 gap-2">
                        {BUY_IN_OPTIONS.map((amount) => (
                          <Button
                            key={amount}
                            variant={selectedBuyIn === amount ? "lucky" : "outline"}
                            size="sm"
                            onClick={() => setSelectedBuyIn(amount)}
                            className="text-sm"
                          >
                            ${amount}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm bg-accent/10 rounded-lg p-3">
                      <span className="text-muted-foreground">Pot Total (4 players):</span>
                      <span className="font-bold text-accent">${selectedBuyIn * 4}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Wallet className="w-3 h-3" />
                      <span>Your balance: ${balance.toFixed(2)}</span>
                      {balance < selectedBuyIn && (
                        <span className="text-destructive">(Need ${(selectedBuyIn - balance).toFixed(2)} more)</span>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Button 
              variant="lucky" 
              className="w-full" 
              onClick={handleCreateInvite}
              disabled={isCompetition && balance < selectedBuyIn}
            >
              {isCompetition ? (
                <>
                  <Trophy className="w-4 h-4 mr-2" />
                  Create ${selectedBuyIn} Competition
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Invite to 12 Players
                </>
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Invites */}
      {invites.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground px-1">
            Open Tee Times
          </h4>
          {invites.map((invite) => {
            const spotsLeft = invite.maxPlayers - 1 - invite.acceptedPlayers.length;
            const isFull = spotsLeft === 0;
            const hasJoined = invite.acceptedPlayers.some((p) => p.id === "me");
            const canAfford = !invite.isCompetition || balance >= (invite.buyIn || 0);

            return (
              <motion.div
                key={invite.id}
                layout
                className={`glass-card p-4 ${
                  isFull ? "border-2 border-primary/50 bg-primary/5" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{invite.courseName}</p>
                      {invite.isCompetition && (
                        <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                          <Trophy className="w-3 h-3" />
                          ${invite.potTotal} Pot
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {invite.date} at {invite.time}
                    </p>
                  </div>
                  {isFull ? (
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full font-medium">
                      Foursome Complete! ⛳
                    </span>
                  ) : (
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                      {spotsLeft} spot{spotsLeft !== 1 ? "s" : ""} left
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex -space-x-2">
                    <div
                      className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-lg border-2 border-background"
                      title={invite.host.name}
                    >
                      {invite.host.avatar}
                    </div>
                    {invite.acceptedPlayers.map((player) => (
                      <div
                        key={player.id}
                        className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-lg border-2 border-background"
                        title={player.name}
                      >
                        {player.avatar}
                      </div>
                    ))}
                    {Array.from({ length: spotsLeft }).map((_, i) => (
                      <div
                        key={`empty-${i}`}
                        className="w-8 h-8 rounded-full bg-muted/50 border-2 border-dashed border-muted-foreground/30 flex items-center justify-center"
                      >
                        <span className="text-muted-foreground/50 text-xs">?</span>
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Hosted by {invite.host.name}
                  </span>
                </div>

                {!isFull && !hasJoined && invite.host.id !== "me" && (
                  <Button
                    variant={invite.isCompetition ? "default" : "outline"}
                    size="sm"
                    className={`w-full ${invite.isCompetition ? "bg-accent hover:bg-accent/90 text-accent-foreground" : ""}`}
                    onClick={() => handleAcceptInvite(invite.id)}
                    disabled={!canAfford}
                  >
                    {invite.isCompetition ? (
                      <>
                        <DollarSign className="w-4 h-4 mr-1" />
                        Join for ${invite.buyIn}
                        {!canAfford && " (Insufficient funds)"}
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Join This Foursome
                      </>
                    )}
                  </Button>
                )}

                {hasJoined && !isFull && (
                  <p className="text-center text-sm text-primary font-medium">
                    You're in! Waiting for more players...
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};
