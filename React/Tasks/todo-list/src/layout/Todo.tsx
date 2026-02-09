import { toggleTodoCompletion } from "../utils/updateTodoStatus";

export default function Todo({
  id,
  title = "title",
  description,
  priority = "high",
  category = "work",
  dueDate,
  isCompleted = false,
  onUpdate,
}: {
  id: string;
  title: string;
  description: string;
  priority: string;
  category: string;
  dueDate: string | null;
  isCompleted: boolean;
  onUpdate?: () => void;
}) {
  const handleToggleComplete = () => {
    toggleTodoCompletion(id);
    if (onUpdate) {
      onUpdate();
    }
  };

  return (
    <div className={`bg-gray-50 border border-gray-200 rounded-lg p-4 w-64 flex-shrink-0 transition-all ${isCompleted ? 'opacity-75' : ''}`}>
      <div className="flex items-start gap-3 mb-2">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleToggleComplete}
          className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
        />
        <div className="flex-1">
          <h2 className={`text-base font-medium text-gray-800 ${isCompleted ? 'line-through text-gray-500' : ''}`}>
            {title}
          </h2>
        </div>
      </div>

      {description && (
        <p className={`text-sm text-gray-600 mb-3 ml-7 ${isCompleted ? 'line-through text-gray-400' : ''}`}>
          {description}
        </p>
      )}

      <div className="flex gap-2 flex-wrap ml-7">
        <span className={`text-xs px-2 py-1 rounded font-medium ${priority === 'high' ? 'bg-red-100 text-red-700' :
          priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
            'bg-blue-100 text-blue-700'
          }`}>
          {priority}
        </span>
        <span className={`text-xs px-2 py-1 rounded font-medium ${isCompleted ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
          {isCompleted ? 'Done' : 'Pending'}
        </span>
      </div>
    </div>
  );
}
