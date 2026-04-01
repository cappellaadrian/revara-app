"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface RevisionCompareProps {
  imageA: string; // Rev A URL/data
  imageB: string; // Rev B URL/data
  labelA: string;
  labelB: string;
  onClose: () => void;
}

export function RevisionCompare({ imageA, imageB, labelA, labelB, onClose }: RevisionCompareProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"overlay" | "slider" | "toggle">("overlay");
  const [opacity, setOpacity] = useState(0.5);
  const [sliderPos, setSliderPos] = useState(50);
  const [showA, setShowA] = useState(true);
  const [imgA, setImgA] = useState<HTMLImageElement | null>(null);
  const [imgB, setImgB] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const a = new Image(); a.onload = () => setImgA(a); a.src = imageA;
    const b = new Image(); b.onload = () => setImgB(b); b.src = imageB;
  }, [imageA, imageB]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !containerRef.current) return;

    canvas.width = containerRef.current.clientWidth;
    canvas.height = containerRef.current.clientHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const w = canvas.width;
    const h = canvas.height;

    if (mode === "overlay") {
      // Draw Rev A in red channel
      if (imgA) {
        ctx.globalAlpha = 1;
        ctx.drawImage(imgA, 0, 0, w, h);
      }
      // Overlay Rev B with blue tint at opacity
      if (imgB) {
        ctx.globalAlpha = opacity;
        ctx.globalCompositeOperation = "multiply";
        ctx.fillStyle = "rgba(0,100,255,0.3)";
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(imgB, 0, 0, w, h);
      }
      ctx.globalAlpha = 1;

      // Difference highlight: draw both and use difference blend
      if (imgA && imgB) {
        // Create offscreen canvases for diff
        const offA = document.createElement("canvas");
        offA.width = w; offA.height = h;
        const ctxA = offA.getContext("2d");
        ctxA?.drawImage(imgA, 0, 0, w, h);

        const offB = document.createElement("canvas");
        offB.width = w; offB.height = h;
        const ctxB = offB.getContext("2d");
        ctxB?.drawImage(imgB, 0, 0, w, h);

        // Use difference blend mode to highlight changes
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(imgA, 0, 0, w, h);
        ctx.globalCompositeOperation = "difference";
        ctx.globalAlpha = opacity;
        ctx.drawImage(imgB, 0, 0, w, h);
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 1;
      }
    } else if (mode === "slider") {
      const splitX = (sliderPos / 100) * w;
      // Left side: Rev A
      if (imgA) {
        ctx.save();
        ctx.beginPath(); ctx.rect(0, 0, splitX, h); ctx.clip();
        ctx.drawImage(imgA, 0, 0, w, h);
        ctx.restore();
      }
      // Right side: Rev B
      if (imgB) {
        ctx.save();
        ctx.beginPath(); ctx.rect(splitX, 0, w - splitX, h); ctx.clip();
        ctx.drawImage(imgB, 0, 0, w, h);
        ctx.restore();
      }
      // Slider line
      ctx.beginPath();
      ctx.moveTo(splitX, 0); ctx.lineTo(splitX, h);
      ctx.strokeStyle = "#ef4444"; ctx.lineWidth = 3;
      ctx.stroke();
      // Labels
      ctx.fillStyle = "#ef4444"; ctx.font = "bold 14px sans-serif";
      ctx.fillText(labelA, 10, 25);
      ctx.fillStyle = "#2563eb";
      ctx.fillText(labelB, splitX + 10, 25);
    } else if (mode === "toggle") {
      const img = showA ? imgA : imgB;
      if (img) ctx.drawImage(img, 0, 0, w, h);
      ctx.fillStyle = showA ? "#ef4444" : "#2563eb";
      ctx.font = "bold 16px sans-serif";
      ctx.fillText(showA ? labelA : labelB, 10, 25);
    }
  }, [imgA, imgB, mode, opacity, sliderPos, showA, labelA, labelB]);

  const handleSliderMove = (e: React.MouseEvent) => {
    if (mode !== "slider") return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    setSliderPos((x / rect.width) * 100);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex flex-col">
      {/* Toolbar */}
      <div className="bg-white p-3 flex items-center gap-3 flex-wrap">
        <h3 className="font-semibold text-sm">Revision Comparison</h3>
        <div className="flex gap-1 border-r pr-3">
          {(["overlay", "slider", "toggle"] as const).map(m => (
            <button key={m} onClick={() => setMode(m)}
              className={`px-3 py-1.5 rounded text-xs font-medium capitalize ${mode === m ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}>{m}</button>
          ))}
        </div>
        {mode === "overlay" && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Opacity:</span>
            <input type="range" min="0" max="100" value={opacity * 100} onChange={e => setOpacity(Number(e.target.value) / 100)} className="w-32" />
            <span className="text-xs text-gray-500">{Math.round(opacity * 100)}%</span>
          </div>
        )}
        {mode === "toggle" && (
          <Button size="sm" variant="secondary" onClick={() => setShowA(!showA)}>
            Show {showA ? labelB : labelA} (T)
          </Button>
        )}
        <div className="flex-1" />
        <span className="text-xs text-red-500 font-medium">{labelA}</span>
        <span className="text-xs text-gray-400">vs</span>
        <span className="text-xs text-blue-500 font-medium">{labelB}</span>
        <Button size="sm" variant="ghost" onClick={onClose}>Close</Button>
      </div>

      {/* Canvas */}
      <div ref={containerRef} className="flex-1 relative overflow-hidden cursor-crosshair"
        onMouseMove={handleSliderMove}
        onClick={() => mode === "toggle" && setShowA(!showA)}>
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </div>

      <div className="bg-white p-2 text-center text-xs text-gray-500">
        {mode === "overlay" && "Differences highlighted — bright areas = changes between revisions"}
        {mode === "slider" && "Drag to slide between revisions — left is old, right is new"}
        {mode === "toggle" && "Click or press T to toggle between revisions"}
      </div>
    </div>
  );
}
