import { TaskItem, Task } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEditTask: (task: Task) => void;
}

export function TaskList({ tasks, onToggleComplete, onDelete, onEditTask }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <p className="text-gray-500 text-xl">No tasks to display</p>
        <p className="text-gray-400 mt-2">Add your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onEditTask={onEditTask}
        />
      ))}
    </div>
  );
}