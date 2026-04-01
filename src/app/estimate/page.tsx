"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

const buildingTypes = [
  "office_low_rise", "office_mid_rise", "office_high_rise",
  "residential_single_family", "residential_multi_family", "apartment_low_rise", "apartment_mid_rise",
  "retail_strip", "retail_big_box", "warehouse",
  "hotel_economy", "hotel_mid_range", "hotel_luxury",
  "hospital", "medical_office", "school_elementary", "school_high_school", "university",
  "restaurant", "parking_garage", "industrial_light", "data_center", "laboratory",
];

const qualityLevels = ["economy", "standard", "premium", "luxury"];
const cities = [
  "national_average", "new_york", "los_angeles", "chicago", "houston", "miami",
  "san_francisco", "boston", "seattle", "denver", "atlanta", "dallas", "phoenix",
  "london", "dubai", "toronto", "mexico_city", "sao_paulo",
];

interface EstimateResult {
  success: boolean;
  buildingType: string;
  grossFloorArea: { sqft: number; sqm: number };
  divisionBreakdown: { division: string; description: string; percent: number; totalCost: number; material: number; labor: number; equipment: number }[];
  summary: { directConstructionCost: number; totalProjectCost: number; costPerSF: number; costPerSqm: number };
  confidenceInterval: { low: number; expected: number; high: number };
  costSplit: { materials: { total: number; percent: number }; labor: { total: number; percent: number }; equipment: { total: number; percent: number } };
}

