import { Plus, Inbox, Calendar, CalendarClock, LaptopMinimalCheck, NotepadText, AlignEndVertical } from "lucide-react";
import AddTask from "./AddTask";
import { useState } from "react";

const Sidebar = ({ onPriorityChange, selectedPriority, onStatusChange, selectedStatus }: {
  onPriorityChange?: (priority: string) => void;
  selectedPriority?: string;
  onStatusChange?: (status: string) => void;
  selectedStatus?: string;
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);


  return (
    <>
      <div className="bg-white shadow-sm w-full md:w-64 shrink-0 h-full overflow-y-auto p-4 border-r border-gray-200">
        <div>
          <div
            className="w-full flex items-center rounded-md p-3 my-2 cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors"
            onClick={() => setIsVisible((prev) => !prev)}
          >
            <Plus className="bg-blue-600 text-white rounded-full p-1" size={24} />
            <span className="text-blue-600 font-medium ml-3">Add Task</span>
          </div>

          <div className="mt-4 space-y-1">
            <div className="w-full flex items-center rounded-md p-3 hover:bg-gray-100 text-gray-700 cursor-pointer transition-colors">
              <Inbox size={20} />
              <span className="ml-3">Inbox</span>
            </div>
            <div className="w-full flex items-center rounded-md p-3 hover:bg-gray-100 text-gray-700 cursor-pointer transition-colors">
              <Calendar size={20} />
              <span className="ml-3">Today</span>
            </div>
            <div className="w-full flex items-center rounded-md p-3 hover:bg-gray-100 text-gray-700 cursor-pointer transition-colors">
              <CalendarClock size={20} />
              <span className="ml-3">Upcoming</span>
            </div>
          </div>
        </div>

        <div className="mt-6 p-3 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Filters & Labels
          </h3>
          <div className="flex flex-col">
            <label htmlFor="priority" className="text-xs text-gray-600 mb-1">Priority</label>
            <select
              name="priority"
              id="priority"
              className="border border-gray-300 text-gray-700 bg-white px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedPriority || "defaultValue"}
              onChange={(e) => onPriorityChange && onPriorityChange(e.target.value)}
            >
              <option value="defaultValue">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2 px-3">Status</h3>
          <div className="space-y-1">
            <div
              className={`w-full flex items-center rounded-md p-3 cursor-pointer transition-colors ${!selectedStatus ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'
                }`}
              onClick={() => onStatusChange && onStatusChange('all')}
            >
              <AlignEndVertical size={20} />
              <span className="ml-3">All</span>
            </div>
            <div
              className={`w-full flex items-center rounded-md p-3 cursor-pointer transition-colors ${selectedStatus === 'pending' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'
                }`}
              onClick={() => onStatusChange && onStatusChange('pending')}
            >
              <NotepadText size={20} />
              <span className="ml-3">Pending</span>
            </div>
            <div
              className={`w-full flex items-center rounded-md p-3 cursor-pointer transition-colors ${selectedStatus === 'completed' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'
                }`}
              onClick={() => onStatusChange && onStatusChange('completed')}
            >
              <LaptopMinimalCheck size={20} />
              <span className="ml-3">Completed</span>
            </div>
          </div>
        </div>
      </div>
      <AddTask visible={isVisible} onClose={() => setIsVisible(false)} />
    </>
  );
};

export default Sidebar;
