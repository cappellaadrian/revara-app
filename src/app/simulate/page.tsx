"use client";
import dynamic from "next/dynamic";
import { useState, useCallback, useRef, useEffect } from "react";
import { SchedulePanel } from "@/components/simulator/SchedulePanel";
import type { ScheduleTask } from "@/components/simulator/SchedulePanel";
import { TimelinePlayer } from "@/components/simulator/TimelinePlayer";
import { TaskLinker } from "@/components/simulator/TaskLinker";
import type { IFCViewerHandle, ElementMeta } from "@/components/simulator/IFCViewer";

/* ---- dynamic import for IFC viewer (no SSR) ---- */
const IFCViewer = dynamic(
  () => import("@/components/simulator/IFCViewer"),
  {
    ssr: false,
    loading: () => (
      <div className="flex-1 bg-[#0f1017] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-3 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
          <p className="text-sm text-zinc-400">Loading 4D Engine...</p>
        </div>
      </div>
    ),
  }
);

/* Re-export types for backward compatibility */
export type TaskData = ScheduleTask;

/* ================================================================== */
/*  Simulate Page                                                      */
/* ================================================================== */
export default function SimulatePage() {
  const viewerRef = useRef<IFCViewerHandle>(null);

  /* ---- state ---- */
  const [tasks, setTasks] = useState<ScheduleTask[]>([]);
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [linkingMode, setLinkingMode] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [modelCategories, setModelCategories] = useState<string[]>([]);
  const [categoryVisibility, setCategoryVisibility] = useState<Record<string, boolean>>({});
  const [showCategoryPanel, setShowCategoryPanel] = useState(false);
  const [rightPanel, setRightPanel] = useState<"status" | "linker">("status");

  /* ---- date range ---- */
  const dateRange =
    tasks.length > 0
      ? {
          start: new Date(
            Math.min(...tasks.map((t) => new Date(t.startDate).getTime()))
          ),
          end: new Date(
            Math.max(...tasks.map((t) => new Date(t.endDate).getTime()))
          ),
        }
      : null;

  /* ---- schedule import ---- */
  const handleScheduleImported = useCallback(
    (importedTasks: ScheduleTask[]) => {
      setTasks(importedTasks);
      if (importedTasks.length > 0) {
        setCurrentDate(
          new Date(
            Math.min(...importedTasks.map((t) => new Date(t.startDate).getTime()))
          )
        );
      }
    },
    []
  );

  /* ---- model loaded ---- */
  const handleModelLoaded = useCallback(
    (elementCount: number, categories: string[]) => {
      setModelLoaded(true);
      setModelCategories(categories);
      const vis: Record<string, boolean> = {};
      categories.forEach((c) => (vis[c] = true));
      setCategoryVisibility(vis);
    },
    []
  );

  /* ---- element selection (from viewer click) ---- */
  const handleElementSelected = useCallback(
    (globalId: string, _meta: ElementMeta) => {
      if (linkingMode && selectedTaskId) {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === selectedTaskId
              ? {
                  ...t,
                  elementGlobalIds: Array.from(
                    new Set([...t.elementGlobalIds, globalId])
                  ),
                }
              : t
          )
        );
      }
    },
    [linkingMode, selectedTaskId]
  );

  /* ---- unlink element ---- */
  const handleUnlinkElement = useCallback(
    (taskId: string, globalId: string) => {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId
            ? { ...t, elementGlobalIds: t.elementGlobalIds.filter((g) => g !== globalId) }
            : t
        )
      );
    },
    []
  );

  /* ---- unlink all from task ---- */
  const handleUnlinkAll = useCallback((taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, elementGlobalIds: [] } : t))
    );
  }, []);

  /* ---- auto-link by category ---- */
  const handleAutoLinkCategory = useCallback(
    (taskId: string, category: string) => {
      if (!viewerRef.current) return;
      const ids = viewerRef.current.getElementsByCategory(category);
      if (ids.length === 0) return;
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId
            ? {
                ...t,
                elementGlobalIds: Array.from(
                  new Set([...t.elementGlobalIds, ...ids])
                ),
              }
            : t
        )
      );
    },
    []
  );

  /* ---- category visibility ---- */
  const handleCategoryToggle = useCallback(
    (cat: string) => {
      const newVis = !categoryVisibility[cat];
      setCategoryVisibility((prev) => ({ ...prev, [cat]: newVis }));
      viewerRef.current?.toggleCategoryVisibility(cat, newVis);
    },
    [categoryVisibility]
  );

  /* ---- 4D playback: update element visuals based on timeline ---- */
  useEffect(() => {
    if (!viewerRef.current || !currentDate || tasks.length === 0) return;

    const viewer = viewerRef.current;

    // Build globalId -> status mapping
    const elementStatus = new Map<
      string,
      "notStarted" | "inProgress" | "complete"
    >();

    tasks.forEach((task) => {
      const start = new Date(task.startDate);
      const end = new Date(task.endDate);

      let status: "notStarted" | "inProgress" | "complete";
      if (currentDate > end) {
        status = "complete";
      } else if (currentDate >= start && currentDate <= end) {
        status = "inProgress";
      } else {
        status = "notStarted";
      }

      task.elementGlobalIds.forEach((gid) => {
        const existing = elementStatus.get(gid);
        // More advanced status wins
        const priority = { notStarted: 0, inProgress: 1, complete: 2 };
        if (!existing || priority[status] > priority[existing]) {
          elementStatus.set(gid, status);
        }
      });
    });

    // Collect all linked globalIds
    const allLinked = new Set<string>();
    tasks.forEach((t) => t.elementGlobalIds.forEach((g) => allLinked.add(g)));

    // Apply states
    const allIds = viewer.getAllGlobalIds();
    allIds.forEach((gid) => {
      const status = elementStatus.get(gid);
      if (!allLinked.has(gid)) {
        // Not linked to any task - show as default/ghost
        viewer.setElementVisualState(gid, "ghost");
        return;
      }
      switch (status) {
        case "notStarted":
          viewer.setElementVisualState(gid, "hidden");
          break;
        case "inProgress":
          viewer.setElementVisualState(gid, "inProgress");
          break;
        case "complete":
          viewer.setElementVisualState(gid, "complete");
          break;
        default:
          viewer.setElementVisualState(gid, "default");
      }
    });
  }, [currentDate, tasks]);

  /* ---- auto-link all categories to tasks heuristically ---- */
  const handleAutoLinkAll = useCallback(() => {
    if (!viewerRef.current || tasks.length === 0) return;

    // Heuristic: distribute categories across tasks chronologically
    const cats = viewerRef.current.getCategories();
    if (cats.length === 0) return;

    // Simple strategy: assign each category to a task based on index position
    const catToTaskMap: Record<string, string> = {};
    const categoryPriority = [
      "Footings", "Piles", "Foundation",
      "Floors", "Columns", "Beams", "Members", "Plates",
      "Walls", "Curtain Walls",
      "Stairs", "Railings",
      "Roofs", "Coverings",
      "Windows", "Doors",
      "MEP",
      "Furniture",
      "Spaces", "Other",
    ];

    // Sort available categories by priority
    const sortedCats = [...cats].sort((a, b) => {
      const ai = categoryPriority.indexOf(a);
      const bi = categoryPriority.indexOf(b);
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    });

    // Distribute categories across tasks
    const tasksPerCat = Math.max(1, Math.ceil(sortedCats.length / tasks.length));
    sortedCats.forEach((cat, i) => {
      const taskIdx = Math.min(Math.floor(i / tasksPerCat), tasks.length - 1);
      catToTaskMap[cat] = tasks[taskIdx].id;
    });

    // Apply links
    setTasks((prev) => {
      const newTasks = prev.map((t) => ({
        ...t,
        elementGlobalIds: [...t.elementGlobalIds],
      }));

      sortedCats.forEach((cat) => {
        const taskId = catToTaskMap[cat];
        const ids = viewerRef.current!.getElementsByCategory(cat);
        const task = newTasks.find((t) => t.id === taskId);
        if (task) {
          task.elementGlobalIds = Array.from(
            new Set([...task.elementGlobalIds, ...ids])
          );
        }
      });

      return newTasks;
    });
  }, [tasks]);

  /* ---- active task counts for status ---- */
  const activeTasks = tasks.filter((t) => {
    if (!currentDate) return false;
    const s = new Date(t.startDate);
    const e = new Date(t.endDate);
    return currentDate >= s && currentDate <= e;
  });
  const completedTasks = tasks.filter(
    (t) => currentDate && currentDate > new Date(t.endDate)
  );
  const notStartedTasks = tasks.filter(
    (t) => currentDate && currentDate < new Date(t.startDate)
  );

  return (
    <div className="flex flex-col h-screen bg-[#0a0b0f] overflow-hidden">
      {/* =============== Top Toolbar =============== */}
      <div className="h-12 flex-shrink-0 border-b border-zinc-800 bg-[#0f1017] flex items-center px-4 gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21"
              />
            </svg>
          </div>
          <h1 className="text-sm font-bold text-white">REVARA 4D</h1>
          <span className="text-[10px] text-zinc-600 font-mono">Construction Simulator</span>
        </div>

        <div className="flex-1" />

        {/* Toolbar actions */}
        {modelLoaded && tasks.length > 0 && (
          <button
            onClick={handleAutoLinkAll}
            className="h-7 px-3 rounded-md bg-blue-600/20 text-blue-400 text-xs font-medium hover:bg-blue-600/30 transition-colors flex items-center gap-1.5"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.06a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 10-6.364 6.364l1.757 1.757"
              />
            </svg>
            Auto-Link
          </button>
        )}

        {modelLoaded && modelCategories.length > 0 && (
          <button
            onClick={() => setShowCategoryPanel(!showCategoryPanel)}
            className={`h-7 px-3 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${
              showCategoryPanel
                ? "bg-violet-600/30 text-violet-300"
                : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Visibility
          </button>
        )}
      </div>

      {/* =============== Main Content Area =============== */}
      <div className="flex flex-1 min-h-0">
        {/* ---- Left Sidebar: Schedule Panel (30%) ---- */}
        <div className="w-80 flex-shrink-0 border-r border-zinc-800 flex flex-col bg-[#0f1017] overflow-hidden">
          <SchedulePanel
            tasks={tasks}
            currentDate={currentDate}
            selectedTaskId={selectedTaskId}
            onSelectTask={(id) => {
              setSelectedTaskId(id);
              if (id) setRightPanel("linker");
            }}
            onTasksImported={handleScheduleImported}
          />
        </div>

        {/* ---- Center: 3D Viewer (flexible width) ---- */}
        <div className="flex-1 flex flex-col min-w-0 relative">
          <IFCViewer
            ref={viewerRef}
            onElementSelected={handleElementSelected}
            onModelLoaded={handleModelLoaded}
            selectionMode={linkingMode}
          />

          {/* Category visibility floating panel */}
          {showCategoryPanel && modelCategories.length > 0 && (
            <div className="absolute top-3 left-3 z-20 bg-zinc-900/95 backdrop-blur border border-zinc-700 rounded-xl p-3 w-52 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-white">IFC Categories</p>
                <button
                  onClick={() => setShowCategoryPanel(false)}
                  className="text-zinc-500 hover:text-zinc-300"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-1 max-h-64 overflow-y-auto">
                {modelCategories.map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-2 px-2 py-1 rounded hover:bg-zinc-800/50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={categoryVisibility[cat] !== false}
                      onChange={() => handleCategoryToggle(cat)}
                      className="w-3 h-3 rounded accent-violet-500"
                    />
                    <span className="text-xs text-zinc-300">{cat}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ---- Right Sidebar: Status / Linker (264px) ---- */}
        <div className="w-64 flex-shrink-0 border-l border-zinc-800 bg-[#0f1017] flex flex-col overflow-hidden">
          {/* Tab switcher */}
          <div className="flex border-b border-zinc-800">
            <button
              onClick={() => setRightPanel("status")}
              className={`flex-1 py-2 text-[10px] font-medium uppercase tracking-wider transition-colors ${
                rightPanel === "status"
                  ? "text-violet-400 border-b-2 border-violet-500"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Status
            </button>
            <button
              onClick={() => setRightPanel("linker")}
              className={`flex-1 py-2 text-[10px] font-medium uppercase tracking-wider transition-colors ${
                rightPanel === "linker"
                  ? "text-violet-400 border-b-2 border-violet-500"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Linker
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {rightPanel === "status" ? (
              /* Status panel */
              <div className="p-3 space-y-3">
                <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Project Status
                </h3>
                {currentDate && tasks.length > 0 ? (
                  <div className="space-y-2">
                    <StatusCard
                      label="Current Date"
                      value={currentDate.toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    />
                    <StatusCard
                      label="Active Tasks"
                      value={String(activeTasks.length)}
                      accent="blue"
                    />
                    <StatusCard
                      label="Completed"
                      value={String(completedTasks.length)}
                      accent="green"
                    />
                    <StatusCard
                      label="Not Started"
                      value={String(notStartedTasks.length)}
                    />
                    <StatusCard
                      label="Overall Progress"
                      value={
                        tasks.length > 0
                          ? Math.round(
                              (completedTasks.length / tasks.length) * 100
                            ) + "%"
                          : "0%"
                      }
                      accent="violet"
                    />

                    {/* Progress bar */}
                    <div className="bg-zinc-800/50 rounded-lg px-3 py-2">
                      <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-300"
                          style={{
                            width: `${
                              tasks.length > 0
                                ? (completedTasks.length / tasks.length) * 100
                                : 0
                            }%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Active tasks list */}
                    {activeTasks.length > 0 && (
                      <div className="pt-2 border-t border-zinc-800">
                        <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2">
                          Active Now
                        </p>
                        {activeTasks.slice(0, 5).map((t) => (
                          <div
                            key={t.id}
                            className="text-[10px] text-zinc-400 py-0.5 flex items-center gap-1.5"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                            <span className="truncate">{t.name}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Legend */}
                    <div className="pt-2 border-t border-zinc-800">
                      <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2">
                        Legend
                      </p>
                      <div className="space-y-1.5">
                        <LegendItem color="#f59e0b" label="In Progress" />
                        <LegendItem color="#22c55e" label="Completed" />
                        <LegendItem color="#374151" opacity={0.06} label="Unlinked / Ghost" />
                        <LegendItem color="#374151" opacity={0} label="Not Started (hidden)" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-zinc-500">
                    {tasks.length === 0
                      ? "Import a schedule to begin the 4D simulation."
                      : "Use the timeline controls to navigate through construction phases."}
                  </p>
                )}
              </div>
            ) : (
              /* Linker panel */
              <TaskLinker
                tasks={tasks}
                selectedTaskId={selectedTaskId}
                linkingMode={linkingMode}
                onToggleLinking={() => setLinkingMode(!linkingMode)}
                onUnlinkElement={handleUnlinkElement}
                onUnlinkAllFromTask={handleUnlinkAll}
                categories={modelCategories}
                onAutoLinkCategory={handleAutoLinkCategory}
              />
            )}
          </div>
        </div>
      </div>

      {/* =============== Bottom: Timeline Player =============== */}
      {dateRange && currentDate && (
        <TimelinePlayer
          currentDate={currentDate}
          startDate={dateRange.start}
          endDate={dateRange.end}
          playing={playing}
          speed={speed}
          onDateChange={setCurrentDate}
          onPlayPause={() => setPlaying(!playing)}
          onSpeedChange={setSpeed}
          tasks={tasks}
        />
      )}
    </div>
  );
}

/* ================================================================== */
/*  Sub-components                                                     */
/* ================================================================== */
function StatusCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "blue" | "green" | "violet";
}) {
  const accentColor =
    accent === "blue"
      ? "text-blue-400"
      : accent === "green"
        ? "text-green-400"
        : accent === "violet"
          ? "text-violet-400"
          : "text-white";
  return (
    <div className="bg-zinc-800/50 rounded-lg px-3 py-2">
      <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
        {label}
      </p>
      <p className={`text-sm font-semibold mt-0.5 ${accentColor}`}>{value}</p>
    </div>
  );
}

function LegendItem({
  color,
  label,
  opacity = 1,
}: {
  color: string;
  label: string;
  opacity?: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-3 h-3 rounded-sm border border-zinc-700"
        style={{ backgroundColor: color, opacity }}
      />
      <span className="text-xs text-zinc-400">{label}</span>
    </div>
  );
}
