"use client";
import { useEffect, useRef, useMemo } from "react";
import type { ScheduleTask } from "./SchedulePanel";

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */
interface Props {
  currentDate: Date;
  startDate: Date;
  endDate: Date;
  playing: boolean;
  speed: number;
  onDateChange: (date: Date) => void;
  onPlayPause: () => void;
  onSpeedChange: (speed: number) => void;
  tasks: ScheduleTask[];
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export function TimelinePlayer({
  currentDate,
  startDate,
  endDate,
  playing,
  speed,
  onDateChange,
  onPlayPause,
  onSpeedChange,
  tasks,
}: Props) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalDays = Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / 86400000));
  const currentDay = Math.max(0, Math.ceil((currentDate.getTime() - startDate.getTime()) / 86400000));
  const progress = Math.min(100, (currentDay / totalDays) * 100);

  /* ---- playback timer ---- */
  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        onDateChange(new Date(currentDate.getTime() + 86400000 * speed));
      }, 80);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing, currentDate, speed, onDateChange]);

  /* ---- stop at end ---- */
  useEffect(() => {
    if (currentDate >= endDate && playing) {
      onPlayPause();
      onDateChange(endDate);
    }
  }, [currentDate, endDate, playing, onPlayPause, onDateChange]);

  /* ---- active/complete counts ---- */
  const stats = useMemo(() => {
    let active = 0, complete = 0, notStarted = 0;
    tasks.forEach((t) => {
      const s = new Date(t.startDate);
      const e = new Date(t.endDate);
      if (currentDate > e) complete++;
      else if (currentDate >= s && currentDate <= e) active++;
      else notStarted++;
    });
    const overall = tasks.length > 0 ? Math.round((complete / tasks.length) * 100) : 0;
    return { active, complete, notStarted, overall };
  }, [tasks, currentDate]);

  /* ---- mini Gantt bars ---- */
  const ganttBars = useMemo(() => {
    const span = endDate.getTime() - startDate.getTime();
    if (span <= 0) return [];
    return tasks.slice(0, 40).map((task, i) => {
      const tStart = Math.max(0, ((new Date(task.startDate).getTime() - startDate.getTime()) / span) * 100);
      const tEnd = Math.min(100, ((new Date(task.endDate).getTime() - startDate.getTime()) / span) * 100);
      const isComplete = currentDate > new Date(task.endDate);
      const isActive =
        currentDate >= new Date(task.startDate) && currentDate <= new Date(task.endDate);
      return { id: task.id, left: tStart, width: Math.max(tEnd - tStart, 0.3), row: i % 5, isComplete, isActive, name: task.name };
    });
  }, [tasks, startDate, endDate, currentDate]);

  const SPEEDS = [1, 3, 7, 14, 30];

  return (
    <div className="bg-[#12131a] border-t border-zinc-800 px-4 py-2.5 flex-shrink-0">
      {/* Mini Gantt visualization */}
      <div className="h-[50px] mb-2 relative rounded-lg bg-zinc-900/50 overflow-hidden">
        {ganttBars.map((bar) => (
          <div
            key={bar.id}
            className="absolute h-[8px] rounded-full transition-colors duration-200"
            style={{
              left: `${bar.left}%`,
              width: `${bar.width}%`,
              top: `${bar.row * 10 + 1}px`,
              backgroundColor: bar.isComplete
                ? "#22c55e"
                : bar.isActive
                  ? "#3b82f6"
                  : "#374151",
              opacity: bar.isComplete ? 0.7 : bar.isActive ? 1 : 0.25,
            }}
            title={bar.name}
          />
        ))}
        {/* Playhead */}
        <div
          className="absolute top-0 bottom-0 w-[2px] z-10 transition-all duration-75"
          style={{ left: `${progress}%` }}
        >
          <div className="w-full h-full bg-red-500" />
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-red-300" />
        </div>
      </div>

      {/* Controls row */}
      <div className="flex items-center gap-3">
        {/* Transport buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onDateChange(startDate)}
            className="w-7 h-7 rounded-md bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 text-xs flex items-center justify-center transition-colors"
            title="Go to start"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </button>

          <button
            onClick={() => onDateChange(new Date(currentDate.getTime() - 86400000 * speed))}
            className="w-7 h-7 rounded-md bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 text-xs flex items-center justify-center transition-colors"
            title="Step back"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z" />
            </svg>
          </button>

          <button
            onClick={onPlayPause}
            className="w-10 h-10 rounded-lg bg-violet-600 text-white flex items-center justify-center hover:bg-violet-500 transition-colors shadow-lg shadow-violet-600/20"
            title={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <button
            onClick={() => onDateChange(new Date(currentDate.getTime() + 86400000 * speed))}
            className="w-7 h-7 rounded-md bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 text-xs flex items-center justify-center transition-colors"
            title="Step forward"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z" />
            </svg>
          </button>

          <button
            onClick={() => onDateChange(endDate)}
            className="w-7 h-7 rounded-md bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 text-xs flex items-center justify-center transition-colors"
            title="Go to end"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>
        </div>

        {/* Speed */}
        <div className="flex items-center gap-1 border-l border-zinc-800 pl-3">
          <span className="text-[10px] text-zinc-600 mr-1">SPEED</span>
          {SPEEDS.map((s) => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              className={`px-2 py-1 rounded text-[10px] font-medium transition-colors ${
                speed === s
                  ? "bg-violet-600 text-white"
                  : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700 hover:text-zinc-300"
              }`}
            >
              {s}d
            </button>
          ))}
        </div>

        {/* Timeline slider */}
        <div className="flex-1 flex items-center gap-2 border-l border-zinc-800 pl-3">
          <span className="text-[10px] text-zinc-600 font-mono w-12 text-right">
            D{currentDay}
          </span>
          <input
            type="range"
            min={0}
            max={totalDays}
            value={currentDay}
            onChange={(e) =>
              onDateChange(
                new Date(startDate.getTime() + Number(e.target.value) * 86400000)
              )
            }
            className="flex-1 h-1 bg-zinc-700 rounded-full appearance-none cursor-pointer accent-violet-500"
          />
          <span className="text-[10px] text-zinc-600 font-mono w-12">
            D{totalDays}
          </span>
        </div>

        {/* Date & Stats */}
        <div className="border-l border-zinc-800 pl-3 text-right min-w-[180px]">
          <p className="text-sm font-semibold text-white">
            {currentDate.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <div className="flex items-center justify-end gap-2 mt-0.5">
            <span className="text-[10px] text-blue-400">{stats.active} active</span>
            <span className="text-[10px] text-zinc-600">|</span>
            <span className="text-[10px] text-green-400">{stats.complete} done</span>
            <span className="text-[10px] text-zinc-600">|</span>
            <span className="text-[10px] text-violet-400 font-semibold">{stats.overall}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
