import { useOutletContext } from "react-router";
import { Summary } from "../components/Summary";

interface DashboardPageContext {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
}

export function DashboardPage() {
  const { totalTasks, completedTasks, pendingTasks } = useOutletContext<DashboardPageContext>();
  const completionRate = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : 0;

  return (
    <div className="container mx-auto px-4 md:px-8 py-6 md:py-10 max-w-7xl">
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Dashboard Overview</h2>
        <p className="text-gray-600 text-base md:text-lg">Track your productivity and task completion metrics</p>
      </div>

      <Summary
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        pendingTasks={pendingTasks}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">
        <div className="bg-white rounded-lg shadow-md p-4 md:p-8">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Completion Rate</h3>
          <div className="flex items-center gap-3 md:gap-4">
            <div className="flex-1">
              <div className="bg-gray-200 rounded-full h-4 md:h-6 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-full transition-all duration-500"
                  style={{ width: `${completionRate}%` }}
                ></div>
              </div>
            </div>
            <span className="text-2xl md:text-3xl font-bold text-gray-800">{completionRate}%</span>
          </div>
          <p className="text-gray-600 mt-3 md:mt-4 text-sm md:text-base">
            {completedTasks} out of {totalTasks} tasks completed
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 md:p-8">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Task Status</h3>
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 text-base md:text-lg">Completed Tasks</span>
              <span className="bg-green-100 text-green-800 px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-medium text-sm md:text-base">
                {completedTasks}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 text-base md:text-lg">Pending Tasks</span>
              <span className="bg-orange-100 text-orange-800 px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-medium text-sm md:text-base">
                {pendingTasks}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 text-base md:text-lg">Total Tasks</span>
              <span className="bg-blue-100 text-blue-800 px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-medium text-sm md:text-base">
                {totalTasks}
              </span>
            </div>
          </div>
        </div>
      </div>

      {totalTasks === 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 md:p-8 mt-6 md:mt-8 text-center">
          <h3 className="text-xl md:text-2xl font-bold text-blue-900 mb-3">No Tasks Yet</h3>
          <p className="text-blue-700 text-base md:text-lg">
            Start adding tasks to see your productivity insights here!
          </p>
        </div>
      )}
    </div>
  );
}