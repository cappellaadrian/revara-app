"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

type Tool = "select" | "polygon" | "line" | "count" | "measure" | "split";
type Zone = { id: string; points: { x: number; y: number }[]; label: string; area: number; color: string; classification: string };
type Line = { id: string; points: { x: number; y: number }[]; length: number; classification: string };
type Count = { id: string; x: number; y: number; label: string; classification: string };

interface PlanCanvasProps {
  imageUrl: string;
  scale: number; // pixels per meter
  onScaleSet: (scale: number) => void;
  zones: Zone[];
  lines: Line[];
  counts: Count[];
  onZonesChange: (zones: Zone[]) => void;
  onLinesChange: (lines: Line[]) => void;
  onCountsChange: (counts: Count[]) => void;
}

const ZONE_COLORS = ["rgba(59,130,246,0.25)", "rgba(16,185,129,0.25)", "rgba(245,158,11,0.25)", "rgba(139,92,246,0.25)", "rgba(236,72,153,0.25)", "rgba(20,184,166,0.25)", "rgba(244,63,94,0.25)", "rgba(34,197,94,0.25)"];
const classifications = ["Living Room", "Bedroom", "Bathroom", "Kitchen", "Dining", "Corridor", "Office", "Meeting Room", "Storage", "Utility", "Lobby", "Stairwell", "Elevator", "Exterior Wall", "Interior Wall", "Other"];