export default function EstimatePage() {
  const [form, setForm] = useState({
    buildingType: "office_low_rise",
    grossArea: 500,
    stories: 2,
    quality: "standard",
    city: "national_average",
    basement: 0,
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EstimateResult | null>(null);

  const runEstimate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      alert("Estimate failed. Check API configuration.");
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Cost Estimator</h1>
        <p className="text-gray-500 mt-1">Conceptual cost estimate from building description — no model required</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Building Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Building Type</label>
              <select
                value={form.buildingType}
                onChange={(e) => setForm({ ...form, buildingType: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              >
                {buildingTypes.map((t) => (
                  <option key={t} value={t}>{t.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Gross Floor Area (sqm)</label>
              <input
                type="number"
                value={form.grossArea}
                onChange={(e) => setForm({ ...form, grossArea: Number(e.target.value) })}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
              <p className="text-xs text-gray-400 mt-1">{Math.round(form.grossArea * 10.7639)} sqft</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Stories</label>
                <input
                  type="number"
                  value={form.stories}
                  onChange={(e) => setForm({ ...form, stories: Number(e.target.value) })}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Basement Levels</label>
                <input
                  type="number"
                  value={form.basement}
                  onChange={(e) => setForm({ ...form, basement: Number(e.target.value) })}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Quality Level</label>
              <div className="grid grid-cols-4 gap-1">
                {qualityLevels.map((q) => (
                  <button
                    key={q}
                    onClick={() => setForm({ ...form, quality: q })}
                    className={`text-xs py-2 rounded-lg border transition-colors capitalize ${
                      form.quality === q ? "bg-blue-600 text-white border-blue-600" : "hover:bg-gray-50"
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">City / Region</label>
              <select
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              >
                {cities.map((c) => (
                  <option key={c} value={c}>{c.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}</option>
                ))}
              </select>
            </div>

            <Button className="w-full" onClick={runEstimate} disabled={loading}>
              {loading ? "Calculating..." : "Generate Estimate"}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="col-span-2 space-y-4">
          {!result ? (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg">Configure & Run Estimate</h3>
                <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
                  Select building type, area, quality, and city. The AI generates a full MasterFormat division breakdown with material, labor, and equipment costs.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-3 gap-4">
                <Card className="bg-blue-600 text-white border-0">
                  <CardContent className="p-5">
                    <p className="text-blue-200 text-sm">Total Project Cost</p>
                    <p className="text-2xl font-bold mt-1">{formatCurrency(result.summary.totalProjectCost)}</p>
                    <p className="text-blue-200 text-xs mt-1">{formatCurrency(result.summary.costPerSqm)}/sqm</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-5">
                    <p className="text-gray-500 text-sm">Direct Construction</p>
                    <p className="text-2xl font-bold mt-1">{formatCurrency(result.summary.directConstructionCost)}</p>
                    <p className="text-gray-400 text-xs mt-1">{formatCurrency(result.summary.costPerSF)}/SF</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-5">
                    <p className="text-gray-500 text-sm">Confidence Range</p>
                    <p className="text-lg font-bold mt-1">
                      {formatCurrency(result.confidenceInterval.low)} - {formatCurrency(result.confidenceInterval.high)}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">-25% to +30%</p>
                  </CardContent>
                </Card>
              </div>

              {/* Cost Split */}
              {result.costSplit && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Cost Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-1 h-8 rounded-lg overflow-hidden mb-3">
                      <div className="bg-blue-500" style={{ width: `${result.costSplit.materials.percent}%` }} />
                      <div className="bg-green-500" style={{ width: `${result.costSplit.labor.percent}%` }} />
                      <div className="bg-orange-500" style={{ width: `${result.costSplit.equipment.percent}%` }} />
                    </div>
                    <div className="flex gap-6 text-sm">
                      <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded" /> Materials {result.costSplit.materials.percent}%</div>
                      <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded" /> Labor {result.costSplit.labor.percent}%</div>
                      <div className="flex items-center gap-2"><div className="w-3 h-3 bg-orange-500 rounded" /> Equipment {result.costSplit.equipment.percent}%</div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Division Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">MasterFormat Division Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left text-gray-500">
                        <th className="pb-2">Division</th>
                        <th className="pb-2 text-right">%</th>
                        <th className="pb-2 text-right">Material</th>
                        <th className="pb-2 text-right">Labor</th>
                        <th className="pb-2 text-right">Equipment</th>
                        <th className="pb-2 text-right font-semibold">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.divisionBreakdown?.filter(d => d.totalCost > 0).map((d, i) => (
                        <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="py-2">{d.division} - {d.description}</td>
                          <td className="py-2 text-right text-gray-500">{d.percent}%</td>
                          <td className="py-2 text-right">{formatCurrency(d.material)}</td>
                          <td className="py-2 text-right">{formatCurrency(d.labor)}</td>
                          <td className="py-2 text-right">{formatCurrency(d.equipment)}</td>
                          <td className="py-2 text-right font-semibold">{formatCurrency(d.totalCost)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => {
                  if (!result) return;
                  let csv = "Division,Description,%,Material,Labor,Equipment,Total\n";
                  result.divisionBreakdown?.forEach(d => { csv += `${d.division},${d.description},${d.percent},${d.material},${d.labor},${d.equipment},${d.totalCost}\n`; });
                  csv += `\n,,,,,,${result.summary.totalProjectCost}\n`;
                  const blob = new Blob([csv], { type: "text/csv" });
                  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "estimate.csv"; a.click();
                }}>Export CSV</Button>
                <Button variant="secondary" onClick={async () => {
                  if (!result) return;
                  const projectId = localStorage.getItem("revara_active_project");
                  if (!projectId) { alert("Select a project first"); return; }
                  for (const d of result.divisionBreakdown || []) {
                    try {
                      const lines = await fetch(`/api/budget?projectId=${projectId}`).then(r => r.json());
                      const line = lines.find((l: { code: string }) => l.code === d.division);
                      if (line) await fetch(`/api/budget/${line.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ budgeted: d.totalCost }) });
                    } catch {}
                  }
                  alert("Budget updated with estimate values! Go to Budget page to see.");
                }}>Import to Budget</Button>
                <Button onClick={() => alert("Connect Revit MCP to build. Use AI Chat for full control.")}>Build in Revit</Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
