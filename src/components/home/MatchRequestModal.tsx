import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MatchRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MatchRequestModal = ({ isOpen, onClose }: MatchRequestModalProps) => {
  const [autoClose, setAutoClose] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    
    if (autoClose) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="glass-card p-5 space-y-4 border-2 border-primary/50"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-xl">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-bold">Match Request!</h3>
                <p className="text-xs text-muted-foreground">New player wants to join</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-sm font-medium">@Golfer123</p>
            <p className="text-xs text-muted-foreground">Lucky Level 4 • 1.2 mi away</p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="flex-1"
            >
              Decline
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                setAutoClose(false);
                setTimeout(onClose, 500);
              }}
              className="flex-1 bg-primary hover:bg-primary/90 gap-2"
            >
              <Check className="w-4 h-4" />
              Accept
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
