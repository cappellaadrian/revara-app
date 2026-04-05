"use client";
import { useMemo } from "react";
import type { ScheduleTask } from "./SchedulePanel";

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */
interface Props {
  tasks: ScheduleTask[];
  selectedTaskId: string | null;
  linkingMode: boolean;
  onToggleLinking: () => void;
  onUnlinkElement: (taskId: string, globalId: string) => void;
  onUnlinkAllFromTask: (taskId: string) => void;
  categories: string[];
  onAutoLinkCategory: (taskId: string, category: string) => void;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export function TaskLinker({
  tasks,
  selectedTaskId,
  linkingMode,
  onToggleLinking,
  onUnlinkElement,
  onUnlinkAllFromTask,
  categories,
  onAutoLinkCategory,
}: Props) {
  const selectedTask = useMemo(
    () => tasks.find((t) => t.id === selectedTaskId) || null,
    [tasks, selectedTaskId]
  );

  /* ---- summary stats ---- */
  const linkStats = useMemo(() => {
    let totalLinked = 0;
    let tasksWithLinks = 0;
    tasks.forEach((t) => {
      if (t.elementGlobalIds.length > 0) {
        totalLinked += t.elementGlobalIds.length;
        tasksWithLinks++;
      }
    });
    return { totalLinked, tasksWithLinks, tasksWithout: tasks.length - tasksWithLinks };
  }, [tasks]);

  if (!selectedTask) {
    return (
      <div className="p-3 space-y-3">
        <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          Element Linking
        </h4>

        {tasks.length === 0 ? (
          <p className="text-xs text-zinc-600">
            Import a schedule first, then select a task to link 3D elements.
          </p>
        ) : (
          <>
            <p className="text-xs text-zinc-500">
              Select a task in the schedule panel to link 3D model elements.
            </p>

            {/* Link summary */}
            <div className="space-y-1.5 pt-2 border-t border-zinc-800">
              <div className="flex justify-between text-[10px]">
                <span className="text-zinc-500">Total links</span>
                <span className="text-zinc-300 font-mono">{linkStats.totalLinked}</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-zinc-500">Tasks linked</span>
                <span className="text-green-400 font-mono">{linkStats.tasksWithLinks}</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-zinc-500">Tasks unlinked</span>
                <span className="text-zinc-400 font-mono">{linkStats.tasksWithout}</span>
              </div>

              {/* Linkage progress bar */}
              {tasks.length > 0 && (
                <div className="pt-1">
                  <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-blue-500 rounded-full transition-all"
                      style={{
                        width: `${(linkStats.tasksWithLinks / tasks.length) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="text-[10px] text-zinc-600 mt-1">
                    {Math.round((linkStats.tasksWithLinks / tasks.length) * 100)}% of tasks linked
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    );
  }

  /* ---- Selected task detail view ---- */
  return (
    <div className="p-3 space-y-3">
      <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
        Link Elements
      </h4>

      {/* Selected task info */}
      <div className="bg-violet-600/10 border border-violet-500/20 rounded-lg p-2.5 space-y-1.5">
        <p className="text-xs font-medium text-violet-300 truncate">
          {selectedTask.name}
        </p>
        <p className="text-[10px] text-zinc-500">
          {new Date(selectedTask.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          {" - "}
          {new Date(selectedTask.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          {" | "}
          {selectedTask.durationDays}d
        </p>
        <p className="text-[10px] text-zinc-400">
          {selectedTask.elementGlobalIds.length} element{selectedTask.elementGlobalIds.length !== 1 ? "s" : ""} linked
        </p>
      </div>

      {/* Manual link button */}
      <button
        onClick={onToggleLinking}
        className={`w-full py-2 px-3 rounded-lg text-xs font-medium transition-all ${
          linkingMode
            ? "bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse"
            : "bg-violet-600/20 text-violet-400 border border-violet-500/30 hover:bg-violet-600/30"
        }`}
      >
        {linkingMode ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancel Linking
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.06a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 10-6.364 6.364l1.757 1.757" />
            </svg>
            Click Elements to Link
          </span>
        )}
      </button>

      {linkingMode && (
        <p className="text-[10px] text-zinc-500 bg-zinc-800/50 p-2 rounded-lg text-center">
          Click on 3D elements in the viewer to link them to this task. Each click adds one element.
        </p>
      )}

      {/* Auto-link by category */}
      {categories.length > 0 && (
        <div className="border-t border-zinc-800 pt-3">
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2">
            Auto-link by IFC category
          </p>
          <div className="flex flex-wrap gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onAutoLinkCategory(selectedTask.id, cat)}
                className="px-2 py-1 rounded bg-zinc-800 text-[10px] text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200 transition-colors"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Linked elements list */}
      {selectedTask.elementGlobalIds.length > 0 && (
        <div className="border-t border-zinc-800 pt-3 space-y-1.5">
          <div className="flex items-center justify-between">
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
              Linked Elements ({selectedTask.elementGlobalIds.length})
            </p>
            <button
              onClick={() => onUnlinkAllFromTask(selectedTask.id)}
              className="text-[10px] text-red-400 hover:text-red-300 transition-colors"
            >
              Unlink All
            </button>
          </div>

          <div className="max-h-32 overflow-y-auto space-y-0.5">
            {selectedTask.elementGlobalIds.slice(0, 50).map((gid) => (
              <div
                key={gid}
                className="flex items-center justify-between group px-2 py-1 rounded bg-zinc-800/30 hover:bg-zinc-800/60"
              >
                <span className="text-[10px] text-zinc-400 font-mono truncate flex-1">
                  {gid.length > 20 ? gid.slice(0, 8) + "..." + gid.slice(-8) : gid}
                </span>
                <button
                  onClick={() => onUnlinkElement(selectedTask.id, gid)}
                  className="text-[10px] text-zinc-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all ml-2"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
            {selectedTask.elementGlobalIds.length > 50 && (
              <p className="text-[10px] text-zinc-600 text-center py-1">
                + {selectedTask.elementGlobalIds.length - 50} more
              </p>
            )}
          </div>
        </div>
      )}

      {/* Link summary bar */}
      <div className="border-t border-zinc-800 pt-2">
        <div className="flex justify-between text-[10px] text-zinc-500">
          <span>Total project links</span>
          <span className="font-mono">{linkStats.totalLinked}</span>
        </div>
      </div>
    </div>
  );
}
