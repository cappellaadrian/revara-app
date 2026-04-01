"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Logo } from "@/components/ui/logo";

const navItems = [
  { name: "Master Builder", href: "/build", emoji: "⚡" },
  { name: "Plans & Takeoff", href: "/plans", emoji: "📐" },
  { name: "3D Viewer", href: "/viewer", emoji: "🧊" },
  { name: "AI Chat", href: "/chat", emoji: "🤖" },
  { name: "Cost Estimate", href: "/estimate", emoji: "💰" },
  { name: "Assemblies", href: "/assemblies", emoji: "🧱" },
];

export function Sidebar({ onNavigate }: { onNavigate?: () => void } = {}) {
  const pathname = usePathname();

  return (
    <aside className="w-56 bg-[#0F1117] flex flex-col h-screen sticky top-0 text-zinc-300">
      <div className="px-4 py-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6, #06B6D4)" }}>
            <span className="text-white font-black text-sm">R</span>
          </div>
          <div>
            <h1 className="font-extrabold text-white text-base tracking-tight">REVARA</h1>
            <p className="text-[10px] text-zinc-600">AI BIM Platform</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-2 space-y-0.5">
        {navItems.map(item => {
          const active = pathname === item.href || pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} onClick={onNavigate}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-all ${
                active ? "bg-violet-600/20 text-violet-400 font-medium" : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }`}>
              <span className="text-sm w-5 text-center">{item.emoji}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <RevitStatus />
      <UserSection />
    </aside>
  );
}

function RevitStatus() {
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    const check = async () => { try { const r = await fetch("/api/revit/status"); const d = await r.json(); setConnected(d.connected); } catch {} };
    check(); const i = setInterval(check, 15000); return () => clearInterval(i);
  }, []);
  return (
    <div className="px-4 py-2 border-t border-white/5">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${connected ? "bg-emerald-400 shadow-sm shadow-emerald-400/50" : "bg-zinc-700"}`} />
        <span className="text-[11px] text-zinc-500">{connected ? "Revit Connected" : "Revit Offline"}</span>
      </div>
    </div>
  );
}

function UserSection() {
  const { data: session } = useSession();
  if (!session?.user) return null;
  return (
    <div className="px-3 py-2.5 border-t border-white/5 flex items-center gap-2">
      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)" }}>
        <span className="text-white font-bold text-[10px]">{session.user.name?.charAt(0)?.toUpperCase()}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-medium text-zinc-300 truncate">{session.user.name}</p>
      </div>
      <button onClick={() => signOut({ callbackUrl: "/login" })} className="text-zinc-600 hover:text-red-400" title="Sign out">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
      </button>
    </div>
  );
}
