import { useEffect, useCallback } from "react";
import Todo from "./Todo";
import { useDispatch, useSelector } from "react-redux";
import { getState } from "../redux/features /todoSlice";
import type { AppStore } from "../redux/store";
import type { Todo as TodoType } from "../types/Todos";
import { getTodoByPriority } from "../utils/TodoFilters";

const MainContent = ({ selectedPriority, selectedStatus }: {
  selectedPriority?: string;
  selectedStatus?: string;
}) => {
  


  const dispatch = useDispatch();
  

  const getStore  = useSelector((state:AppStore) => state)
  const todoStore = getStore.todoStore;
  const uId = getStore.userDetails.user.id;


    
  const getAllData = useCallback(() => {
    dispatch(getState(uId))
  },[dispatch,uId])
  
  useEffect(()=>{
    getAllData()
  },[getAllData])
  
  

  let personalTodos: TodoType[]; 
  let shoppingTodos: TodoType[]; 
  let healthTodos: TodoType[]; 
  let otherTodos: TodoType[]; 
  let workTodos: TodoType[]; 

    if(selectedStatus === 'completed'){
      workTodos = [...todoStore.work.Completed]
      personalTodos = [...todoStore.personal.Completed]
      shoppingTodos = [...todoStore.shopping.Completed]
      healthTodos = [...todoStore.health.Completed]
      otherTodos = [...todoStore.other.Completed]
    } else if (selectedStatus === 'pending') {
      workTodos = [...todoStore.work.Pending]
      personalTodos = [...todoStore.personal.Pending]
      shoppingTodos = [...todoStore.shopping.Pending]
      healthTodos = [...todoStore.health.Pending]
      otherTodos = [...todoStore.other.Pending]
    } else {
      workTodos = [...todoStore.work.Pending, ...todoStore.work.Completed]
      personalTodos = [...todoStore.personal.Pending, ...todoStore.personal.Completed]
      shoppingTodos = [...todoStore.shopping.Pending, ...todoStore.shopping.Completed]
      healthTodos = [...todoStore.health.Pending, ...todoStore.health.Completed]
      otherTodos = [...todoStore.other.Pending, ...todoStore.other.Completed]
    }
  
    if(selectedPriority){
      workTodos = getTodoByPriority( workTodos, selectedPriority )
      personalTodos = getTodoByPriority( personalTodos, selectedPriority )
      shoppingTodos = getTodoByPriority( shoppingTodos, selectedPriority )
      healthTodos = getTodoByPriority( healthTodos, selectedPriority )
      otherTodos = getTodoByPriority( otherTodos, selectedPriority )
    }
  

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

                todo={todo}
                
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
                todo={todo}
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
                todo={todo}
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
                todo={todo}
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
                todo={todo}
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
