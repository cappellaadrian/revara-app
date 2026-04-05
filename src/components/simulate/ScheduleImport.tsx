"use client";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import type { TaskData } from "@/app/simulate/page";

interface Props {
  onImport: (tasks: TaskData[]) => void;
  onCancel: () => void;
}

export function ScheduleImport({ onImport, onCancel }: Props) {
  const [dragOver, setDragOver] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [error, setError] = useState("");

  const parseCSV = useCallback((text: string): TaskData[] => {
    const lines = text.split("\n").map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length < 2) throw new Error("CSV must have a header row and at least one data row");

    const headers = lines[0].split(",").map(h => h.trim().toLowerCase().replace(/["\s]/g, ""));
    const findCol = (names: string[]) => headers.findIndex(h => names.some(n => h.includes(n)));

    const nameIdx = findCol(["name", "taskname", "task_name", "nombre", "activity", "actividad", "description"]);
    const startIdx = findCol(["start", "inicio", "startdate", "start_date", "fecha_inicio"]);
    const endIdx = findCol(["end", "fin", "finish", "enddate", "end_date", "fecha_fin"]);
    const wbsIdx = findCol(["wbs", "code", "codigo", "id"]);
    const costIdx = findCol(["cost", "costo", "budget", "presupuesto"]);
    const progressIdx = findCol(["progress", "complete", "avance", "percent"]);

    if (nameIdx === -1) throw new Error("Could not find a 'Name' or 'Task Name' column");
    if (startIdx === -1) throw new Error("Could not find a 'Start Date' column");
    if (endIdx === -1) throw new Error("Could not find an 'End Date' or 'Finish' column");

    return lines.slice(1).map((line, i) => {
      // Handle quoted CSV fields
      const cols: string[] = [];
      let current = "", inQuotes = false;
      for (const ch of line) {
        if (ch === '"') { inQuotes = !inQuotes; continue; }
        if (ch === "," && !inQuotes) { cols.push(current.trim()); current = ""; continue; }
        current += ch;
      }
      cols.push(current.trim());

      const name = cols[nameIdx] || `Task ${i + 1}`;
      const startDate = parseDate(cols[startIdx]);
      const endDate = parseDate(cols[endIdx]);

      if (!startDate || !endDate) return null;

      const durationDays = Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / 86400000));

      return {
        id: `task-${i}`,
        name,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        durationDays,
        percentComplete: progressIdx >= 0 ? parseFloat(cols[progressIdx]) || 0 : 0,
        wbsCode: wbsIdx >= 0 ? cols[wbsIdx] || "" : "",
        elementGlobalIds: [],
        costBudget: costIdx >= 0 ? parseFloat(cols[costIdx]?.replace(/[,$]/g, "")) || 0 : 0,
      } as TaskData;
    }).filter(Boolean) as TaskData[];
  }, []);

  const parseXML = useCallback((text: string): TaskData[] => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/xml");

    // MS Project XML format
    const tasks = doc.querySelectorAll("Task");
    if (tasks.length === 0) throw new Error("No tasks found in XML file");

    return Array.from(tasks).map((task, i) => {
      const name = task.querySelector("Name")?.textContent || `Task ${i + 1}`;
      const start = task.querySelector("Start")?.textContent;
      const finish = task.querySelector("Finish")?.textContent;
      const uid = task.querySelector("UID")?.textContent || String(i);
      const wbs = task.querySelector("WBS")?.textContent || "";
      const pctComplete = parseFloat(task.querySelector("PercentComplete")?.textContent || "0");
      const cost = parseFloat(task.querySelector("Cost")?.textContent || "0");

      if (!start || !finish) return null;

      const startDate = new Date(start);
      const endDate = new Date(finish);
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return null;

      return {
        id: `task-${uid}`,
        name,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        durationDays: Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / 86400000)),
        percentComplete: pctComplete,
        wbsCode: wbs,
        elementGlobalIds: [],
        costBudget: cost,
      } as TaskData;
    }).filter(Boolean) as TaskData[];
  }, []);

  const handleFile = useCallback(async (file: File) => {
    setParsing(true);
    setError("");
    try {
      const text = await file.text();
      let tasks: TaskData[];

      if (file.name.endsWith(".xml")) {
        tasks = parseXML(text);
      } else if (file.name.endsWith(".csv") || file.name.endsWith(".txt")) {
        tasks = parseCSV(text);
      } else if (file.name.endsWith(".json")) {
        const data = JSON.parse(text);
        tasks = Array.isArray(data) ? data : data.tasks || [];
      } else {
        throw new Error("Unsupported format. Use CSV, XML (MS Project), or JSON.");
      }

      if (tasks.length === 0) throw new Error("No valid tasks found in file");
      onImport(tasks);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to parse file");
    }
    setParsing(false);
  }, [onImport, parseCSV, parseXML]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDemoSchedule = () => {
    // Generate a realistic construction schedule for demo
    const start = new Date("2026-05-01");
    const demoTasks: TaskData[] = [
      { id: "t1", name: "Excavación y Cimentación", startDate: addDays(start, 0), endDate: addDays(start, 21), durationDays: 21, percentComplete: 0, wbsCode: "01", elementGlobalIds: [], costBudget: 45000 },
      { id: "t2", name: "Losa de Cimentación", startDate: addDays(start, 14), endDate: addDays(start, 35), durationDays: 21, percentComplete: 0, wbsCode: "02", elementGlobalIds: [], costBudget: 60000 },
      { id: "t3", name: "Columnas Nivel 1", startDate: addDays(start, 28), endDate: addDays(start, 49), durationDays: 21, percentComplete: 0, wbsCode: "03.01", elementGlobalIds: [], costBudget: 35000 },
      { id: "t4", name: "Muros Nivel 1", startDate: addDays(start, 35), endDate: addDays(start, 63), durationDays: 28, percentComplete: 0, wbsCode: "03.02", elementGlobalIds: [], costBudget: 50000 },
      { id: "t5", name: "Losa Nivel 2", startDate: addDays(start, 49), endDate: addDays(start, 70), durationDays: 21, percentComplete: 0, wbsCode: "04", elementGlobalIds: [], costBudget: 55000 },
      { id: "t6", name: "Columnas Nivel 2", startDate: addDays(start, 63), endDate: addDays(start, 84), durationDays: 21, percentComplete: 0, wbsCode: "05.01", elementGlobalIds: [], costBudget: 35000 },
      { id: "t7", name: "Muros Nivel 2", startDate: addDays(start, 70), endDate: addDays(start, 98), durationDays: 28, percentComplete: 0, wbsCode: "05.02", elementGlobalIds: [], costBudget: 50000 },
      { id: "t8", name: "Estructura de Techo", startDate: addDays(start, 84), endDate: addDays(start, 105), durationDays: 21, percentComplete: 0, wbsCode: "06", elementGlobalIds: [], costBudget: 40000 },
      { id: "t9", name: "Cubierta / Techo", startDate: addDays(start, 98), endDate: addDays(start, 112), durationDays: 14, percentComplete: 0, wbsCode: "07", elementGlobalIds: [], costBudget: 30000 },
      { id: "t10", name: "Instalaciones MEP", startDate: addDays(start, 70), endDate: addDays(start, 119), durationDays: 49, percentComplete: 0, wbsCode: "08", elementGlobalIds: [], costBudget: 65000 },
      { id: "t11", name: "Ventanas y Puertas", startDate: addDays(start, 105), endDate: addDays(start, 126), durationDays: 21, percentComplete: 0, wbsCode: "09", elementGlobalIds: [], costBudget: 25000 },
      { id: "t12", name: "Acabados Interiores", startDate: addDays(start, 112), endDate: addDays(start, 147), durationDays: 35, percentComplete: 0, wbsCode: "10", elementGlobalIds: [], costBudget: 55000 },
      { id: "t13", name: "Pintura y Detalles", startDate: addDays(start, 133), endDate: addDays(start, 154), durationDays: 21, percentComplete: 0, wbsCode: "11", elementGlobalIds: [], costBudget: 20000 },
      { id: "t14", name: "Exteriores y Paisajismo", startDate: addDays(start, 140), endDate: addDays(start, 161), durationDays: 21, percentComplete: 0, wbsCode: "12", elementGlobalIds: [], costBudget: 15000 },
      { id: "t15", name: "Limpieza y Entrega", startDate: addDays(start, 154), endDate: addDays(start, 168), durationDays: 14, percentComplete: 0, wbsCode: "13", elementGlobalIds: [], costBudget: 5000 },
    ];
    onImport(demoTasks);
  };

  return (
    <div className="flex-1 p-4 space-y-4 overflow-y-auto">
      <h3 className="text-sm font-semibold text-white">Importar Cronograma</h3>

      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = ".csv,.xml,.json,.txt";
          input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) handleFile(file);
          };
          input.click();
        }}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
          dragOver ? "border-violet-500 bg-violet-500/10" : "border-zinc-700 hover:border-zinc-500"
        }`}
      >
        <div className="text-3xl mb-2">📁</div>
        <p className="text-sm text-zinc-300">Arrastra un archivo o haz clic</p>
        <p className="text-xs text-zinc-600 mt-1">CSV, XML (MS Project), JSON</p>
      </div>

      {error && <p className="text-xs text-red-400 bg-red-500/10 p-2 rounded">{error}</p>}
      {parsing && <p className="text-xs text-zinc-400">Procesando...</p>}

      <div className="border-t border-zinc-800 pt-4">
        <p className="text-xs text-zinc-500 mb-2">CSV format esperado:</p>
        <pre className="text-[10px] text-zinc-600 bg-zinc-900 p-2 rounded overflow-x-auto">
{`Name,Start,End,WBS,Cost
Excavación,2026-05-01,2026-05-21,01,45000
Cimentación,2026-05-15,2026-06-04,02,60000`}
        </pre>
      </div>

      <Button size="sm" variant="secondary" className="w-full text-xs" onClick={handleDemoSchedule}>
        🎬 Cargar Demo (cronograma ejemplo)
      </Button>

      <Button size="sm" variant="ghost" className="w-full text-xs text-zinc-500" onClick={onCancel}>
        Cancelar
      </Button>
    </div>
  );
}

function addDays(date: Date, days: number): string {
  return new Date(date.getTime() + days * 86400000).toISOString();
}

function parseDate(str: string): Date | null {
  if (!str) return null;
  // Try multiple date formats
  const formats = [
    str, // ISO
    str.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1"), // DD/MM/YYYY
    str.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$1-$2"), // MM/DD/YYYY
    str.replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1"),   // DD-MM-YYYY
  ];
  for (const f of formats) {
    const d = new Date(f);
    if (!isNaN(d.getTime())) return d;
  }
  return null;
}
