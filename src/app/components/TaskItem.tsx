import { CheckCircle2, Circle, Trash2, Pencil } from "lucide-react";

export interface Task {
  id: string;
  title: string;
  description?: string;
  data?: string;
  category?: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEditTask: (task: Task) => void;
}

export function TaskItem({ task, onToggleComplete, onDelete, onEditTask }: TaskItemProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <button
          onClick={() => onToggleComplete(task.id)}
          className="mt-1 flex-shrink-0 transition-colors"
        >
          {task.completed ? (
            <CheckCircle2 className="w-7 h-7 text-green-500" />
          ) : (
            <Circle className="w-7 h-7 text-gray-400 hover:text-blue-500" />
          )}
        </button>

        <div className="flex-1">
          <h3
            className={`font-medium text-lg ${
              task.completed
                ? "line-through text-gray-500"
                : "text-gray-800"
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p
              className={`text-base mt-1 ${
                task.completed ? "line-through text-gray-400" : "text-gray-600"
              }`}
            >
              {task.description}
            </p>
          )}
          {task.data && (
            <p
              className={`text-sm mt-1 ${
                task.completed ? "line-through text-gray-400" : "text-blue-600"
              }`}
            >
              <span className="font-medium">Date:</span> {task.data}
            </p>
          )}
          {task.category && (
            <p
              className={`text-sm mt-1 ${
                task.completed ? "line-through text-gray-400" : "text-purple-600"
              }`}
            >
              <span className="font-medium">Category:</span> {task.category}
            </p>
          )}
        </div>

        <button
          onClick={() => onEditTask(task)}
          className="flex-shrink-0 text-blue-500 hover:text-blue-700 transition-colors p-2"
          aria-label="Edit task"
        >
          <Pencil className="w-6 h-6" />
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="flex-shrink-0 text-red-500 hover:text-red-700 transition-colors p-2"
          aria-label="Delete task"
        >
          <Trash2 className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}