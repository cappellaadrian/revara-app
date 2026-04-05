"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./sidebar";
import { AuthGuard } from "./auth-guard";

const publicRoutes = ["/", "/login", "/register", "/simulate", "/viewer", "/estimate", "/build", "/plans", "/chat", "/assemblies", "/dashboard", "/projects"];
const publicPrefixes = ["/share/"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isPublic = publicRoutes.includes(pathname) || publicPrefixes.some(p => pathname.startsWith(p));

  if (isPublic) return <>{children}</>;

  return (
    <AuthGuard>
      <div className="flex min-h-screen">
        <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-[#0F1117] border-b border-white/5 h-14 flex items-center justify-between px-3">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-white/5 text-white">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <span className="font-extrabold text-white">REVARA</span>
          <div className="w-10" />
        </div>
        {sidebarOpen && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden" onClick={() => setSidebarOpen(false)} />}
        <div className={`fixed md:static z-50 md:z-auto transform transition-transform duration-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
          <Sidebar onNavigate={() => setSidebarOpen(false)} />
        </div>
        <main className="flex-1 overflow-auto min-w-0 bg-[#F8F9FC]">
          <div className="md:hidden h-14" />
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
