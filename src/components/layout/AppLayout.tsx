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
    <div className="min-h-screen bg-background bg-celtic-knot">
      {!hideHeader && <Header />}
      <main className={`${!hideNav ? "pb-20" : ""}`}>
        {children}
      </main>
      {!hideNav && <BottomNav />}
    </div>
  );
};
