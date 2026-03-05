import { useState, useEffect } from "react";
import { PlusCircle, X } from "lucide-react";
import { Task } from "./TaskItem";

interface TaskInputProps {
  onAddTask: (title: string, description: string, data: string, category: string) => void;
  editingTask?: Task | null;
  onEditTask?: (id: string, title: string, description: string, data: string, category: string) => void;
  onCancelEdit?: () => void;
}

export function TaskInput({ onAddTask, editingTask, onEditTask, onCancelEdit }: TaskInputProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || "");
      setData(editingTask.data || "");
      setCategory(editingTask.category || "");
    }
  }, [editingTask]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError("Task title cannot be empty");
      return;
    }

    if (editingTask && onEditTask) {
      onEditTask(editingTask.id, title, description, data, category);
      setTitle("");
      setDescription("");
      setData("");
      setCategory("");
      if (onCancelEdit) onCancelEdit();
    } else {
      onAddTask(title, description, data, category);
      setTitle("");
      setDescription("");
      setData("");
      setCategory("");
    }
    setError("");
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setData("");
    setCategory("");
    setError("");
    if (onCancelEdit) onCancelEdit();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {editingTask ? "Edit Task" : "Add New Task"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <input
            type="text"
            placeholder="Task Title *"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
            }}
            className="w-full px-5 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <div className="mb-5">
          <textarea
            placeholder="Task Description (Optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-5 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        <div className="mb-5">
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="w-full px-5 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="mb-5">
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-5 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 text-lg"
          >
            <PlusCircle className="w-6 h-6" />
            {editingTask ? "Update Task" : "Add Task"}
          </button>
          
          {editingTask && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 text-lg"
            >
              <X className="w-6 h-6" />
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}