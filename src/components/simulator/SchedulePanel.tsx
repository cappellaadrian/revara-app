"use client";
import { useState, useCallback, useMemo, useRef } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
export interface ScheduleTask {
  id: string;
  name: string;
  startDate: string;   // ISO
  endDate: string;     // ISO
  durationDays: number;
  percentComplete: number;
  wbsCode: string;
  category: string;
  elementGlobalIds: string[];
  costBudget: number;
}

type TaskStatus = "not-started" | "in-progress" | "complete";

interface Props {
  tasks: ScheduleTask[];
  currentDate: Date | null;
  selectedTaskId: string | null;
  onSelectTask: (id: string | null) => void;
  onTasksImported: (tasks: ScheduleTask[]) => void;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
function getTaskStatus(task: ScheduleTask, date: Date | null): TaskStatus {
  if (!date) return "not-started";
  const s = new Date(task.startDate);
  const e = new Date(task.endDate);
  if (date > e) return "complete";
  if (date >= s && date <= e) return "in-progress";
  return "not-started";
}

const STATUS_STYLES: Record<TaskStatus, { bg: string; text: string; label: string; dot: string }> = {
  "not-started": { bg: "bg-zinc-800/40", text: "text-zinc-500", label: "Not Started", dot: "bg-zinc-600" },
  "in-progress": { bg: "bg-blue-500/10", text: "text-blue-400", label: "In Progress", dot: "bg-blue-500" },
  "complete":    { bg: "bg-green-500/10", text: "text-green-400", label: "Complete", dot: "bg-green-500" },
};

function parseDate(str: string): Date | null {
  if (!str) return null;
  const formats = [
    str,
    str.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1"),
    str.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$1-$2"),
    str.replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1"),
  ];
  for (const f of formats) {
    const d = new Date(f);
    if (!isNaN(d.getTime())) return d;
  }
  return null;
}

/* ------------------------------------------------------------------ */
/*  CSV parser                                                         */
/* ------------------------------------------------------------------ */
function parseCSV(text: string): ScheduleTask[] {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  if (lines.length < 2) throw new Error("CSV needs a header row and at least one data row");

  const headers = lines[0]
    .split(",")
    .map((h) => h.trim().toLowerCase().replace(/["\s]/g, ""));
  const findCol = (names: string[]) =>
    headers.findIndex((h) => names.some((n) => h.includes(n)));

  const nameIdx = findCol(["name", "taskname", "task_name", "nombre", "activity", "actividad", "description"]);
  const startIdx = findCol(["start", "inicio", "startdate", "start_date", "fecha_inicio"]);
  const endIdx = findCol(["end", "fin", "finish", "enddate", "end_date", "fecha_fin"]);
  const wbsIdx = findCol(["wbs", "code", "codigo"]);
  const costIdx = findCol(["cost", "costo", "budget", "presupuesto"]);
  const progressIdx = findCol(["progress", "complete", "avance", "percent"]);
  const categoryIdx = findCol(["category", "type", "categoria", "tipo", "phase", "fase"]);

  if (nameIdx === -1) throw new Error("Could not find a 'Name' / 'Task Name' column");
  if (startIdx === -1) throw new Error("Could not find a 'Start Date' column");
  if (endIdx === -1) throw new Error("Could not find an 'End Date' / 'Finish' column");

  return lines
    .slice(1)
    .map((line, i) => {
      const cols: string[] = [];
      let current = "";
      let inQuotes = false;
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
        category: categoryIdx >= 0 ? cols[categoryIdx] || "General" : "General",
        elementGlobalIds: [],
        costBudget: costIdx >= 0 ? parseFloat(cols[costIdx]?.replace(/[,$]/g, "")) || 0 : 0,
      } as ScheduleTask;
    })
    .filter(Boolean) as ScheduleTask[];
}

/* ------------------------------------------------------------------ */
/*  XML parser (MS Project)                                            */
/* ------------------------------------------------------------------ */
function parseXML(text: string): ScheduleTask[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "text/xml");
  const taskNodes = doc.querySelectorAll("Task");
  if (taskNodes.length === 0) throw new Error("No tasks found in XML file");

  return Array.from(taskNodes)
    .map((taskEl, i) => {
      const name = taskEl.querySelector("Name")?.textContent || `Task ${i + 1}`;
      const start = taskEl.querySelector("Start")?.textContent;
      const finish = taskEl.querySelector("Finish")?.textContent;
      const uid = taskEl.querySelector("UID")?.textContent || String(i);
      const wbs = taskEl.querySelector("WBS")?.textContent || "";
      const pct = parseFloat(taskEl.querySelector("PercentComplete")?.textContent || "0");
      const cost = parseFloat(taskEl.querySelector("Cost")?.textContent || "0");
      if (!start || !finish) return null;
      const s = new Date(start);
      const e = new Date(finish);
      if (isNaN(s.getTime()) || isNaN(e.getTime())) return null;
      return {
        id: `task-${uid}`,
        name,
        startDate: s.toISOString(),
        endDate: e.toISOString(),
        durationDays: Math.max(1, Math.ceil((e.getTime() - s.getTime()) / 86400000)),
        percentComplete: pct,
        wbsCode: wbs,
        category: "General",
        elementGlobalIds: [],
        costBudget: cost,
      } as ScheduleTask;
    })
    .filter(Boolean) as ScheduleTask[];
}

/* ------------------------------------------------------------------ */
/*  Demo schedule generator                                            */
/* ------------------------------------------------------------------ */
function addDays(date: Date, days: number): string {
  return new Date(date.getTime() + days * 86400000).toISOString();
}

function generateDemoSchedule(): ScheduleTask[] {
  const start = new Date("2026-05-01");
  return [
    { id: "t1",  name: "Site Preparation & Excavation", category: "Foundation", wbsCode: "01",    startDate: addDays(start, 0),   endDate: addDays(start, 21),  durationDays: 21,  percentComplete: 0, elementGlobalIds: [], costBudget: 45000 },
    { id: "t2",  name: "Foundation Slab",               category: "Foundation", wbsCode: "02",    startDate: addDays(start, 14),  endDate: addDays(start, 35),  durationDays: 21,  percentComplete: 0, elementGlobalIds: [], costBudget: 60000 },
    { id: "t3",  name: "Level 1 Columns",               category: "Structure",  wbsCode: "03.01", startDate: addDays(start, 28),  endDate: addDays(start, 49),  durationDays: 21,  percentComplete: 0, elementGlobalIds: [], costBudget: 35000 },
    { id: "t4",  name: "Level 1 Walls",                 category: "Structure",  wbsCode: "03.02", startDate: addDays(start, 35),  endDate: addDays(start, 63),  durationDays: 28,  percentComplete: 0, elementGlobalIds: [], costBudget: 50000 },
    { id: "t5",  name: "Level 2 Floor Slab",            category: "Structure",  wbsCode: "04",    startDate: addDays(start, 49),  endDate: addDays(start, 70),  durationDays: 21,  percentComplete: 0, elementGlobalIds: [], costBudget: 55000 },
    { id: "t6",  name: "Level 2 Columns",               category: "Structure",  wbsCode: "05.01", startDate: addDays(start, 63),  endDate: addDays(start, 84),  durationDays: 21,  percentComplete: 0, elementGlobalIds: [], costBudget: 35000 },
    { id: "t7",  name: "Level 2 Walls",                 category: "Structure",  wbsCode: "05.02", startDate: addDays(start, 70),  endDate: addDays(start, 98),  durationDays: 28,  percentComplete: 0, elementGlobalIds: [], costBudget: 50000 },
    { id: "t8",  name: "Roof Structure",                category: "Roofing",    wbsCode: "06",    startDate: addDays(start, 84),  endDate: addDays(start, 105), durationDays: 21,  percentComplete: 0, elementGlobalIds: [], costBudget: 40000 },
    { id: "t9",  name: "Roof Covering",                 category: "Roofing",    wbsCode: "07",    startDate: addDays(start, 98),  endDate: addDays(start, 112), durationDays: 14,  percentComplete: 0, elementGlobalIds: [], costBudget: 30000 },
    { id: "t10", name: "MEP Installations",             category: "MEP",        wbsCode: "08",    startDate: addDays(start, 70),  endDate: addDays(start, 119), durationDays: 49,  percentComplete: 0, elementGlobalIds: [], costBudget: 65000 },
    { id: "t11", name: "Windows & Doors",               category: "Envelope",   wbsCode: "09",    startDate: addDays(start, 105), endDate: addDays(start, 126), durationDays: 21,  percentComplete: 0, elementGlobalIds: [], costBudget: 25000 },
    { id: "t12", name: "Interior Finishes",             category: "Finishes",   wbsCode: "10",    startDate: addDays(start, 112), endDate: addDays(start, 147), durationDays: 35,  percentComplete: 0, elementGlobalIds: [], costBudget: 55000 },
    { id: "t13", name: "Painting & Detailing",          category: "Finishes",   wbsCode: "11",    startDate: addDays(start, 133), endDate: addDays(start, 154), durationDays: 21,  percentComplete: 0, elementGlobalIds: [], costBudget: 20000 },
    { id: "t14", name: "Exterior & Landscaping",        category: "Exterior",   wbsCode: "12",    startDate: addDays(start, 140), endDate: addDays(start, 161), durationDays: 21,  percentComplete: 0, elementGlobalIds: [], costBudget: 15000 },
    { id: "t15", name: "Cleanup & Handover",            category: "Closeout",   wbsCode: "13",    startDate: addDays(start, 154), endDate: addDays(start, 168), durationDays: 14,  percentComplete: 0, elementGlobalIds: [], costBudget: 5000 },
  ];
}

/* ================================================================== */
/*  Schedule Panel Component                                           */
/* ================================================================== */
export function SchedulePanel({ tasks, currentDate, selectedTaskId, onSelectTask, onTasksImported }: Props) {
  const [showImport, setShowImport] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [filter, setFilter] = useState<TaskStatus | "all">("all");
  const fileRef = useRef<HTMLInputElement>(null);

  /* ---- date range for Gantt ---- */
  const dateRange = useMemo(() => {
    if (tasks.length === 0) return null;
    const starts = tasks.map((t) => new Date(t.startDate).getTime());
    const ends = tasks.map((t) => new Date(t.endDate).getTime());
    return { start: new Date(Math.min(...starts)), end: new Date(Math.max(...ends)) };
  }, [tasks]);

  const totalSpan = dateRange ? dateRange.end.getTime() - dateRange.start.getTime() : 1;

  /* ---- filtered tasks ---- */
  const filteredTasks = useMemo(() => {
    if (filter === "all") return tasks;
    return tasks.filter((t) => getTaskStatus(t, currentDate) === filter);
  }, [tasks, currentDate, filter]);

  /* ---- status counts ---- */
  const counts = useMemo(() => {
    const c = { "not-started": 0, "in-progress": 0, complete: 0 };
    tasks.forEach((t) => {
      const s = getTaskStatus(t, currentDate);
      c[s]++;
    });
    return c;
  }, [tasks, currentDate]);

  /* ---- file handling ---- */
  const handleFile = useCallback(
    async (file: File) => {
      setParseError(null);
      try {
        const text = await file.text();
        let parsed: ScheduleTask[];
        if (file.name.endsWith(".xml")) {
          parsed = parseXML(text);
        } else if (file.name.endsWith(".csv") || file.name.endsWith(".txt")) {
          parsed = parseCSV(text);
        } else if (file.name.endsWith(".json")) {
          const data = JSON.parse(text);
          parsed = (Array.isArray(data) ? data : data.tasks || []).map(
            (t: ScheduleTask, i: number) => ({ ...t, id: t.id || `task-${i}`, elementGlobalIds: t.elementGlobalIds || [], category: t.category || "General" })
          );
        } else {
          throw new Error("Unsupported format. Use CSV, XML (MS Project), or JSON.");
        }
        if (parsed.length === 0) throw new Error("No valid tasks found");
        onTasksImported(parsed);
        setShowImport(false);
      } catch (err) {
        setParseError(err instanceof Error ? err.message : "Parse failed");
      }
    },
    [onTasksImported]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  /* ---- Import view ---- */
  if (showImport || tasks.length === 0) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-3 border-b border-zinc-800">
          <h3 className="text-sm font-semibold text-white">Import Schedule</h3>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
              dragOver ? "border-violet-500 bg-violet-500/10" : "border-zinc-700 hover:border-zinc-500"
            }`}
          >
            <input
              ref={fileRef}
              type="file"
              accept=".csv,.xml,.json,.txt"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />
            <svg className="w-8 h-8 mx-auto mb-2 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <p className="text-sm text-zinc-300">Drop file or click to browse</p>
            <p className="text-xs text-zinc-600 mt-1">CSV, XML (MS Project), JSON</p>
          </div>

          {parseError && (
            <p className="text-xs text-red-400 bg-red-500/10 p-2 rounded-lg">{parseError}</p>
          )}

          <div className="border-t border-zinc-800 pt-3">
            <p className="text-xs text-zinc-500 mb-2">Expected CSV columns:</p>
            <pre className="text-[10px] text-zinc-600 bg-zinc-900 p-2 rounded overflow-x-auto whitespace-pre">
{`Name,Start,End,WBS,Category,Cost
Foundation,2026-05-01,2026-05-21,01,Foundation,45000
Columns L1,2026-05-28,2026-06-18,03.01,Structure,35000`}
            </pre>
          </div>

          <button
            onClick={() => onTasksImported(generateDemoSchedule())}
            className="w-full py-2 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 transition-colors"
          >
            Load Demo Schedule (15 tasks)
          </button>

          {tasks.length > 0 && (
            <button
              onClick={() => setShowImport(false)}
              className="w-full py-2 px-3 rounded-lg text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    );
  }

  /* ---- Main schedule view (task list + Gantt bars) ---- */
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-3 border-b border-zinc-800 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Schedule</h3>
          <button
            onClick={() => setShowImport(true)}
            className="text-[10px] text-zinc-500 hover:text-violet-400 transition-colors"
          >
            Re-import
          </button>
        </div>

        {/* Status filter pills */}
        <div className="flex gap-1">
          {(["all", "not-started", "in-progress", "complete"] as const).map((s) => {
            const count = s === "all" ? tasks.length : counts[s];
            const isActive = filter === s;
            return (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
                  isActive
                    ? "bg-violet-600/20 text-violet-400 font-medium"
                    : "bg-zinc-800/50 text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {s === "all" ? "All" : STATUS_STYLES[s].label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Task list with inline Gantt */}
      <div className="flex-1 overflow-y-auto">
        {filteredTasks.map((task) => {
          const status = getTaskStatus(task, currentDate);
          const style = STATUS_STYLES[status];
          const isSelected = task.id === selectedTaskId;

          // Gantt bar position
          const barLeft = dateRange
            ? ((new Date(task.startDate).getTime() - dateRange.start.getTime()) / totalSpan) * 100
            : 0;
          const barWidth = dateRange
            ? ((new Date(task.endDate).getTime() - new Date(task.startDate).getTime()) / totalSpan) * 100
            : 0;

          // Current-date progress within this task
          let taskProgress = 0;
          if (currentDate && status === "in-progress") {
            const s = new Date(task.startDate).getTime();
            const e = new Date(task.endDate).getTime();
            taskProgress = Math.min(100, Math.max(0, ((currentDate.getTime() - s) / (e - s)) * 100));
          } else if (status === "complete") {
            taskProgress = 100;
          }

          return (
            <button
              key={task.id}
              onClick={() => onSelectTask(isSelected ? null : task.id)}
              className={`w-full text-left px-3 py-2 border-b border-zinc-800/50 transition-colors ${
                isSelected
                  ? "bg-violet-600/10 border-l-2 border-l-violet-500"
                  : "hover:bg-zinc-800/30 border-l-2 border-l-transparent"
              }`}
            >
              {/* Task name row */}
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${style.dot}`} />
                <span className="text-xs font-medium text-white truncate flex-1">
                  {task.name}
                </span>
                {task.elementGlobalIds.length > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-violet-500/15 text-violet-400 flex-shrink-0">
                    {task.elementGlobalIds.length} linked
                  </span>
                )}
              </div>

