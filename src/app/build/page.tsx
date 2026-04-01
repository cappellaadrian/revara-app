"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { useActiveProject } from "@/lib/hooks";

interface BuildResult {
  success: boolean;
  summary?: { projectName: string; buildingType: string; footprint: string; grossArea: string; rooms: number; walls: number; totalCost: string; costPerSqm: string; city: string; quality: string; duration: string; stepsCompleted: number; stepsTotal: number };
  steps?: { step: string; status: string; result?: unknown; error?: string }[];
  buildingJson?: unknown;
  estimate?: { totalProjectCost: number; costPerSF: number; directCost: number; costPerSqm: number };
  spaceLayout?: { name: string; x: number; y: number; width: number; depth: number; area: number }[];
  error?: string;
}

const buildingTypes = [
  { value: "residential_single_family", label: "Residential House" },
  { value: "apartment_low_rise", label: "Apartment (Low-Rise)" },
  { value: "office_low_rise", label: "Office (Low-Rise)" },
  { value: "retail_strip", label: "Retail Strip" },
  { value: "restaurant", label: "Restaurant" },
  { value: "warehouse", label: "Warehouse" },
  { value: "hotel_mid_range", label: "Hotel (Mid-Range)" },
  { value: "hospital", label: "Hospital" },
  { value: "school_elementary", label: "School" },
];

const presets: Record<string, { rooms: { name: string; targetArea: number; needsWindow?: boolean; isWetRoom?: boolean }[]; footprint: { width: number; depth: number } }> = {
  residential_single_family: {
    footprint: { width: 14000, depth: 10000 },
    rooms: [
      { name: "Living Room", targetArea: 25, needsWindow: true },
      { name: "Kitchen", targetArea: 12, needsWindow: true },
      { name: "Dining Room", targetArea: 14, needsWindow: true },
      { name: "Master Bedroom", targetArea: 16, needsWindow: true },
      { name: "Bedroom 2", targetArea: 12, needsWindow: true },
      { name: "Bedroom 3", targetArea: 10, needsWindow: true },
      { name: "Master Bath", targetArea: 6, isWetRoom: true },
      { name: "Bathroom", targetArea: 4, isWetRoom: true },
      { name: "Entry", targetArea: 4 },
      { name: "Corridor", targetArea: 6 },
    ],
  },
  office_low_rise: {
    footprint: { width: 20000, depth: 15000 },
    rooms: [
      { name: "Lobby", targetArea: 30, needsWindow: true },
      { name: "Open Office", targetArea: 80, needsWindow: true },
      { name: "Meeting Room A", targetArea: 20, needsWindow: true },
      { name: "Meeting Room B", targetArea: 15, needsWindow: true },
      { name: "Private Office 1", targetArea: 15, needsWindow: true },
      { name: "Private Office 2", targetArea: 15, needsWindow: true },
      { name: "Kitchen/Break Room", targetArea: 20, isWetRoom: true },
      { name: "Server Room", targetArea: 10 },
      { name: "Bathroom M", targetArea: 12, isWetRoom: true },
      { name: "Bathroom F", targetArea: 12, isWetRoom: true },
      { name: "Storage", targetArea: 8 },
      { name: "Corridor", targetArea: 15 },
    ],
  },
  apartment_low_rise: {
    footprint: { width: 16000, depth: 12000 },
    rooms: [
      { name: "Living/Dining", targetArea: 28, needsWindow: true },
      { name: "Kitchen", targetArea: 10, needsWindow: true },
      { name: "Master Bedroom", targetArea: 14, needsWindow: true },
      { name: "Bedroom 2", targetArea: 12, needsWindow: true },
      { name: "Bathroom", targetArea: 5, isWetRoom: true },
      { name: "Laundry", targetArea: 4, isWetRoom: true },
      { name: "Balcony", targetArea: 6, needsWindow: true },
      { name: "Entry", targetArea: 3 },
      { name: "Corridor", targetArea: 5 },
    ],
  },
};

const statusIcons: Record<string, { color: string; icon: string }> = {
  success: { color: "text-green-600", icon: "✓" },
  error: { color: "text-red-600", icon: "✗" },
  warning: { color: "text-yellow-600", icon: "!" },
  skipped: { color: "text-gray-400", icon: "−" },
  info: { color: "text-blue-600", icon: "i" },
};

