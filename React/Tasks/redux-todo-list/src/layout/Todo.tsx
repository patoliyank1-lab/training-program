import { useState } from "react";
import UpdateTask from "./UpdateTodo";
import type { Todo } from "../types/Todos";
import { completeTodo } from "../redux/features /todoSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppStore } from "../redux/store";

export default function Todo({
  todo,
}: {
  todo:Todo
}) {

  const [ isVisible, setIsVisible ] =  useState(false)

  const dispatch = useDispatch()

    const getStore = useSelector((state: AppStore) => state)
    const uId = getStore.userDetails.user.id;


  const onComplete =  (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.stopPropagation()
    dispatch(completeTodo({todo,uId}));   
  }

  return (

    <>
    <div className={`bg-gray-50 border border-gray-200 rounded-lg p-4 w-64  transition-all ${todo.isCompleted ? 'opacity-75' : ''}`}
    onClick={() => setIsVisible && setIsVisible((prev) => !prev)}>
      <div className="flex items-start gap-3 mb-2">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onClick={onComplete}
          onChange={() => {}}
          className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
        />
        <div className="flex-1">
          <h2 className={`text-base font-medium text-gray-800 `}>
            {todo.title}
          </h2>
        </div>
      </div>

      {todo.description && (
        <p className={`text-sm text-gray-600 mb-3 ml-7`}>
          {todo.description}
        </p>
      )}

      <div className="flex gap-2 flex-wrap ml-7">
        <span className={`text-xs px-2 py-1 rounded font-medium ${todo.priority === 'high' ? 'bg-red-100 text-red-700' :
          todo.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
            'bg-blue-100 text-blue-700'
          }`}>
          {todo.priority}
        </span>
        <span className={`text-xs px-2 py-1 rounded font-medium ${todo.isCompleted ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
          {todo.isCompleted ? 'Done' : 'Pending'}
        </span>
      </div>
    </div>
      <UpdateTask visible={isVisible} onClose={() => setIsVisible(false)} todo={todo} />
  </>
  );
}
