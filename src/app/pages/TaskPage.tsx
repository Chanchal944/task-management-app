import { useOutletContext } from "react-router";
import { TaskInput } from "../components/TaskInput";
import { TaskList } from "../components/TaskList";
import { Task } from "../components/TaskItem";

interface TaskPageContext {
  tasks: Task[];
  onAddTask: (title: string, description: string, data: string, category: string) => void;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEditTask: (id: string, title: string, description: string, data: string, category: string) => void;
  editingTask: Task | null;
  setEditingTask: (task: Task | null) => void;
}

export function TaskPage() {
  const { tasks, onAddTask, onToggleComplete, onDelete, onEditTask, editingTask, setEditingTask } = useOutletContext<TaskPageContext>();

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <div className="container mx-auto px-8 py-10 max-w-7xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Manage Your Tasks</h2>
        <p className="text-gray-600 text-lg">Add new tasks and manage your to-do list</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <TaskInput 
          onAddTask={onAddTask} 
          editingTask={editingTask}
          onEditTask={onEditTask}
          onCancelEdit={handleCancelEdit}
        />

        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">All Tasks ({tasks.length})</h3>
          <TaskList
            tasks={tasks}
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
            onEditTask={handleEditTask}
          />
        </div>
      </div>
    </div>
  );
}