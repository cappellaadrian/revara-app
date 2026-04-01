"use client";
import { useState } from "react";
import { Button } from "./button";

interface BuildResult {
  success: boolean;
  result?: { totalElements?: number; summary?: Record<string, number>; errors?: string[] };
  error?: string;
}

export function BuildInRevitButton({ buildingJson, onResult }: { buildingJson: unknown; onResult?: (r: BuildResult) => void }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BuildResult | null>(null);

  const handleBuild = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/revit/build", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ building: buildingJson }),
      });
      const data = await res.json();
      setResult(data);
      onResult?.(data);
    } catch (e) {
      const err = { success: false, error: e instanceof Error ? e.message : "Failed" };
      setResult(err);
      onResult?.(err);
    }
    setLoading(false);
  };

  return (
    <div>
      <Button onClick={handleBuild} disabled={loading || !buildingJson} className="w-full">
        {loading ? "Building in Revit..." : "Build in Revit"}
      </Button>
      {result && (
        <div className={`mt-2 p-3 rounded-lg text-sm ${result.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {result.success ? (
            <div>
              <p className="font-medium">Built {result.result?.totalElements || 0} elements in Revit</p>
              {result.result?.summary && (
                <div className="flex gap-3 mt-1 text-xs">
                  {Object.entries(result.result.summary).filter(([, v]) => v > 0).map(([k, v]) => (
                    <span key={k}>{v} {k}</span>
                  ))}
                </div>
              )}
              {result.result?.errors && result.result.errors.length > 0 && (
                <p className="text-xs text-orange-600 mt-1">{result.result.errors.length} warnings</p>
              )}
            </div>
          ) : (
            <p>{result.error}</p>
          )}
        </div>
      )}
    </div>
  );
}

export function ExportFromRevitButton({ onResult }: { onResult?: (data: unknown) => void }) {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/revit/export", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) });
      const data = await res.json();
      onResult?.(data);
    } catch { /* silent */ }
    setLoading(false);
  };

  return (
    <Button variant="secondary" onClick={handleExport} disabled={loading} className="w-full">
      {loading ? "Exporting..." : "Import from Revit"}
    </Button>
  );
}

export function RevitModelEstimateButton({ onResult }: { onResult?: (data: unknown) => void }) {
  const [loading, setLoading] = useState(false);

  const handleEstimate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/revit/estimate-model", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) });
      const data = await res.json();
      onResult?.(data);
    } catch { /* silent */ }
    setLoading(false);
  };

  return (
    <Button variant="secondary" onClick={handleEstimate} disabled={loading} className="w-full">
      {loading ? "Running QTO..." : "Estimate from Revit Model"}
    </Button>
  );
}