export function PlanCanvas({ imageUrl, scale, onScaleSet, zones, lines, counts, onZonesChange, onLinesChange, onCountsChange }: PlanCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tool, setTool] = useState<Tool>("select");
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgEl, setImgEl] = useState<HTMLImageElement | null>(null);
  const [viewOffset, setViewOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [drawingPoints, setDrawingPoints] = useState<{ x: number; y: number }[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [calibrating, setCalibrating] = useState(false);
  const [calibPoints, setCalibPoints] = useState<{ x: number; y: number }[]>([]);
  const [calibDistance, setCalibDistance] = useState("");
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);
  const [classifyingId, setClassifyingId] = useState<string | null>(null);
  const [hoveredInfo, setHoveredInfo] = useState("");

  // Load image
  useEffect(() => {
    const img = new Image();
    img.onload = () => { setImgEl(img); setImgLoaded(true); };
    img.src = imageUrl;
  }, [imageUrl]);

  // Convert screen coords to plan coords
  const screenToPlan = useCallback((sx: number, sy: number) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return { x: (sx - rect.left - viewOffset.x) / zoom, y: (sy - rect.top - viewOffset.y) / zoom };
  }, [viewOffset, zoom]);

  // Calculate polygon area in pixels then convert to sqm
  const calcArea = useCallback((pts: { x: number; y: number }[]) => {
    if (pts.length < 3) return 0;
    let area = 0;
    for (let i = 0; i < pts.length; i++) {
      const j = (i + 1) % pts.length;
      area += pts[i].x * pts[j].y - pts[j].x * pts[i].y;
    }
    const pixelArea = Math.abs(area) / 2;
    return scale > 0 ? Math.round(pixelArea / (scale * scale) * 100) / 100 : pixelArea;
  }, [scale]);

  // Calculate line length
  const calcLength = useCallback((pts: { x: number; y: number }[]) => {
    if (pts.length < 2) return 0;
    let len = 0;
    for (let i = 0; i < pts.length - 1; i++) {
      const dx = pts[i + 1].x - pts[i].x;
      const dy = pts[i + 1].y - pts[i].y;
      len += Math.sqrt(dx * dx + dy * dy);
    }
    return scale > 0 ? Math.round(len / scale * 100) / 100 : len;
  }, [scale]);

  // Render canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !containerRef.current) return;

    canvas.width = containerRef.current.clientWidth;
    canvas.height = containerRef.current.clientHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(viewOffset.x, viewOffset.y);
    ctx.scale(zoom, zoom);

    // Draw image
    if (imgEl && imgLoaded) ctx.drawImage(imgEl, 0, 0);

    // Draw zones
    zones.forEach((zone, i) => {
      if (zone.points.length < 3) return;
      ctx.beginPath();
      ctx.moveTo(zone.points[0].x, zone.points[0].y);
      zone.points.forEach((p, j) => { if (j > 0) ctx.lineTo(p.x, p.y); });
      ctx.closePath();
      ctx.fillStyle = zone.color || ZONE_COLORS[i % ZONE_COLORS.length];
      ctx.fill();
      ctx.strokeStyle = selectedZoneId === zone.id ? "#2563eb" : "rgba(0,0,0,0.5)";
      ctx.lineWidth = selectedZoneId === zone.id ? 3 / zoom : 1.5 / zoom;
      ctx.stroke();
      // Label
      const cx = zone.points.reduce((s, p) => s + p.x, 0) / zone.points.length;
      const cy = zone.points.reduce((s, p) => s + p.y, 0) / zone.points.length;
      ctx.fillStyle = "rgba(0,0,0,0.8)";
      ctx.font = `bold ${14 / zoom}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(zone.classification || zone.label, cx, cy - 6 / zoom);
      ctx.font = `${12 / zoom}px sans-serif`;
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.fillText(`${zone.area} sqm`, cx, cy + 10 / zoom);
    });

    // Draw lines
    lines.forEach(line => {
      if (line.points.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(line.points[0].x, line.points[0].y);
      line.points.forEach((p, j) => { if (j > 0) ctx.lineTo(p.x, p.y); });
      ctx.strokeStyle = "#ef4444";
      ctx.lineWidth = 2.5 / zoom;
      ctx.stroke();
      // Length label
      const mid = line.points[Math.floor(line.points.length / 2)];
      ctx.fillStyle = "#ef4444";
      ctx.font = `bold ${11 / zoom}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(`${line.length}m`, mid.x, mid.y - 6 / zoom);
    });

    // Draw counts
    counts.forEach(c => {
      ctx.beginPath();
      ctx.arc(c.x, c.y, 8 / zoom, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(168,85,247,0.8)";
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2 / zoom;
      ctx.stroke();
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${9 / zoom}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("x", c.x, c.y);
    });

    // Draw current drawing
    if (drawingPoints.length > 0) {
      ctx.beginPath();
      ctx.moveTo(drawingPoints[0].x, drawingPoints[0].y);
      drawingPoints.forEach((p, i) => { if (i > 0) ctx.lineTo(p.x, p.y); });
      if (tool === "polygon") ctx.lineTo(mousePos.x, mousePos.y);
      if (tool === "line" || tool === "measure") ctx.lineTo(mousePos.x, mousePos.y);
      ctx.strokeStyle = "#2563eb";
      ctx.lineWidth = 2 / zoom;
      ctx.setLineDash([5 / zoom, 5 / zoom]);
      ctx.stroke();
      ctx.setLineDash([]);
      // Show live measurement
      if ((tool === "line" || tool === "measure") && drawingPoints.length > 0) {
        const lastPt = drawingPoints[drawingPoints.length - 1];
        const dx = mousePos.x - lastPt.x; const dy = mousePos.y - lastPt.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const distM = scale > 0 ? (dist / scale).toFixed(2) + "m" : dist.toFixed(0) + "px";
        ctx.fillStyle = "#2563eb";
        ctx.font = `bold ${13 / zoom}px sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText(distM, (lastPt.x + mousePos.x) / 2, (lastPt.y + mousePos.y) / 2 - 10 / zoom);
      }
      // Polygon vertex dots
      drawingPoints.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4 / zoom, 0, Math.PI * 2);
        ctx.fillStyle = "#2563eb";
        ctx.fill();
      });
    }

    // Calibration line
    if (calibrating && calibPoints.length > 0) {
      ctx.beginPath();
      ctx.moveTo(calibPoints[0].x, calibPoints[0].y);
      if (calibPoints.length > 1) ctx.lineTo(calibPoints[1].x, calibPoints[1].y);
      else ctx.lineTo(mousePos.x, mousePos.y);
      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = 3 / zoom;
      ctx.stroke();
    }

    ctx.restore();
  }, [imgEl, imgLoaded, viewOffset, zoom, zones, lines, counts, drawingPoints, mousePos, tool, scale, calibrating, calibPoints, selectedZoneId, calcArea, calcLength]);

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && tool === "select" && !calibrating)) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - viewOffset.x, y: e.clientY - viewOffset.y });
      return;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const plan = screenToPlan(e.clientX, e.clientY);
    setMousePos(plan);
    if (isPanning) {
      setViewOffset({ x: e.clientX - panStart.x, y: e.clientY - panStart.y });
    }
    // Hover info
    if (tool === "select") {
      const hovered = zones.find(z => isPointInPolygon(plan, z.points));
      setHoveredInfo(hovered ? `${hovered.classification || hovered.label}: ${hovered.area} sqm` : "");
    }
  };

  const handleMouseUp = () => { setIsPanning(false); };

  const handleClick = (e: React.MouseEvent) => {
    if (isPanning) return;
    const plan = screenToPlan(e.clientX, e.clientY);

    if (calibrating) {
      if (calibPoints.length === 0) {
        setCalibPoints([plan]);
      } else if (calibPoints.length === 1) {
        setCalibPoints([calibPoints[0], plan]);
      }
      return;
    }

    if (tool === "polygon" || tool === "line" || tool === "measure") {
      setDrawingPoints([...drawingPoints, plan]);
    }
    if (tool === "count") {
      const id = `c-${Date.now()}`;
      onCountsChange([...counts, { id, x: plan.x, y: plan.y, label: `Count ${counts.length + 1}`, classification: "Door" }]);
    }
    if (tool === "select") {
      const clicked = zones.find(z => isPointInPolygon(plan, z.points));
      setSelectedZoneId(clicked?.id || null);
    }
  };

  const handleDblClick = () => {
    if (tool === "polygon" && drawingPoints.length >= 3) {
      const id = `z-${Date.now()}`;
      const area = calcArea(drawingPoints);
      const newZone: Zone = { id, points: [...drawingPoints], label: `Zone ${zones.length + 1}`, area, color: ZONE_COLORS[zones.length % ZONE_COLORS.length], classification: "Other" };
      onZonesChange([...zones, newZone]);
      setDrawingPoints([]);
      setClassifyingId(id);
    }
    if ((tool === "line" || tool === "measure") && drawingPoints.length >= 2) {
      const id = `l-${Date.now()}`;
      const length = calcLength(drawingPoints);
      onLinesChange([...lines, { id, points: [...drawingPoints], length, classification: "Wall" }]);
      setDrawingPoints([]);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(z => Math.max(0.1, Math.min(10, z * delta)));
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "p") setTool("polygon");
    if (e.key === "l") setTool("line");
    if (e.key === "k") setTool("count");
    if (e.key === "d") setTool("measure");
    if (e.key === "v" || e.key === "Escape") { setTool("select"); setDrawingPoints([]); }
    if (e.key === "z" && drawingPoints.length > 0) setDrawingPoints(drawingPoints.slice(0, -1));
  }, [drawingPoints]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const finishCalibration = () => {
    if (calibPoints.length === 2 && calibDistance) {
      const dx = calibPoints[1].x - calibPoints[0].x;
      const dy = calibPoints[1].y - calibPoints[0].y;
      const pixelDist = Math.sqrt(dx * dx + dy * dy);
      const realDist = parseFloat(calibDistance);
      if (realDist > 0) onScaleSet(pixelDist / realDist);
    }
    setCalibrating(false);
    setCalibPoints([]);
    setCalibDistance("");
  };

  const classifyZone = (zoneId: string, classification: string) => {
    onZonesChange(zones.map(z => z.id === zoneId ? { ...z, classification } : z));
    setClassifyingId(null);
  };

  const deleteSelected = () => {
    if (selectedZoneId) {
      onZonesChange(zones.filter(z => z.id !== selectedZoneId));
      setSelectedZoneId(null);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b bg-white flex-wrap">
        <div className="flex gap-1 border-r pr-2 mr-2">
          {([["select", "V", "Select/Pan"], ["polygon", "P", "Area Polygon"], ["line", "L", "Line/Wall"], ["count", "K", "Count"], ["measure", "D", "Measure"]] as [Tool, string, string][]).map(([t, key, label]) => (
            <button key={t} onClick={() => { setTool(t); setDrawingPoints([]); }}
              className={`px-2.5 py-1.5 rounded text-xs font-medium transition-colors ${tool === t ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`}
              title={`${label} (${key})`}>{label}</button>
          ))}
        </div>
        <button onClick={() => { setCalibrating(true); setCalibPoints([]); }}
          className={`px-2.5 py-1.5 rounded text-xs font-medium ${calibrating ? "bg-amber-500 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`}>
          Scale Calibrate
        </button>
        {selectedZoneId && <Button size="sm" variant="danger" onClick={deleteSelected}>Delete Zone</Button>}
        <div className="flex-1" />
        <span className="text-xs text-gray-500 mr-2">Scale: {scale > 0 ? `1px = ${(1/scale).toFixed(4)}m` : "Not set"}</span>
        <span className="text-xs text-gray-500 mr-2">Zoom: {Math.round(zoom * 100)}%</span>
        <button onClick={() => setZoom(1)} className="px-2 py-1 rounded text-xs bg-gray-100 hover:bg-gray-200">Reset Zoom</button>
        {hoveredInfo && <span className="text-xs font-medium text-blue-600 ml-2">{hoveredInfo}</span>}
      </div>

      {/* Calibration Dialog */}
      {calibrating && calibPoints.length === 2 && (
        <div className="p-3 bg-amber-50 border-b flex items-center gap-3">
          <span className="text-sm font-medium">Enter the real-world distance between the two points:</span>
          <input type="number" step="0.01" value={calibDistance} onChange={e => setCalibDistance(e.target.value)} placeholder="meters" className="w-32 border rounded px-2 py-1 text-sm" />
          <span className="text-sm text-gray-500">meters</span>
          <Button size="sm" onClick={finishCalibration}>Set Scale</Button>
          <Button size="sm" variant="ghost" onClick={() => { setCalibrating(false); setCalibPoints([]); }}>Cancel</Button>
        </div>
      )}

      {/* Classification popup */}
      {classifyingId && (
        <div className="p-3 bg-blue-50 border-b">
          <span className="text-sm font-medium mr-3">Classify this area:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {classifications.map(c => (
              <button key={c} onClick={() => classifyZone(classifyingId, c)}
                className="px-2.5 py-1 rounded text-xs font-medium bg-white border hover:bg-blue-100 hover:border-blue-300">{c}</button>
            ))}
          </div>
        </div>
      )}

      {/* Canvas */}
      <div ref={containerRef} className="flex-1 relative overflow-hidden bg-gray-200 cursor-crosshair"
        style={{ cursor: tool === "select" ? (isPanning ? "grabbing" : "grab") : "crosshair" }}>
        <canvas ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onClick={handleClick}
          onDoubleClick={handleDblClick}
          onWheel={handleWheel}
          className="absolute inset-0"
        />
      </div>

      {/* Status Bar */}
      <div className="flex items-center gap-4 p-2 border-t bg-white text-xs text-gray-500">
        <span>Zones: {zones.length} ({zones.reduce((s, z) => s + z.area, 0).toFixed(1)} sqm total)</span>
        <span>Lines: {lines.length} ({lines.reduce((s, l) => s + l.length, 0).toFixed(1)}m total)</span>
        <span>Counts: {counts.length}</span>
        <span className="flex-1" />
        <span>Mouse: ({Math.round(mousePos.x)}, {Math.round(mousePos.y)})</span>
        <span>Shortcuts: P=polygon L=line K=count D=measure V=select Z=undo Esc=cancel</span>
      </div>
    </div>
  );
}

function isPointInPolygon(point: { x: number; y: number }, polygon: { x: number; y: number }[]): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x, yi = polygon[i].y;
    const xj = polygon[j].x, yj = polygon[j].y;
    const intersect = ((yi > point.y) !== (yj > point.y)) && (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}
