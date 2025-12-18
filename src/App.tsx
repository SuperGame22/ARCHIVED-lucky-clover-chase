import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "@/contexts/WalletContext";
import Index from "./pages/Index";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <WalletProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/rangefinder" element={<Rangefinder />} />
            <Route path="/course" element={<Course />} />
            <Route path="/gold-machine" element={<GoldMachine />} />
            <Route path="/spin" element={<LuckySpin />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/scorecard" element={<Scorecard />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </WalletProvider>
  </QueryClientProvider>
);

export default App;
