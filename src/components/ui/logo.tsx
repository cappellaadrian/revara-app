"use client";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "full" | "icon" | "wordmark";
  theme?: "dark" | "light";
}

export function Logo({ size = "md", variant = "full", theme = "dark" }: LogoProps) {
  const sizes = {
    sm: { icon: "w-7 h-7", text: "text-sm", sub: "text-[9px]", iconText: "text-xs", gap: "gap-2" },
    md: { icon: "w-9 h-9", text: "text-lg", sub: "text-[10px]", iconText: "text-sm", gap: "gap-2.5" },
    lg: { icon: "w-11 h-11", text: "text-2xl", sub: "text-xs", iconText: "text-base", gap: "gap-3" },
    xl: { icon: "w-14 h-14", text: "text-3xl", sub: "text-sm", iconText: "text-xl", gap: "gap-3.5" },
  };

  const s = sizes[size];
  const textColor = theme === "dark" ? "text-white" : "text-[#111827]";
  const subColor = theme === "dark" ? "text-slate-500" : "text-[#9CA3AF]";

  const IconMark = () => (
    <div className={`${s.icon} relative rounded-xl overflow-hidden flex-shrink-0`} style={{
      background: "linear-gradient(135deg, #2563EB 0%, #7C3AED 50%, #06B6D4 100%)",
    }}>
      {/* Geometric construction shape */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-white font-black ${s.iconText} tracking-tighter`} style={{ fontFamily: "'Inter', sans-serif" }}>B</span>
      </div>
      {/* Subtle grid overlay for "construction" feel */}
      <div className="absolute inset-0 opacity-[0.08]" style={{
        backgroundImage: "linear-gradient(0deg, white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
        backgroundSize: "33.3% 33.3%",
      }} />
    </div>
  );

  if (variant === "icon") return <IconMark />;

  if (variant === "wordmark") return (
    <span className={`font-extrabold ${s.text} ${textColor} tracking-tight`} style={{ fontFamily: "'Inter', sans-serif" }}>
      REVA<span className="bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500 bg-clip-text text-transparent">RA</span>
    </span>
  );

  return (
    <div className={`flex items-center ${s.gap}`}>
      <IconMark />
      <div>
        <h1 className={`font-extrabold ${s.text} ${textColor} tracking-tight leading-none`} style={{ fontFamily: "'Inter', sans-serif" }}>
          REVA<span className="bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500 bg-clip-text text-transparent">RA</span>
        </h1>
        {size !== "sm" && <p className={`${s.sub} ${subColor} mt-0.5 font-medium tracking-wide`}>CONSTRUCTION INTELLIGENCE</p>}
      </div>
    </div>
  );
}
