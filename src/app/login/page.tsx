"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    const result = await signIn("credentials", { email: form.email, password: form.password, redirect: false });
    if (result?.error) { setError("Invalid email or password"); setLoading(false); }
    else { router.push("/"); router.refresh(); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#F8F9FC', backgroundImage: 'radial-gradient(circle, #E5E7EB 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      <div className="w-full max-w-[400px]">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-5">
            <Logo size="lg" theme="light" variant="icon" />
          </div>
          <h1 className="text-[22px] font-semibold text-[#111827]">Welcome back</h1>
          <p className="text-[14px] text-[#6B7280] mt-1">Sign in to your <Logo size="sm" theme="light" variant="wordmark" /> account</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)' }}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[13px] font-medium text-[#374151] mb-1.5">Email address</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-[#E5E7EB] rounded-[10px] text-[14px] text-[#111827] placeholder-[#9CA3AF] transition-all"
                placeholder="you@company.com" required />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[13px] font-medium text-[#374151]">Password</label>
                <button type="button" className="text-[12px] text-[#2563EB] hover:text-[#1D4ED8] font-medium">Forgot?</button>
              </div>
              <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-[#E5E7EB] rounded-[10px] text-[14px] text-[#111827] placeholder-[#9CA3AF] transition-all"
                placeholder="Enter your password" required />
            </div>

            {error && (
              <div className="flex items-center gap-2 px-3.5 py-2.5 bg-[#FEF2F2] border border-[#FECACA] rounded-[10px]">
                <svg className="w-4 h-4 text-[#DC2626] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                <span className="text-[13px] text-[#DC2626] font-medium">{error}</span>
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] text-white rounded-[10px] text-[14px] font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ boxShadow: '0 1px 3px rgba(37,99,235,0.3)' }}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>

        <p className="text-center text-[13px] text-[#6B7280] mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-[#2563EB] font-medium hover:text-[#1D4ED8]">Create one</Link>
        </p>

        <p className="text-center text-[11px] text-[#9CA3AF] mt-8">
          REVARA AI BIM Platform
        </p>
      </div>
    </div>
  );
}
