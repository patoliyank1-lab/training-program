import { getDataByCategory } from "../utils/TodoFilters";
import Todo from "./Todo";

const MainContent = () => {
  const workTodos = getDataByCategory("work");
  const personalTodos = getDataByCategory("personal");
  const shoppingTodos = getDataByCategory("shopping");
  const healthTodos = getDataByCategory("health");
  const otherTodos = getDataByCategory("other");

  return (
    <div className="bg-gray-100 p-5 flex-1 overflow-x-scroll">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Tasks</h2>
        <div>
          <h2>Date: {new Date().toLocaleDateString()}</h2>
        </div>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-5 justify-items-center h-full">
        <div className=" flex-1 flex flex-col justify-center  text-center bg-gray-50 w-70 shadow rounded-md p-3 h-full">
          <h1 className="text-2xl font-medium mb-3">Work</h1>
          <div className="flex-1">
            {workTodos.length !== 0 && workTodos.map((todo, index) => (
              <Todo
                key={index}
                title={todo.title}
                description={todo.description}
                priority={todo.priority}
                category={todo.category}
                dueDate={todo.dueDate}
                isCompleted={todo.isCompleted}
              />
            ))}
            {workTodos.length === 0 && (
                <div className="flex-1 h-full flex items-center justify-center rounded-md">
                    <p>No tasks found</p>
                </div>
                )}
          </div>
        </div>
        <div className=" flex-1 flex flex-col justify-center  text-center h-full bg-gray-50 w-70 shadow rounded-md p-3">
          <h1 className="text-2xl font-medium mb-3">Personal</h1>
          <div className="flex-1">
            {personalTodos.length !== 0 && personalTodos.map((todo, index) => (
              <Todo
                key={index}
                title={todo.title}
                description={todo.description}
                priority={todo.priority}
                category={todo.category}
                dueDate={todo.dueDate}
                isCompleted={todo.isCompleted}
              />
            ))}
            {personalTodos.length === 0 && (
                <div className="flex-1 h-full flex items-center justify-center rounded-md">
                    <p>No tasks found</p>
                </div>
                )}
          </div>
        </div>
        <div className=" flex-1 flex flex-col h-full bg-gray-50 w-70 shadow p-3 justify-center rounded-md text-center">
          <h1 className="text-2xl font-medium mb-3">Shopping</h1>
          <div className="flex-1">
            {shoppingTodos &&
              shoppingTodos.map((todo, index) => (
                <Todo
                  key={index}
                  title={todo.title}
                  description={todo.description}
                  priority={todo.priority}
                  category={todo.category}
                  dueDate={todo.dueDate}
                  isCompleted={todo.isCompleted}
                />
              ))}
            {shoppingTodos.length === 0 && (
                <div className="flex-1 h-full flex items-center justify-center rounded-md">
                    <p>No tasks found</p>
                </div>
                )}
          </div>
        </div>
        <div className=" flex-1 flex flex-col h-full bg-gray-50 w-70 shadow p-3 justify-center rounded-md text-center">
          <h1 className="text-2xl font-medium mb-3">Health</h1>
          <div className="flex-1">
            {healthTodos.map((todo, index) => (
              <Todo
                key={index}
                title={todo.title}
                description={todo.description}
                priority={todo.priority}
                category={todo.category}
                dueDate={todo.dueDate}
                isCompleted={todo.isCompleted}
              />
            ))}
            {healthTodos.length === 0 && (
                <div className="flex-1 h-full flex items-center justify-center rounded-md">
                    <p>No tasks found</p>
                </div>
                )}
          </div>
        </div>
        <div className=" flex-1 flex flex-col h-full bg-gray-50 w-70 shadow p-3 justify-center rounded-md text-center">
          <h1 className="text-2xl font-medium mb-3">Other</h1>
          <div className="flex-1">
            {otherTodos.map((todo, index) => (
              <Todo
                key={index}
                title={todo.title}
                description={todo.description}
                priority={todo.priority}
                category={todo.category}
                dueDate={todo.dueDate}
                isCompleted={todo.isCompleted}
              />
            ))}
            {otherTodos.length === 0 && (
                <div className="flex-1 h-full flex items-center justify-center rounded-md">
                    <p>No tasks found</p>
                </div>
                )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
