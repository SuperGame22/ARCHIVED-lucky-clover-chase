import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "@/contexts/WalletContext";
import { CloverProvider } from "@/contexts/CloverContext";
import Index from "./pages/Index";
import Practice from "./pages/Practice";
import LuckyCoach from "./pages/LuckyCoach";
import Play from "./pages/Play";
import Career from "./pages/Career";
import Earn from "./pages/Earn";
import Rangefinder from "./pages/Rangefinder";
import Course from "./pages/Course";
import GoldMachine from "./pages/GoldMachine";
import LuckySpin from "./pages/LuckySpin";
import Shop from "./pages/Shop";
import Membership from "./pages/Membership";
import Profile from "./pages/Profile";
import Scorecard from "./pages/Scorecard";
import Chat from "./pages/Chat";
import Wallet from "./pages/Wallet";
import Auth from "./pages/Auth";
import FoursomeFinder from "./pages/FoursomeFinder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <WalletProvider>
      <CloverProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Home */}
              <Route path="/" element={<Index />} />

              {/* Practice domain */}
              <Route path="/practice" element={<Practice />} />
              <Route path="/practice/coach" element={<LuckyCoach />} />
              <Route path="/rangefinder" element={<Rangefinder />} />

              {/* Play domain */}
              <Route path="/play" element={<Play />} />
              <Route path="/course" element={<Course />} />
              <Route path="/scorecard" element={<Scorecard />} />
              <Route path="/foursome-finder" element={<FoursomeFinder />} />

              {/* Career domain */}
              <Route path="/career" element={<Career />} />

              {/* Earn domain */}
              <Route path="/earn" element={<Earn />} />
              <Route path="/gold-machine" element={<GoldMachine />} />
              <Route path="/spin" element={<LuckySpin />} />
              <Route path="/shop" element={<Shop />} />

              {/* Shared */}
              <Route path="/membership" element={<Membership />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CloverProvider>
    </WalletProvider>
  </QueryClientProvider>
);

export default App;
