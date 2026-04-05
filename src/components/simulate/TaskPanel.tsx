"use client";
import { Button } from "@/components/ui/button";
import type { TaskData } from "@/app/simulate/page";

interface Props {
  tasks: TaskData[];
  currentDate: Date | null;
  selectedTaskId: string | null;
  onSelectTask: (id: string | null) => void;
  linkingMode: boolean;
  onToggleLinking: () => void;
}

export function TaskPanel({ tasks, currentDate, selectedTaskId, onSelectTask, linkingMode, onToggleLinking }: Props) {
  const getTaskStatus = (task: TaskData) => {
    if (!currentDate) return "pending";
    const start = new Date(task.startDate);
    const end = new Date(task.endDate);
    if (currentDate > end) return "complete";
    if (currentDate >= start && currentDate <= end) return "active";
    return "pending";
  };

  const statusColors = {
    complete: "bg-green-500",
    active: "bg-blue-500",
    pending: "bg-zinc-700",
  };

  const statusLabels = {
    complete: "Completado",
    active: "En Progreso",
    pending: "Pendiente",
  };

  if (tasks.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="text-4xl mb-3">📋</div>
          <p className="text-sm text-zinc-400 mb-1">No hay cronograma</p>
          <p className="text-xs text-zinc-600">Importa un cronograma de MS Project, Primavera P6, o Excel para empezar la simulación 4D</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {selectedTaskId && (
        <div className="p-3 bg-violet-600/10 border-b border-zinc-800">
          <p className="text-xs text-violet-400 mb-2">Tarea seleccionada</p>
          <Button
            size="sm"
            variant={linkingMode ? "danger" : "secondary"}
            className="w-full text-xs h-7"
            onClick={onToggleLinking}
          >
            {linkingMode ? "❌ Cancelar Vinculación" : "🔗 Vincular Elementos 3D"}
          </Button>
          {linkingMode && (
            <p className="text-[10px] text-zinc-500 mt-2">
              Haz clic en los elementos del modelo 3D para vincularlos a esta tarea
            </p>
          )}
        </div>
      )}

      <div className="p-1">
        {tasks.map(task => {
          const status = getTaskStatus(task);
          const isSelected = task.id === selectedTaskId;
          const linkedCount = task.elementGlobalIds.length;

          return (
            <button
              key={task.id}
              onClick={() => onSelectTask(isSelected ? null : task.id)}
              className={`w-full text-left px-3 py-2 rounded-lg mb-0.5 transition-colors ${
                isSelected
                  ? "bg-violet-600/20 border border-violet-500/30"
                  : "hover:bg-zinc-800/50 border border-transparent"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${statusColors[status]}`} />
                <span className="text-xs font-medium text-white truncate flex-1">{task.name}</span>
              </div>
              <div className="flex items-center gap-3 mt-1 ml-4">
                <span className="text-[10px] text-zinc-500">
                  {new Date(task.startDate).toLocaleDateString("es-CR", { day: "numeric", month: "short" })}
                  {" → "}
                  {new Date(task.endDate).toLocaleDateString("es-CR", { day: "numeric", month: "short" })}
                </span>
                {linkedCount > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                    🔗 {linkedCount}
                  </span>
                )}
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                  status === "complete" ? "bg-green-500/15 text-green-400" :
                  status === "active" ? "bg-blue-500/15 text-blue-400" :
                  "bg-zinc-800 text-zinc-500"
                }`}>
                  {statusLabels[status]}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
