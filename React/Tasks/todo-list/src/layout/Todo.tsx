export default function Todo({
  title = "title",
  description,
  priority = "high",
  category = "work",
  dueDate,
  isCompleted = false,
}: {
  title: string;
  description: string;
  priority: string;
  category: string;
  dueDate: string | null;
  isCompleted: boolean;
}) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 w-64 flex-shrink-0">
      <h2 className="text-base font-medium text-gray-800 mb-2">{title}</h2>
      <div className="flex gap-2 flex-wrap">
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
