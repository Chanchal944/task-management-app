import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router";
import { TaskList } from "../components/TaskList";
import { Task } from "../components/TaskItem";

interface FilteringPageContext {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  setEditingTask: (task: Task | null) => void;
  navigate: (path: string) => void;
}

type FilterType = "all" | "completed" | "pending";

export function FilteringPage() {
  const { tasks, onToggleComplete, onDelete, setEditingTask, navigate } =
    useOutletContext<FilteringPageContext>();

  const [filter, setFilter] = useState<FilterType>("all");

  // ✅ Added search states
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    setSearchTerm(searchInput);
  };

  const getFilteredTasks = () => {
    let filtered;

    switch (filter) {
      case "completed":
        filtered = tasks.filter((task) => task.completed);
        break;
      case "pending":
        filtered = tasks.filter((task) => !task.completed);
        break;
      default:
        filtered = tasks;
    }

    // ✅ Apply search after filter
    return filtered.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    navigate("/task");
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;
  const filteredTasks = getFilteredTasks();

  return (
    <div className="container mx-auto px-4 md:px-8 py-6 md:py-10 max-w-7xl">
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Filter & View Tasks
        </h2>
        <p className="text-gray-600 text-base md:text-lg">
          Filter your tasks by status to focus on what matters
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
          Filter Options
        </h3>

        {/* ✅ Buttons + Search side by side */}
        <div className="flex flex-wrap gap-3 items-center">

          <button
            onClick={() => setFilter("all")}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium transition-colors text-sm md:text-lg ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            All Tasks ({totalTasks})
          </button>

          <button
            onClick={() => setFilter("completed")}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium transition-colors text-sm md:text-lg ${
              filter === "completed"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Completed ({completedTasks})
          </button>

          <button
            onClick={() => setFilter("pending")}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium transition-colors text-sm md:text-lg ${
              filter === "pending"
                ? "bg-orange-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Pending ({pendingTasks})
          </button>

          {/* ✅ Search Input + Button */}
          <div className="flex gap-2 ml-auto">
            <input
              type="text"
              placeholder="Search Task..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              className="border px-3 py-2 rounded-lg text-sm"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
            >
              Search Task
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
          {filter === "all" && `All Tasks (${filteredTasks.length})`}
          {filter === "completed" &&
            `Completed Tasks (${filteredTasks.length})`}
          {filter === "pending" &&
            `Pending Tasks (${filteredTasks.length})`}
        </h3>

        <TaskList
          tasks={filteredTasks}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onEditTask={handleEditTask}
        />
      </div>
    </div>
  );
}