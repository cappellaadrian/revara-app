"use client";
import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlanCanvas } from "@/components/plans/PlanCanvas";
import { BuildInRevitButton } from "@/components/ui/revit-actions";
import { RevisionCompare } from "@/components/plans/RevisionCompare";
import { useActiveProject } from "@/lib/hooks";

type Zone = { id: string; points: { x: number; y: number }[]; label: string; area: number; color: string; classification: string };
type Line = { id: string; points: { x: number; y: number }[]; length: number; classification: string };
type Count = { id: string; x: number; y: number; label: string; classification: string };
type PlanSheet = { id: string; name: string; sheetNumber: string; discipline: string; revision: string; setName: string; filePath: string; analysis: string };
type Classification = { id: string; name: string; category: string; color: string; costCode: string; unit: string; unitRate: number };

export default function PlansPage() {
  const { projectId } = useActiveProject();
  const [sheets, setSheets] = useState<PlanSheet[]>([]);
  const [activeSheet, setActiveSheet] = useState<PlanSheet | null>(null);
  const [compareSheet, setCompareSheet] = useState<PlanSheet | null>(null);
  const [showCompare, setShowCompare] = useState(false);
  const [classifications, setClassifications] = useState<Classification[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [scale, setScale] = useState(0);
  const [zones, setZones] = useState<Zone[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const [counts, setCounts] = useState<Count[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [activeTab, setActiveTab] = useState<"areas" | "lines" | "counts">("areas");
  const [uploading, setUploading] = useState(false);
  const [sheetFilter, setSheetFilter] = useState("all");

  // Load classifications and sheets
  useEffect(() => {
    fetch("/api/classifications").then(r => r.json()).then(setClassifications).catch(() => {});
    if (projectId) {
      fetch(`/api/plans?projectId=${projectId}`).then(r => r.json()).then(d => setSheets(d.plans || [])).catch(() => {});
    }
  }, [projectId]);

  const handleFiles = useCallback(async (fileList: FileList) => {
    if (!projectId) { alert("Select a project first"); return; }
    setUploading(true);
    const formData = new FormData();
    Array.from(fileList).forEach(f => formData.append("files", f));
    formData.append("projectId", projectId);
    formData.append("setName", "Current");
    formData.append("revision", "0");
    try {
      const res = await fetch("/api/plans/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.files) {
        setSheets(prev => [...prev, ...data.files]);
        if (data.files[0]) selectSheet(data.files[0], fileList[0]);
      }
    } catch { /* silent */ }
    setUploading(false);
  }, [projectId]);

  const selectSheet = (sheet: PlanSheet, originalFile?: File) => {
    setActiveSheet(sheet);
    // Load analysis if exists
    if (sheet.analysis) {
      try {
        const a = JSON.parse(sheet.analysis);
        setZones(a.zones || []);
        setLines(a.lines || []);
        setCounts(a.counts || []);
        if (a.scale) setScale(a.scale);
      } catch { setZones([]); setLines([]); setCounts([]); }
    } else {
      setZones([]); setLines([]); setCounts([]);
    }
    // Set preview
    if (originalFile) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(originalFile);
    } else {
      setPreview(sheet.filePath);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    if (e.dataTransfer.files.length > 0) handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const saveAnalysis = async () => {
    if (!activeSheet) return;
    const analysis = JSON.stringify({ zones, lines, counts, scale });
    await fetch(`/api/plans/${activeSheet.id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ analysis }),
    });
  };

  // Auto-save analysis when zones/lines/counts change
  useEffect(() => {
    if (activeSheet && (zones.length > 0 || lines.length > 0 || counts.length > 0)) {
      const timer = setTimeout(saveAnalysis, 2000);
      return () => clearTimeout(timer);
    }
  }, [zones, lines, counts]);

  const analyzePlan = async () => {
    if (!file && !preview) return;
    setAnalyzing(true);
    try {
      const formData = new FormData();
      if (file) formData.append("file", file);
      const res = await fetch("/api/analyze", { method: "POST", body: formData });
      const data = await res.json();
      if (data.rooms) {
        const newZones: Zone[] = data.rooms.map((r: { name: string; area_sqm: number; center: { x: number; y: number } }, i: number) => {
          const cls = classifications.find(c => c.name.toLowerCase() === r.name.toLowerCase()) || classifications[0];
          return {
            id: `ai-${i}`, points: generateRoomPolygon(r.center, r.area_sqm, scale),
            label: r.name, area: r.area_sqm, color: cls?.color || `rgba(59,130,246,0.25)`, classification: r.name,
          };
        });
        setZones(newZones);
      }
    } catch { /* silent */ }
    setAnalyzing(false);
  };

  const totalArea = zones.reduce((s, z) => s + z.area, 0);
  const totalLength = lines.reduce((s, l) => s + l.length, 0);

  const classGroups = zones.reduce((acc, z) => {
    const key = z.classification || "Unclassified";
    if (!acc[key]) acc[key] = { count: 0, area: 0 };
    acc[key].count++; acc[key].area += z.area;
    return acc;
  }, {} as Record<string, { count: number; area: number }>);

  const exportToExcel = () => {
    let csv = "Sheet,Classification,Area (sqm),Area (sqft),Cost Code,Unit Rate,Est Cost\n";
    zones.forEach(z => {
      const cls = classifications.find(c => c.name === z.classification);
      const cost = cls?.unitRate ? z.area * 10.7639 * cls.unitRate : 0;
      csv += `${activeSheet?.sheetNumber || ""},${z.classification},${z.area},${(z.area * 10.7639).toFixed(1)},${cls?.costCode || ""},${cls?.unitRate || 0},${cost.toFixed(0)}\n`;
    });
    csv += `\nLines\nClassification,Length (m),Length (ft)\n`;
    lines.forEach(l => { csv += `${l.classification},${l.length},${(l.length * 3.28084).toFixed(1)}\n`; });
    csv += `\nCounts\nClassification,Count\n`;
    const cg = counts.reduce((a, c) => { a[c.classification] = (a[c.classification] || 0) + 1; return a; }, {} as Record<string, number>);
    Object.entries(cg).forEach(([k, v]) => { csv += `${k},${v}\n`; });
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `takeoff-${activeSheet?.sheetNumber || "plan"}.csv`; a.click();
  };

  // Search across sheets
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{ totalMatches: number; totalArea: number } | null>(null);

  const searchSheets = async () => {
    if (!searchQuery || !projectId) return;
    const res = await fetch("/api/plans/search", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ projectId, query: searchQuery, searchType: "classification" }) });
    const data = await res.json();
    setSearchResults(data);
  };

  const filteredSheets = sheetFilter === "all" ? sheets : sheets.filter(s => s.discipline === sheetFilter);
  const disciplines = Array.from(new Set(sheets.map(s => s.discipline)));

  return (
    <div className="flex h-screen">
      {/* Revision Compare Modal */}
      {showCompare && compareSheet && activeSheet && preview && (
        <RevisionCompare
          imageA={preview}
          imageB={compareSheet.filePath}
          labelA={`Rev ${activeSheet.revision} — ${activeSheet.sheetNumber}`}
          labelB={`Rev ${compareSheet.revision} — ${compareSheet.sheetNumber}`}
          onClose={() => setShowCompare(false)}
        />
      )}
      {/* Left: Sheet Navigator */}
      <div className="w-56 border-r bg-white flex flex-col overflow-hidden">
        <div className="p-3 border-b">
          <h3 className="font-semibold text-sm">Plan Sheets</h3>
          <p className="text-xs text-gray-400">{sheets.length} sheets</p>
        </div>

        {/* Upload */}
        <div className="p-2 border-b">
          <label className="cursor-pointer">
            <div className="border-2 border-dashed rounded-lg p-2 text-center text-xs text-gray-400 hover:border-blue-300 hover:text-blue-500 transition-colors">
              {uploading ? "Uploading..." : "+ Upload Sheets"}
            </div>
            <input type="file" multiple accept=".pdf,.png,.jpg,.jpeg,.tiff" className="hidden" onChange={e => e.target.files && handleFiles(e.target.files)} />
          </label>
        </div>

        {/* Filter */}
        {disciplines.length > 1 && (
          <div className="p-2 border-b flex flex-wrap gap-1">
            <button onClick={() => setSheetFilter("all")} className={`text-xs px-2 py-0.5 rounded ${sheetFilter === "all" ? "bg-blue-600 text-white" : "bg-gray-100"}`}>All</button>
            {disciplines.map(d => (
              <button key={d} onClick={() => setSheetFilter(d)} className={`text-xs px-2 py-0.5 rounded ${sheetFilter === d ? "bg-blue-600 text-white" : "bg-gray-100"}`}>{d.substring(0, 4)}</button>
            ))}
          </div>
        )}

        {/* Sheet List */}
        <div className="flex-1 overflow-auto">
          {filteredSheets.map(sheet => (
            <div key={sheet.id}
              onClick={() => selectSheet(sheet)}
              className={`p-2.5 border-b cursor-pointer hover:bg-gray-50 ${activeSheet?.id === sheet.id ? "bg-blue-50 border-l-2 border-l-blue-600" : ""}`}>
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono font-semibold text-gray-500">{sheet.sheetNumber || "—"}</span>
                <span className="text-xs text-gray-400">Rev {sheet.revision}</span>
              </div>
              <p className="text-xs truncate mt-0.5">{sheet.name}</p>
              <span className="text-xs text-gray-400">{sheet.discipline}</span>
              {sheet.analysis && <span className="text-xs text-green-600 ml-1">analyzed</span>}
            </div>
          ))}
          {sheets.length === 0 && <p className="text-xs text-gray-400 p-3 text-center">Upload plan sheets to start</p>}
        </div>

        {/* Search across sheets */}
        <div className="p-2 border-t">
          <div className="flex gap-1">
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && searchSheets()}
              placeholder="Search all sheets..." className="flex-1 border rounded px-2 py-1 text-xs" />
            <button onClick={searchSheets} className="bg-blue-600 text-white px-2 py-1 rounded text-xs">Go</button>
          </div>
          {searchResults && <p className="text-xs text-gray-500 mt-1">{searchResults.totalMatches} found, {searchResults.totalArea} sqm</p>}
        </div>

        {/* Compare toggle */}
        {sheets.length >= 2 && (
          <div className="p-2 border-t space-y-1">
            {!showCompare ? (
              <div>
                <p className="text-xs text-gray-500 mb-1">Select 2nd sheet to compare:</p>
                <select onChange={e => { const s = sheets.find(sh => sh.id === e.target.value); if (s) setCompareSheet(s); }}
                  className="w-full border rounded px-2 py-1 text-xs">
                  <option value="">Choose sheet...</option>
                  {sheets.filter(s => s.id !== activeSheet?.id).map(s => <option key={s.id} value={s.id}>{s.sheetNumber || s.name}</option>)}
                </select>
              </div>
            ) : null}
            <Button size="sm" variant={showCompare ? "primary" : "secondary"} className="w-full text-xs"
              onClick={() => setShowCompare(!showCompare)} disabled={!compareSheet || !activeSheet}>
              {showCompare ? "Exit Compare" : "Compare Revisions"}
            </Button>
          </div>
        )}
      </div>

      {/* Middle: Plan Viewer */}
      <div className="flex-1 flex flex-col">
        {!preview && !activeSheet ? (
          <div className="flex-1 flex items-center justify-center p-8"
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}>
            <div className={`w-full max-w-xl border-2 border-dashed rounded-xl p-16 text-center ${dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}>
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
              </div>
              <h3 className="text-lg font-semibold mb-1">Upload Plan Set</h3>
              <p className="text-sm text-gray-500 mb-4">Drag & drop multiple sheets or browse. Auto-detects sheet numbers and disciplines.</p>
              <label className="cursor-pointer"><Button variant="secondary">Browse Files</Button>
                <input type="file" multiple accept=".pdf,.png,.jpg,.jpeg,.tiff" className="hidden" onChange={e => e.target.files && handleFiles(e.target.files)} />
              </label>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 px-3 py-2 border-b bg-white">
              <span className="text-sm font-mono font-semibold text-gray-500">{activeSheet?.sheetNumber || ""}</span>
              <span className="text-sm font-medium truncate max-w-xs">{activeSheet?.name || file?.name || ""}</span>
              <span className="text-xs text-gray-400">Rev {activeSheet?.revision || "0"}</span>
              <div className="flex-1" />
              <Button size="sm" variant="secondary" onClick={analyzePlan} disabled={analyzing}>
                {analyzing ? "Analyzing..." : "AI Auto-Detect"}
              </Button>
              <Button size="sm" variant="secondary" onClick={exportToExcel} disabled={zones.length === 0}>Export CSV</Button>
            </div>
            {preview && (
              <PlanCanvas imageUrl={preview} scale={scale} onScaleSet={setScale}
                zones={zones} lines={lines} counts={counts}
                onZonesChange={setZones} onLinesChange={setLines} onCountsChange={setCounts} />
            )}
          </>
        )}
      </div>

      {/* Right: Quantities Panel */}
      <div className="w-72 border-l bg-white flex flex-col overflow-hidden">
        <div className="p-3 border-b">
          <h2 className="font-semibold text-sm">Quantities Panel</h2>
        </div>

        <div className="grid grid-cols-3 gap-1.5 p-2">
          <div className="bg-blue-50 rounded-lg p-2 text-center"><p className="text-sm font-bold text-blue-700">{totalArea.toFixed(0)}</p><p className="text-xs text-gray-500">sqm</p></div>
          <div className="bg-red-50 rounded-lg p-2 text-center"><p className="text-sm font-bold text-red-700">{totalLength.toFixed(0)}</p><p className="text-xs text-gray-500">m lin</p></div>
          <div className="bg-purple-50 rounded-lg p-2 text-center"><p className="text-sm font-bold text-purple-700">{counts.length}</p><p className="text-xs text-gray-500">count</p></div>
        </div>

        <div className="flex border-b">
          {(["areas", "lines", "counts"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 py-1.5 text-xs font-medium capitalize ${activeTab === tab ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}>
              {tab} ({tab === "areas" ? zones.length : tab === "lines" ? lines.length : counts.length})
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-auto p-2 space-y-1">
          {activeTab === "areas" && Object.entries(classGroups).map(([cls, data]) => (
            <div key={cls} className="bg-gray-50 rounded-lg p-2">
              <div className="flex justify-between"><span className="text-xs font-medium">{cls}</span><span className="text-xs text-gray-500">{data.count}x</span></div>
              <div className="flex justify-between mt-0.5"><span className="text-xs text-gray-400">{data.area.toFixed(1)} sqm</span><span className="text-xs text-gray-400">{(data.area * 10.7639).toFixed(0)} sqft</span></div>
            </div>
          ))}
          {activeTab === "lines" && lines.map(l => (
            <div key={l.id} className="bg-gray-50 rounded-lg p-2 flex justify-between">
              <span className="text-xs">{l.classification}</span><span className="text-xs font-medium">{l.length}m</span>
            </div>
          ))}
          {activeTab === "counts" && Object.entries(counts.reduce((a, c) => { a[c.classification] = (a[c.classification] || 0) + 1; return a; }, {} as Record<string, number>)).map(([cls, n]) => (
            <div key={cls} className="bg-gray-50 rounded-lg p-2 flex justify-between">
              <span className="text-xs">{cls}</span><span className="text-xs font-medium">{n}</span>
            </div>
          ))}
          {activeTab === "areas" && zones.length === 0 && <p className="text-xs text-gray-400 text-center py-4">Draw polygons (P) or AI Auto-Detect</p>}
        </div>

        <div className="p-2 border-t space-y-1.5">
          <BuildInRevitButton buildingJson={zones.length > 0 ? generateBuildingJson(zones, lines) : null} />
          <Button variant="secondary" className="w-full" size="sm" disabled={zones.length === 0} onClick={exportToExcel}>Export to CSV</Button>
        </div>
      </div>
    </div>
  );
}

function generateRoomPolygon(center: { x: number; y: number }, areaSqm: number, scale: number): { x: number; y: number }[] {
  const pixelArea = scale > 0 ? areaSqm * scale * scale : areaSqm * 400;
  const side = Math.sqrt(pixelArea);
  const hw = side / 2 * (0.9 + Math.random() * 0.2), hh = side / 2 * (0.9 + Math.random() * 0.2);
  const cx = center.x * 10, cy = center.y * 10;
  return [{ x: cx - hw, y: cy - hh }, { x: cx + hw, y: cy - hh }, { x: cx + hw, y: cy + hh }, { x: cx - hw, y: cy + hh }];
}

function generateBuildingJson(zones: Zone[], _lines: Line[]) {
  const sf = 50;
  const walls = zones.flatMap(z => z.points.map((p, j) => ({
    levelName: "Level 1", heightMm: 3000,
    start: { x: Math.round(p.x * sf), y: Math.round(p.y * sf) },
    end: { x: Math.round(z.points[(j + 1) % z.points.length].x * sf), y: Math.round(z.points[(j + 1) % z.points.length].y * sf) },
    typeName: "Generic - 200mm", openings: [],
  })));
  const rooms = zones.map((z, i) => {
    const cx = z.points.reduce((s, p) => s + p.x, 0) / z.points.length;
    const cy = z.points.reduce((s, p) => s + p.y, 0) / z.points.length;
    return { levelName: "Level 1", name: z.classification || z.label, number: String(101 + i), position: { x: Math.round(cx * sf), y: Math.round(cy * sf) } };
  });
  return { project: { name: "Plan Import" }, levels: [{ name: "Level 1", elevation_mm: 0 }], walls, rooms };
}
