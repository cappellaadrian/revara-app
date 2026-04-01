"use client";
// REVARA Landing Page

const connectors = [
  { name: "Revit", tools: 98, status: "live", color: "from-blue-500 to-cyan-500", icon: "🏗️", versions: "2020–2026", port: "TCP 8080", language: "C#" },
  { name: "Rhino", tools: 40, status: "live", color: "from-emerald-500 to-teal-500", icon: "🦏", versions: "7 & 8 + Grasshopper", port: "TCP 9080", language: "Python" },
  { name: "ArchiCAD", tools: 35, status: "live", color: "from-amber-500 to-orange-500", icon: "🏠", versions: "25–28", port: "HTTP 19723", language: "JSON API" },
  { name: "SketchUp", tools: 35, status: "live", color: "from-red-500 to-rose-500", icon: "💎", versions: "2023+", port: "TCP 9090", language: "Ruby" },
  { name: "Blender", tools: 40, status: "live", color: "from-violet-500 to-purple-500", icon: "🎨", versions: "3.6+", port: "TCP 9876", language: "Python" },
];

const toolCategories = [
  { name: "Model Creation", count: 45, examples: "Walls, floors, roofs, stairs, curtain walls, MEP, framing, families" },
  { name: "Documentation", count: 38, examples: "Views, sheets, annotations, schedules, dimensions, details, smart composer" },
  { name: "MEP/HVAC", count: 25, examples: "Ducts, pipes, cable trays, auto-routing, equipment placement" },
  { name: "Structure", count: 20, examples: "Rebar, framing systems, columns, beams, foundations" },
  { name: "Coordination", count: 22, examples: "Clash detection, linked models, worksets, phases, compliance" },
  { name: "Intelligence", count: 30, examples: "Cost estimation, space planning, reports, health check, parametric explorer" },
  { name: "Export & Render", count: 18, examples: "PDF, IFC, DWG, NWC, images, walkthroughs, 3D viewer" },
  { name: "Data & Analysis", count: 50, examples: "Property extraction, material quantities, IFC analysis, Excel export" },
];

const competitors = [
  { name: "VIKTOR", price: "Enterprise $$$$", tools: "Build your own", approach: "Python parametric platform" },
  { name: "Nonica", price: "€85/yr", tools: "50+", approach: "Revit toolbar + MCP" },
  { name: "Atenea", price: "Paid", tools: "~30", approach: "AI modeler + screen control" },
  { name: "Speckle", price: "Free–$9/mo", tools: "Viewers only", approach: "Data hub + connectors" },
  { name: "REVARA", price: "Free & Open Source", tools: "248", approach: "Direct AI-to-BIM across 5 apps" },
];