export default function MasterBuilderPage() {
  const { projectId } = useActiveProject();
  const [building, setBuilding] = useState(false);
  const [result, setResult] = useState<BuildResult | null>(null);
  const [form, setForm] = useState({
    buildingType: "residential_single_family",
    width: 14000, depth: 10000, stories: 1,
    city: "national_average", qualityLevel: "standard",
    skipRevit: true, generateDrawings: false, runCompliance: true,
  });
  const [customRooms, setCustomRooms] = useState(presets.residential_single_family.rooms);

  if (!projectId) return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold">Master Builder</h1>
      <Card className="mt-6"><CardContent className="p-12 text-center">
        <h3 className="font-semibold text-lg">No project selected</h3>
        <p className="text-gray-500 mt-1">Go to Projects and create/select a project first. The Master Builder generates everything into your active project.</p>
      </CardContent></Card>
    </div>
  );

  const handleTypeChange = (type: string) => {
    setForm({ ...form, buildingType: type });
    const preset = presets[type];
    if (preset) {
      setForm(f => ({ ...f, width: preset.footprint.width, depth: preset.footprint.depth }));
      setCustomRooms(preset.rooms);
    }
  };

  const handleBuild = async () => {
    setBuilding(true); setResult(null);
    try {
      const res = await fetch("/api/revit/master-builder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          buildingType: form.buildingType,
          footprint: { width: form.width, depth: form.depth },
          rooms: customRooms,
          stories: form.stories,
          city: form.city,
          qualityLevel: form.qualityLevel,
          skipRevit: form.skipRevit,
          generateDrawings: form.generateDrawings,
          runCompliance: form.runCompliance,
        }),
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setResult({ success: false, error: e instanceof Error ? e.message : "Build failed" });
    }
    setBuilding(false);
  };

  const addRoom = () => setCustomRooms([...customRooms, { name: "New Room", targetArea: 10, needsWindow: true }]);
  const removeRoom = (i: number) => setCustomRooms(customRooms.filter((_, j) => j !== i));
  const updateRoom = (i: number, field: string, value: unknown) => {
    const u = [...customRooms];
    (u[i] as Record<string, unknown>)[field] = value;
    setCustomRooms(u);
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Master Builder</h1>
        <p className="text-gray-500 mt-1">One click → floor plan + 3D model + cost estimate + budget + blueprints</p>
      </div>

      {/* Config */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Building Configuration</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-sm font-medium mb-1">Building Type</label>
                <select value={form.buildingType} onChange={e => handleTypeChange(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm">
                  {buildingTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select></div>
              <div><label className="block text-sm font-medium mb-1">Quality</label>
                <select value={form.qualityLevel} onChange={e => setForm({ ...form, qualityLevel: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm">
                  <option value="economy">Economy</option><option value="standard">Standard</option><option value="premium">Premium</option><option value="luxury">Luxury</option>
                </select></div>
              <div><label className="block text-sm font-medium mb-1">Width (mm)</label><input type="number" step="1000" value={form.width} onChange={e => setForm({ ...form, width: Number(e.target.value) })} className="w-full border rounded-lg px-3 py-2 text-sm" /></div>
              <div><label className="block text-sm font-medium mb-1">Depth (mm)</label><input type="number" step="1000" value={form.depth} onChange={e => setForm({ ...form, depth: Number(e.target.value) })} className="w-full border rounded-lg px-3 py-2 text-sm" /></div>
              <div><label className="block text-sm font-medium mb-1">Stories</label><input type="number" value={form.stories} onChange={e => setForm({ ...form, stories: Number(e.target.value) })} className="w-full border rounded-lg px-3 py-2 text-sm" /></div>
              <div><label className="block text-sm font-medium mb-1">City</label>
                <select value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm">
                  {["national_average","new_york","miami","houston","los_angeles","chicago","san_francisco","boston","dallas","atlanta","denver","seattle","phoenix","london","dubai","toronto"].map(c => <option key={c} value={c}>{c.replace(/_/g," ").replace(/\b\w/g,l=>l.toUpperCase())}</option>)}
                </select></div>
            </div>
            <div className="flex gap-4 text-sm">
              <label className="flex items-center gap-2"><input type="checkbox" checked={!form.skipRevit} onChange={e => setForm({ ...form, skipRevit: !e.target.checked })} /> Build in Revit</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={form.generateDrawings} onChange={e => setForm({ ...form, generateDrawings: e.target.checked })} /> Generate Drawings</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={form.runCompliance} onChange={e => setForm({ ...form, runCompliance: e.target.checked })} /> Code Compliance</label>
            </div>
            <Button className="w-full h-12 text-base" onClick={handleBuild} disabled={building}>
              {building ? "Building... Please wait" : "Build Everything"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><div className="flex justify-between items-center"><CardTitle className="text-base">Room Program ({customRooms.length} rooms)</CardTitle><button onClick={addRoom} className="text-xs text-blue-600 hover:underline">+ Add Room</button></div></CardHeader>
          <CardContent>
            <div className="max-h-80 overflow-auto space-y-1">
              {customRooms.map((room, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input value={room.name} onChange={e => updateRoom(i, "name", e.target.value)} className="flex-1 border rounded px-2 py-1 text-sm" />
                  <input type="number" value={room.targetArea} onChange={e => updateRoom(i, "targetArea", Number(e.target.value))} className="w-16 border rounded px-2 py-1 text-sm text-right" />
                  <span className="text-xs text-gray-400 w-8">sqm</span>
                  <label className="flex items-center gap-1 text-xs"><input type="checkbox" checked={room.needsWindow || false} onChange={e => updateRoom(i, "needsWindow", e.target.checked)} />Win</label>
                  <button onClick={() => removeRoom(i)} className="text-red-400 text-xs hover:text-red-600">✕</button>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2">Total: {customRooms.reduce((s, r) => s + r.targetArea, 0)} sqm program vs {Math.round((form.width / 1000) * (form.depth / 1000))} sqm footprint</p>
          </CardContent>
        </Card>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-4">
          {/* Summary */}
          {result.summary && (
            <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white border-0">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-xl font-bold">{result.summary.projectName}</h2>
                    <p className="text-blue-200 mt-1">{result.summary.footprint} · {result.summary.grossArea} · {result.summary.rooms} rooms · {result.summary.walls} walls</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold">{result.summary.totalCost}</p>
                    <p className="text-blue-200">{result.summary.costPerSqm} · {result.summary.city} · {result.summary.quality}</p>
                  </div>
                </div>
                <p className="text-blue-300 text-sm mt-3">Completed in {result.summary.duration} — {result.summary.stepsCompleted}/{result.summary.stepsTotal} steps successful</p>
              </CardContent>
            </Card>
          )}

          {/* Pipeline Steps */}
          <Card>
            <CardHeader><CardTitle className="text-base">Build Pipeline</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                {result.steps?.map((step, i) => {
                  const icon = statusIcons[step.status] || statusIcons.info;
                  return (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                      <span className={`text-lg font-bold ${icon.color}`}>{icon.icon}</span>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{step.step}</p>
                        {step.result ? <pre className="text-xs text-gray-500 mt-1 whitespace-pre-wrap">{typeof step.result === "string" ? step.result : JSON.stringify(step.result, null, 2)}</pre> : null}
                        {step.error ? <p className="text-xs text-red-500 mt-1">{step.error}</p> : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Room Layout */}
          {result.spaceLayout && (
            <Card>
              <CardHeader><CardTitle className="text-base">Generated Floor Plan</CardTitle></CardHeader>
              <CardContent>
                <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ height: 300 }}>
                  {result.spaceLayout.map((room, i) => {
                    const colors = ["bg-blue-200", "bg-green-200", "bg-yellow-200", "bg-purple-200", "bg-pink-200", "bg-teal-200", "bg-orange-200", "bg-indigo-200"];
                    const scale = 300 / Math.max(form.width, form.depth);
                    return (
                      <div key={i} className={`absolute border border-gray-400 ${colors[i % colors.length]} flex items-center justify-center`}
                        style={{ left: room.x * scale, top: room.y * scale, width: room.width * scale, height: room.depth * scale }}>
                        <div className="text-center"><p className="text-xs font-bold truncate px-1">{room.name}</p><p className="text-xs text-gray-600">{room.area}m²</p></div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Next Steps */}
          <Card>
            <CardHeader><CardTitle className="text-base">What&apos;s Ready</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <a href="/budget" className="p-3 bg-green-50 rounded-lg text-center hover:bg-green-100"><p className="font-semibold text-green-700 text-sm">Budget</p><p className="text-xs text-gray-500">Auto-populated by division</p></a>
                <a href="/estimate" className="p-3 bg-blue-50 rounded-lg text-center hover:bg-blue-100"><p className="font-semibold text-blue-700 text-sm">Cost Details</p><p className="text-xs text-gray-500">Full MasterFormat breakdown</p></a>
                <a href="/plans" className="p-3 bg-purple-50 rounded-lg text-center hover:bg-purple-100"><p className="font-semibold text-purple-700 text-sm">Plans</p><p className="text-xs text-gray-500">Takeoff the floor plan</p></a>
                <a href="/viewer" className="p-3 bg-orange-50 rounded-lg text-center hover:bg-orange-100"><p className="font-semibold text-orange-700 text-sm">3D Viewer</p><p className="text-xs text-gray-500">Export IFC from Revit</p></a>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
