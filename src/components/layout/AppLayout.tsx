import { ReactNode } from "react";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";

interface AppLayoutProps {
  children: ReactNode;
  hideHeader?: boolean;
  hideNav?: boolean;
}

export const AppLayout = ({ children, hideHeader = false, hideNav = false }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background relative">
      <div 
        className="absolute inset-0 bg-celtic-knot opacity-[0.06] pointer-events-none"
        style={{ backgroundSize: '120px 120px' }}
      />
      <div className="relative z-10">
        {!hideHeader && <Header />}
        <main className={`${!hideNav ? "pb-20" : ""}`}>
          {children}
        </main>
        {!hideNav && <BottomNav />}
      </div>
    </div>
  );
};