              {/* Dates */}
              <div className="flex items-center gap-2 ml-4 mb-1.5">
                <span className="text-[10px] text-zinc-500">
                  {new Date(task.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  {" - "}
                  {new Date(task.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
                <span className="text-[10px] text-zinc-600">
                  {task.durationDays}d
                </span>
                {task.wbsCode && (
                  <span className="text-[10px] text-zinc-600 font-mono">
                    [{task.wbsCode}]
                  </span>
                )}
              </div>

              {/* Inline Gantt bar */}
              <div className="ml-4 h-2.5 bg-zinc-800/50 rounded-full relative overflow-hidden">
                <div
                  className="absolute top-0 bottom-0 rounded-full opacity-20"
                  style={{
                    left: `${barLeft}%`,
                    width: `${Math.max(barWidth, 1)}%`,
                    backgroundColor: status === "complete" ? "#22c55e" : status === "in-progress" ? "#3b82f6" : "#374151",
                  }}
                />
                <div
                  className="absolute top-0 bottom-0 rounded-full"
                  style={{
                    left: `${barLeft}%`,
                    width: `${Math.max(barWidth * (taskProgress / 100), 0.5)}%`,
                    backgroundColor: status === "complete" ? "#22c55e" : status === "in-progress" ? "#3b82f6" : "#374151",
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
