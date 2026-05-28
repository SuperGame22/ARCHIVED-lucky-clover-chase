import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Career from "./pages/Career";
import Play from "./pages/Play";
import Practice from "./pages/Practice";
import LuckyCoach from "./pages/LuckyCoach";
import LuckySpin from "./pages/LuckySpin";
import GoldMachine from "./pages/GoldMachine";
import Wallet from "./pages/Wallet";
import Profile from "./pages/Profile";
import Course from "./pages/Course";
import Rangefinder from "./pages/Rangefinder";
import PuttingGame from "./pages/PuttingGame";
import NotFound from "./pages/NotFound";
import BottomNav from "./components/BottomNav";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-black text-white font-sans antialiased overflow-x-hidden">
          <div className="max-w-md mx-auto min-h-screen shadow-2xl relative bg-zinc-950 pb-20">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/career" element={<Career />} />
              <Route path="/play" element={<Play />} />
              <Route path="/practice" element={<Practice />} />
              <Route path="/practice/putting" element={<PuttingGame />} />
              <Route path="/practice/rangefinder" element={<Rangefinder />} />
              <Route path="/coach" element={<LuckyCoach />} />
              <Route path="/lucky-spin" element={<LuckySpin />} />
              <Route path="/gold-machine" element={<GoldMachine />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/courses" element={<Course />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <BottomNav />
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;