export default function RevaraHome() {
  return (
    <div className="min-h-screen bg-[#050507] text-white overflow-hidden">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[#050507]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6, #06B6D4)" }}>
              <span className="text-white font-black text-sm">R</span>
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight">REVARA</span>
              <span className="text-[10px] text-zinc-500 ml-2 hidden sm:inline">AI BIM PLATFORM</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-500">
            <a href="#connectors" className="hover:text-white transition-colors">Connectors</a>
            <a href="#tools" className="hover:text-white transition-colors">Tools</a>
            <a href="#compare" className="hover:text-white transition-colors">Compare</a>
            <a href="#connect" className="hover:text-white transition-colors">Connect</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://capflow-bim.vercel.app" className="text-sm text-zinc-400 hover:text-white transition-colors px-3 py-1.5">BuiltIQ Studio</a>
            <a href="#connect" className="text-sm bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-violet-600/20">Get Started</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 relative">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-violet-600/15 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-60 left-1/4 w-[300px] h-[300px] bg-cyan-600/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-zinc-400 mb-8">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            248 tools · 5 software platforms · Open source
          </div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[0.95]">
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">AI meets BIM.</span>
            <br />
            <span className="text-white/90">Every platform.</span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 mt-8 max-w-2xl mx-auto leading-relaxed">
            One AI that controls Revit, Rhino, ArchiCAD, SketchUp, and Blender.
            248 tools. Natural language. No code required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <a href="#connect" className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-[15px] font-semibold transition-all hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", boxShadow: "0 8px 32px rgba(139,92,246,0.3)" }}>
              Connect Your Software
            </a>
            <a href="https://capflow-bim.vercel.app" className="w-full sm:w-auto px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[15px] font-medium transition-all">
              Open BuiltIQ Studio →
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-5 gap-6">
          {[
            { value: "248", label: "Total Tools" },
            { value: "5", label: "Software Platforms" },
            { value: "98", label: "Revit Tools" },
            { value: "150+", label: "Tool Categories" },
            { value: "Free", label: "Open Source" },
          ].map(s => (
            <div key={s.label} className="text-center">
              <p className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">{s.value}</p>
              <p className="text-xs text-zinc-600 mt-1 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Connectors */}
      <section id="connectors" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-violet-400 uppercase tracking-widest mb-3">Connectors</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">Five platforms. One AI brain.</h2>
            <p className="text-zinc-500 mt-4 max-w-xl mx-auto">Each connector speaks the native language of its software. Same Claude AI, different interpreters.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {connectors.map(c => (
              <div key={c.name} className="group relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all hover:border-white/10 hover:-translate-y-1 overflow-hidden">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${c.color} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity`} />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{c.icon}</span>
                      <div>
                        <h3 className="text-lg font-bold">{c.name}</h3>
                        <p className="text-xs text-zinc-500">{c.versions}</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold uppercase tracking-wider rounded-full border border-emerald-500/20">Live</span>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                    <div>
                      <p className="text-2xl font-black">{c.tools}</p>
                      <p className="text-[10px] text-zinc-600 uppercase tracking-wider">Tools</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-zinc-400 font-mono">{c.port}</p>
                      <p className="text-[10px] text-zinc-600">{c.language}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* BuiltIQ Studio card */}
            <div className="group p-6 rounded-2xl border border-violet-500/20 bg-violet-600/5 hover:bg-violet-600/10 transition-all hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🌐</span>
                <div>
                  <h3 className="text-lg font-bold">BuiltIQ Studio</h3>
                  <p className="text-xs text-zinc-500">Web App — PM, Takeoff, Estimation</p>
                </div>
              </div>
              <p className="text-sm text-zinc-400 mb-4">27 pages, 58 APIs, 3D viewer, cost estimation, project management. Connected via TCP bridge.</p>
              <a href="https://capflow-bim.vercel.app" className="inline-flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300 font-medium">
                Open Studio →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section id="tools" className="py-24 px-6 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-3">248 Tools</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">Everything you can automate</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {toolCategories.map(cat => (
              <div key={cat.name} className="p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-semibold">{cat.name}</h3>
                  <span className="text-xs font-bold text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full">{cat.count}</span>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">{cat.examples}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-cyan-400 uppercase tracking-widest mb-3">Architecture</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">How REVARA works</h2>
          </div>

          <div className="relative">
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: "You", desc: "Talk to Claude in natural language. \"Create a 3-story office with curtain walls.\"", icon: "💬" },
                { step: "REVARA MCP", desc: "Claude picks the right tools from 248 available. Converts your words to commands.", icon: "🧠" },
                { step: "Connector", desc: "Commands sent via TCP/HTTP to the native plugin running inside your BIM software.", icon: "🔌" },
                { step: "Your Model", desc: "Walls, floors, roofs, MEP, schedules — built automatically in your software.", icon: "🏢" },
              ].map((s, i) => (
                <div key={s.step} className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 flex items-center justify-center text-3xl mx-auto mb-4">{s.icon}</div>
                  <div className="text-[10px] text-zinc-600 uppercase tracking-widest mb-1">Step {i + 1}</div>
                  <h3 className="font-bold mb-2">{s.step}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
            {/* Connection line */}
            <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-px bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-cyan-500/20" />
          </div>
        </div>
      </section>

      {/* Compare */}
      <section id="compare" className="py-24 px-6 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-emerald-400 uppercase tracking-widest mb-3">Comparison</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">The numbers speak</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="pb-3 text-left text-zinc-500 font-medium">Platform</th>
                  <th className="pb-3 text-center text-zinc-500 font-medium">Price</th>
                  <th className="pb-3 text-center text-zinc-500 font-medium">Tools</th>
                  <th className="pb-3 text-left text-zinc-500 font-medium">Approach</th>
                </tr>
              </thead>
              <tbody>
                {competitors.map(c => (
                  <tr key={c.name} className={`border-b border-white/5 ${c.name === "REVARA" ? "bg-violet-600/5" : ""}`}>
                    <td className="py-4 font-semibold">{c.name === "REVARA" ? <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">{c.name}</span> : c.name}</td>
                    <td className="py-4 text-center">{c.name === "REVARA" ? <span className="text-emerald-400 font-bold">{c.price}</span> : <span className="text-zinc-500">{c.price}</span>}</td>
                    <td className="py-4 text-center">{c.name === "REVARA" ? <span className="text-white font-black text-lg">{c.tools}</span> : <span className="text-zinc-500">{c.tools}</span>}</td>
                    <td className="py-4 text-zinc-400 text-xs">{c.approach}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Connect / Get Started */}
      <section id="connect" className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">Connect in 3 steps</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-12 text-left">
            {[
              { step: "1", title: "Install Plugin", desc: "Load the REVARA plugin into your BIM software. Revit: drop the .dll in the addins folder. Rhino: run the Python script." },
              { step: "2", title: "Start MCP Server", desc: "Run npx revara-mcp in your terminal. The server bridges Claude to your software via TCP." },
              { step: "3", title: "Talk to Claude", desc: "Open Claude Desktop or BuiltIQ Studio. Start describing what you want to build. AI does the rest." },
            ].map(s => (
              <div key={s.step} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                <div className="text-4xl font-black text-white/5 mb-3">{s.step}</div>
                <h3 className="font-bold mb-2">{s.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-2xl border border-violet-500/20 bg-violet-600/5">
            <p className="text-zinc-400 text-sm mb-4">Quick start for Revit:</p>
            <code className="block bg-black/50 rounded-lg p-4 text-sm text-emerald-400 font-mono text-left">
              npx mcp-server-for-revit
            </code>
            <p className="text-zinc-600 text-xs mt-3">Requires Revit 2020+ with RevitMCPPlugin.dll loaded</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-violet-600/10 to-transparent pointer-events-none" />
        <div className="relative max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">Ready to automate your BIM?</h2>
          <p className="text-zinc-400 mt-4 text-lg">248 tools. 5 platforms. Free forever.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a href="https://capflow-bim.vercel.app/register" className="px-10 py-4 rounded-xl text-lg font-semibold transition-all hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", boxShadow: "0 8px 32px rgba(139,92,246,0.3)" }}>
              Start with BuiltIQ Studio
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)" }}>
              <span className="text-white font-black text-[10px]">R</span>
            </div>
            <span className="font-extrabold text-sm">REVARA</span>
            <span className="text-[10px] text-zinc-700 ml-1">by Cappella</span>
          </div>
          <div className="flex gap-6 text-xs text-zinc-600">
            <a href="#connectors" className="hover:text-white transition-colors">Connectors</a>
            <a href="#tools" className="hover:text-white transition-colors">Tools</a>
            <a href="https://capflow-bim.vercel.app" className="hover:text-white transition-colors">BuiltIQ Studio</a>
          </div>
          <p className="text-[10px] text-zinc-700">&copy; 2026 REVARA by Cappella. Open source under Apache 2.0.</p>
        </div>
      </footer>
    </div>
  );
}
