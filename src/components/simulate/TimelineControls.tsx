"use client";
import { useEffect, useRef } from "react";
import type { TaskData } from "@/app/simulate/page";

interface Props {
  currentDate: Date;
  startDate: Date;
  endDate: Date;
  playing: boolean;
  speed: number;
  onDateChange: (date: Date) => void;
  onPlayPause: () => void;
  onSpeedChange: (speed: number) => void;
  tasks: TaskData[];
}

export function TimelineControls({ currentDate, startDate, endDate, playing, speed, onDateChange, onPlayPause, onSpeedChange, tasks }: Props) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / 86400000);
  const currentDay = Math.ceil((currentDate.getTime() - startDate.getTime()) / 86400000);
  const progress = totalDays > 0 ? (currentDay / totalDays) * 100 : 0;

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        onDateChange(new Date(currentDate.getTime() + 86400000 * speed));
      }, 100);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [playing, currentDate, speed, onDateChange]);

  // Stop at end
  useEffect(() => {
    if (currentDate > endDate) {
      onPlayPause();
      onDateChange(endDate);
    }
  }, [currentDate, endDate]);

  const activeTasks = tasks.filter(t => {
    const s = new Date(t.startDate), e = new Date(t.endDate);
    return currentDate >= s && currentDate <= e;
  });

  return (
    <div className="bg-[#12131a] border-t border-zinc-800 px-4 py-3">
      {/* Mini Gantt */}
      <div className="h-16 mb-2 relative rounded-lg bg-zinc-900/50 overflow-hidden">
        {tasks.slice(0, 30).map((task, i) => {
          const taskStart = Math.max(0, (new Date(task.startDate).getTime() - startDate.getTime()) / (endDate.getTime() - startDate.getTime()) * 100);
          const taskEnd = Math.min(100, (new Date(task.endDate).getTime() - startDate.getTime()) / (endDate.getTime() - startDate.getTime()) * 100);
          const taskWidth = taskEnd - taskStart;
          const isActive = activeTasks.some(t => t.id === task.id);
          const isComplete = currentDate > new Date(task.endDate);

          return (
            <div key={task.id} className="absolute h-3 rounded-full transition-colors" style={{
              left: `${taskStart}%`,
              width: `${Math.max(taskWidth, 0.5)}%`,
              top: `${(i % 4) * 16 + 2}px`,
              backgroundColor: isComplete ? "#22c55e" : isActive ? "#3b82f6" : "#374151",
              opacity: isComplete ? 0.7 : isActive ? 1 : 0.3,
            }} title={task.name} />
          );
        })}
        {/* Playhead */}
        <div className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10" style={{ left: `${progress}%` }} />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button onClick={() => onDateChange(startDate)} className="w-7 h-7 rounded bg-zinc-800 text-zinc-400 hover:text-white text-xs flex items-center justify-center">⏮</button>
          <button onClick={onPlayPause} className="w-9 h-9 rounded-lg bg-violet-600 text-white text-sm flex items-center justify-center hover:bg-violet-500">
            {playing ? "⏸" : "▶"}
          </button>
          <button onClick={() => onDateChange(endDate)} className="w-7 h-7 rounded bg-zinc-800 text-zinc-400 hover:text-white text-xs flex items-center justify-center">⏭</button>
        </div>

        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <span>Speed:</span>
          {[1, 3, 7, 14, 30].map(s => (
            <button key={s} onClick={() => onSpeedChange(s)}
              className={`px-2 py-1 rounded ${speed === s ? "bg-violet-600 text-white" : "bg-zinc-800 hover:bg-zinc-700"}`}>
              {s}d
            </button>
          ))}
        </div>

        {/* Slider */}
        <input
          type="range"
          min={0}
          max={totalDays}
          value={currentDay}
          onChange={e => onDateChange(new Date(startDate.getTime() + Number(e.target.value) * 86400000))}
          className="flex-1 h-1.5 bg-zinc-700 rounded-full appearance-none cursor-pointer accent-violet-500"
        />

        <div className="text-right min-w-[140px]">
          <p className="text-sm font-semibold text-white">
            {currentDate.toLocaleDateString("es-CR", { day: "numeric", month: "short", year: "numeric" })}
          </p>
          <p className="text-[10px] text-zinc-500">
            Day {currentDay} / {totalDays} • {activeTasks.length} active
          </p>
        </div>
      </div>
    </div>
  );
}
