"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { useApi, apiPost, apiDelete } from "@/lib/hooks";

interface Component { description: string; material: number; labor: number; equipment: number; wasteFactor: number; }
interface Assembly { id: string; name: string; category: string; unit: string; description: string; components: string; totalCost: number; createdAt: string; }

const categoryLabels: Record<string, string> = { wall: "Wall", floor: "Floor", ceiling: "Ceiling", roof: "Roof", foundation: "Foundation" };

export default function AssembliesPage() {
  const { data: assemblies, loading, refetch } = useApi<Assembly[]>("/api/assemblies");
  const [showForm, setShowForm] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", category: "wall", unit: "SF", description: "" });
  const [comps, setComps] = useState<Component[]>([{ description: "", material: 0, labor: 0, equipment: 0, wasteFactor: 5 }]);

  const items = assemblies || [];
  const grouped = items.reduce((acc, a) => { acc[a.category] = acc[a.category] || []; acc[a.category].push(a); return acc; }, {} as Record<string, Assembly[]>);

  const addComp = () => setComps([...comps, { description: "", material: 0, labor: 0, equipment: 0, wasteFactor: 5 }]);
  const updateComp = (i: number, field: string, val: string | number) => {
    const u = [...comps]; (u[i] as unknown as Record<string, string | number>)[field] = val; setComps(u);
  };

  const totalCost = comps.reduce((s, c) => s + (c.material + c.labor + c.equipment) * (1 + c.wasteFactor / 100), 0);

  const handleCreate = async () => {
    if (!form.name) return;
    await apiPost("/api/assemblies", { ...form, components: comps.filter(c => c.description) });
    setShowForm(false); setForm({ name: "", category: "wall", unit: "SF", description: "" });
    setComps([{ description: "", material: 0, labor: 0, equipment: 0, wasteFactor: 5 }]);
    refetch();
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div><h1 className="text-2xl font-bold">Assembly Library</h1><p className="text-gray-500 mt-1">Reusable material assemblies with component breakdowns and waste factors</p></div>
        <Button onClick={() => setShowForm(!showForm)}>New Assembly</Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card><CardContent className="p-5"><p className="text-sm text-gray-500">Total Assemblies</p><p className="text-2xl font-bold mt-1">{items.length}</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-sm text-gray-500">Wall Types</p><p className="text-2xl font-bold text-blue-600 mt-1">{items.filter(a => a.category === "wall").length}</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-sm text-gray-500">Floor/Ceiling</p><p className="text-2xl font-bold text-green-600 mt-1">{items.filter(a => a.category === "floor" || a.category === "ceiling").length}</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-sm text-gray-500">Roof</p><p className="text-2xl font-bold text-purple-600 mt-1">{items.filter(a => a.category === "roof").length}</p></CardContent></Card>
      </div>

      {showForm && (
        <Card><CardContent className="p-6">
          <h3 className="font-semibold mb-4">New Assembly</h3>
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div><label className="block text-sm font-medium mb-1">Name *</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="e.g. Exterior Wall Type B" /></div>
            <div><label className="block text-sm font-medium mb-1">Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm">
                <option value="wall">Wall</option><option value="floor">Floor</option><option value="ceiling">Ceiling</option><option value="roof">Roof</option><option value="foundation">Foundation</option>
              </select></div>
            <div><label className="block text-sm font-medium mb-1">Unit</label>
              <select value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm">
                <option>SF</option><option>LF</option><option>SY</option><option>EA</option>
              </select></div>
            <div><label className="block text-sm font-medium mb-1">Description</label><input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" /></div>
          </div>
          <h4 className="text-sm font-semibold mb-2">Components</h4>
          <table className="w-full text-sm mb-2">
            <thead><tr className="border-b text-left text-gray-500"><th className="pb-2">Component</th><th className="pb-2 w-24">Material</th><th className="pb-2 w-24">Labor</th><th className="pb-2 w-24">Equipment</th><th className="pb-2 w-20">Waste %</th><th className="pb-2 w-24 text-right">Subtotal</th><th className="pb-2 w-8"></th></tr></thead>
            <tbody>
              {comps.map((c, i) => {
                const sub = (c.material + c.labor + c.equipment) * (1 + c.wasteFactor / 100);
                return (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="py-1"><input value={c.description} onChange={e => updateComp(i, "description", e.target.value)} className="w-full border rounded px-2 py-1 text-sm" /></td>
                    <td className="py-1"><input type="number" step="0.01" value={c.material} onChange={e => updateComp(i, "material", Number(e.target.value))} className="w-full border rounded px-2 py-1 text-sm" /></td>
                    <td className="py-1"><input type="number" step="0.01" value={c.labor} onChange={e => updateComp(i, "labor", Number(e.target.value))} className="w-full border rounded px-2 py-1 text-sm" /></td>
                    <td className="py-1"><input type="number" step="0.01" value={c.equipment} onChange={e => updateComp(i, "equipment", Number(e.target.value))} className="w-full border rounded px-2 py-1 text-sm" /></td>
                    <td className="py-1"><input type="number" value={c.wasteFactor} onChange={e => updateComp(i, "wasteFactor", Number(e.target.value))} className="w-full border rounded px-2 py-1 text-sm" /></td>
                    <td className="py-1 text-right font-medium">{formatCurrency(sub)}</td>
                    <td className="py-1"><button onClick={() => setComps(comps.filter((_, j) => j !== i))} className="text-red-500 text-xs">X</button></td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot><tr className="font-bold"><td colSpan={5} className="py-2 text-right">Total per {form.unit}:</td><td className="py-2 text-right">{formatCurrency(totalCost)}</td><td></td></tr></tfoot>
          </table>
          <button onClick={addComp} className="text-sm text-blue-600 hover:underline mb-4">+ Add Component</button>
          <div className="flex gap-2"><Button size="sm" onClick={handleCreate}>Create Assembly</Button><Button variant="ghost" size="sm" onClick={() => setShowForm(false)}>Cancel</Button></div>
        </CardContent></Card>
      )}

      {loading && <p className="text-gray-500">Loading...</p>}

      {Object.entries(grouped).map(([cat, items]) => (
        <Card key={cat}>
          <CardHeader><CardTitle className="text-base">{categoryLabels[cat] || cat} Assemblies ({items.length})</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {items.map(asm => {
              const comps: Component[] = (() => { try { return JSON.parse(asm.components); } catch { return []; } })();
              return (
                <div key={asm.id} className="border rounded-lg overflow-hidden">
                  <div className="p-3 flex justify-between items-center cursor-pointer hover:bg-gray-50" onClick={() => setExpandedId(expandedId === asm.id ? null : asm.id)}>
                    <div><h4 className="font-medium text-sm">{asm.name}</h4><p className="text-xs text-gray-500">{asm.description}</p></div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-blue-600">{formatCurrency(asm.totalCost)}/{asm.unit}</span>
                      <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); apiDelete(`/api/assemblies/${asm.id}`).then(refetch); }}>X</Button>
                    </div>
                  </div>
                  {expandedId === asm.id && comps.length > 0 && (
                    <div className="border-t bg-gray-50 p-3">
                      <table className="w-full text-xs">
                        <thead><tr className="text-gray-500"><th className="pb-1 text-left">Component</th><th className="pb-1 text-right">Material</th><th className="pb-1 text-right">Labor</th><th className="pb-1 text-right">Equip</th><th className="pb-1 text-right">Waste</th><th className="pb-1 text-right">Subtotal</th></tr></thead>
                        <tbody>{comps.map((c, i) => (
                          <tr key={i} className="border-t border-gray-100">
                            <td className="py-1">{c.description}</td><td className="py-1 text-right">${c.material}</td><td className="py-1 text-right">${c.labor}</td>
                            <td className="py-1 text-right">${c.equipment}</td><td className="py-1 text-right">{c.wasteFactor}%</td>
                            <td className="py-1 text-right font-medium">${((c.material + c.labor + c.equipment) * (1 + c.wasteFactor / 100)).toFixed(2)}</td>
                          </tr>
                        ))}</tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
