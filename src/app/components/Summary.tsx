import { BarChart3, CheckCircle2, Clock } from "lucide-react";

interface SummaryProps {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
}

export function Summary({ totalTasks, completedTasks, pendingTasks }: SummaryProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
      <div className="bg-white rounded-lg shadow-md p-4 md:p-8 border-l-4 border-blue-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-xs md:text-sm font-medium uppercase tracking-wide">Total Tasks</p>
            <p className="text-2xl md:text-4xl font-bold text-gray-800 mt-1 md:mt-2">{totalTasks}</p>
          </div>
          <div className="bg-blue-100 p-2 md:p-4 rounded-full">
            <BarChart3 className="w-5 h-5 md:w-8 md:h-8 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 md:p-8 border-l-4 border-green-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-xs md:text-sm font-medium uppercase tracking-wide">Completed</p>
            <p className="text-2xl md:text-4xl font-bold text-gray-800 mt-1 md:mt-2">{completedTasks}</p>
          </div>
          <div className="bg-green-100 p-2 md:p-4 rounded-full">
            <CheckCircle2 className="w-5 h-5 md:w-8 md:h-8 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 md:p-8 border-l-4 border-orange-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-xs md:text-sm font-medium uppercase tracking-wide">Pending</p>
            <p className="text-2xl md:text-4xl font-bold text-gray-800 mt-1 md:mt-2">{pendingTasks}</p>
          </div>
          <div className="bg-orange-100 p-2 md:p-4 rounded-full">
            <Clock className="w-5 h-5 md:w-8 md:h-8 text-orange-600" />
          </div>
        </div>
      </div>
    </div>
  );
}