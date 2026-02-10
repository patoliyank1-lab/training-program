import { useState, useEffect } from "react";
import { getDataByCategory } from "../utils/TodoFilters";
import Todo from "./Todo";

const MainContent = ({ onRefresh, selectedPriority, selectedStatus }: {
  onRefresh?: () => void;
  selectedPriority?: string;
  selectedStatus?: string;
}) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [workTodos, setWorkTodos] = useState<any[]>([]);
  const [personalTodos, setPersonalTodos] = useState<any[]>([]);
  const [shoppingTodos, setShoppingTodos] = useState<any[]>([]);
  const [healthTodos, setHealthTodos] = useState<any[]>([]);
  const [otherTodos, setOtherTodos] = useState<any[]>([]);


  useEffect(() => {
    setWorkTodos(getDataByCategory("work", selectedPriority, selectedStatus));
    setPersonalTodos(getDataByCategory("personal", selectedPriority, selectedStatus));
    setShoppingTodos(getDataByCategory("shopping", selectedPriority, selectedStatus));
    setHealthTodos(getDataByCategory("health", selectedPriority, selectedStatus));
    setOtherTodos(getDataByCategory("other", selectedPriority, selectedStatus));
  }, [refreshTrigger, selectedPriority, selectedStatus]);

  // Expose refresh function to parent
  useEffect(() => {
    if (onRefresh) {
      // This allows parent to trigger refresh
      (window as any).refreshTodoList = () => setRefreshTrigger(prev => prev + 1);
    }
  }, [onRefresh]);

  return (
    <div className="bg-gray-100 p-5 flex-1 overflow-y-auto">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Tasks</h2>
        <div>
          <h2>Date: {new Date().toLocaleDateString()}</h2>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-5">
        {/* Work Category */}
        <div className="w-full bg-white shadow rounded-lg p-4">
          <h1 className="text-xl font-semibold mb-3 text-gray-700">Work</h1>
          <div className={`flex flex-wrap gap-3 ${workTodos.length === 0 ? 'min-h-25 items-center justify-center' : ''}`}>
            {workTodos.length !== 0 && workTodos.map((todo, index) => (
              <Todo
                key={index}
                id={todo.id}
                title={todo.title}
                description={todo.description}
                priority={todo.priority}
                category={todo.category}
                dueDate={todo.dueDate}
                isCompleted={todo.isCompleted}
                onUpdate={() => setRefreshTrigger(prev => prev + 1)}
              />
            ))}
            {workTodos.length === 0 && (
              <p className="text-gray-400">No tasks found</p>
            )}
          </div>
        </div>

        {/* Personal Category */}
        <div className="w-full bg-white shadow rounded-lg p-4">
          <h1 className="text-xl font-semibold mb-3 text-gray-700">Personal</h1>
          <div className={`flex flex-wrap gap-3 ${personalTodos.length === 0 ? 'min-h-25 items-center justify-center' : ''}`}>
            {personalTodos.length !== 0 && personalTodos.map((todo, index) => (
              <Todo
                key={index}
                id={todo.id}
                title={todo.title}
                description={todo.description}
                priority={todo.priority}
                category={todo.category}
                dueDate={todo.dueDate}
                isCompleted={todo.isCompleted}
                onUpdate={() => setRefreshTrigger(prev => prev + 1)}
              />
            ))}
            {personalTodos.length === 0 && (
              <p className="text-gray-400">No tasks found</p>
            )}
          </div>
        </div>

        {/* Shopping Category */}
        <div className="w-full bg-white shadow rounded-lg p-4">
          <h1 className="text-xl font-semibold mb-3 text-gray-700">Shopping</h1>
          <div className={`flex flex-wrap gap-3 ${shoppingTodos.length === 0 ? 'min-h-25 items-center justify-center' : ''}`}>
            {shoppingTodos.length !== 0 && shoppingTodos.map((todo, index) => (
              <Todo
                key={index}
                id={todo.id}
                title={todo.title}
                description={todo.description}
                priority={todo.priority}
                category={todo.category}
                dueDate={todo.dueDate}
                isCompleted={todo.isCompleted}
                onUpdate={() => setRefreshTrigger(prev => prev + 1)}
              />
            ))}
            {shoppingTodos.length === 0 && (
              <p className="text-gray-400">No tasks found</p>
            )}
          </div>
        </div>

        {/* Health Category */}
        <div className="w-full bg-white shadow rounded-lg p-4">
          <h1 className="text-xl font-semibold mb-3 text-gray-700">Health</h1>
          <div className={`flex flex-wrap gap-3 ${healthTodos.length === 0 ? 'min-h-25 items-center justify-center' : ''}`}>
            {healthTodos.length !== 0 && healthTodos.map((todo, index) => (
              <Todo
                key={index}
                id={todo.id}
                title={todo.title}
                description={todo.description}
                priority={todo.priority}
                category={todo.category}
                dueDate={todo.dueDate}
                isCompleted={todo.isCompleted}
                onUpdate={() => setRefreshTrigger(prev => prev + 1)}
              />
            ))}
            {healthTodos.length === 0 && (
              <p className="text-gray-400">No tasks found</p>
            )}
          </div>
        </div>

        {/* Other Category */}
        <div className="w-full bg-white shadow rounded-lg p-4">
          <h1 className="text-xl font-semibold mb-3 text-gray-700">Other</h1>
          <div className={`flex flex-wrap gap-3 ${otherTodos.length === 0 ? 'min-h-25 items-center justify-center' : ''}`}>
            {otherTodos.length !== 0 && otherTodos.map((todo, index) => (
              <Todo
                key={index}
                id={todo.id}
                title={todo.title}
                description={todo.description}
                priority={todo.priority}
                category={todo.category}
                dueDate={todo.dueDate}
                isCompleted={todo.isCompleted}
                onUpdate={() => setRefreshTrigger(prev => prev + 1)}
              />
            ))}
            {otherTodos.length === 0 && (
              <p className="text-gray-400">No tasks found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
