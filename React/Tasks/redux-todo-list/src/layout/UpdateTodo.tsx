import { useDispatch, useSelector } from "react-redux";
import { updateTodo } from "../redux/features /todoSlice";
import { setTodos } from "../utils/setTodos";
import { useCallback, useEffect, useState } from "react";
import type { Todo } from "../types/Todos";
import type { AppStore } from "../redux/store";

const UpdateTask = ({ visible, onClose, todo }: { visible: boolean; onClose: () => void; todo:Todo }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [priority, setPriority] = useState(todo.priority);
  const [category, setCategory] = useState(todo.category);
  const [dueDate, setDueDate] = useState(new Date(todo.dueDate || '').toISOString().split("T")[0]);
  const [nameError, setNameError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [touched, setTouched] = useState({ title: false, description: false });
  const [showErrors, setShowErrors] = useState(false);

  const dispatch = useDispatch()

    const getStore = useSelector((state: AppStore) => state)
    const uId = getStore.userDetails.user.id;
 


  useEffect(() => {
    if (!/^[a-zA-Z0-9\s,/()\\&.:-]{3,50}$/.test(title)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNameError(true);
    }
    else {
      setNameError(false);
    }
    if (!/^[a-zA-Z0-9\s,/()\\&.:-]{3,50}$/.test(description)) {
      setDescError(true);
    }
    else {
      setDescError(false);
    }
  }, [title, description]);

  const onAddTask = useCallback(() => {
    setShowErrors(true);
    if (!nameError && !descError) {
      const tempTodo =  setTodos(title, description, priority, category, dueDate, todo.id);
      dispatch(updateTodo({tempTodo,uId}));
      // Reset form
      setTitle(todo.title);
      setDescription(todo.description);
      setTouched({ title: false, description: false });
      setShowErrors(false);
      onClose();
    }
  }, [nameError, descError, title, description, priority, category, dueDate, onClose, dispatch, todo.id, todo.title, todo.description, uId  ]);





  return (
    <>
      {visible && !todo.isCompleted ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <div
            className="bg-white w-full max-w-md rounded-lg shadow-2xl p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="text-gray-900 font-semibold text-xl mb-5">
              Update Task
            </h1>

            {/* Title Field */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                className="border border-gray-300 rounded-md p-2.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter task title"
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => setTouched(prev => ({ ...prev, title: true }))}
              />
              {nameError && (touched.title || showErrors) && (
                <span className="text-red-500 text-xs mt-1 block">Invalid title (3-50 characters)</span>
              )}
            </div>

            {/* Description Field */}
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={3}
                value={description}
                className="border resize-none border-gray-300 rounded-md p-2.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter task description"
                onChange={(e) => setDescription(e.target.value)}
                onBlur={() => setTouched(prev => ({ ...prev, description: true }))}
              ></textarea>
              {descError && (touched.description || showErrors) && (
                <span className="text-red-500 text-xs mt-1 block">Invalid description (3-50 characters)</span>
              )}
            </div>

            {/* Due Date Field */}
            <div className="mb-4">
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                id="dueDate"
                className="border border-gray-300 rounded-md p-2.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min={new Date().toISOString().split("T")[0]}
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            {/* Priority and Category - responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="u-priority" className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  name="u-priority"
                  id="u-priority"
                  className="border border-gray-300 rounded-md p-2.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  defaultValue={priority}
                  onChange={(e) => setPriority((e.target.value) as "high" | "medium" | "low")}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  id="category"
                  className="border border-gray-300 rounded-md p-2.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  defaultValue={category}
                  onChange={(e) => setCategory((e.target.value) as "work" | "personal" | "shopping" | "health" | "other")}
                >
                  <option value="work">Work</option>
                  <option value="personal">Personal</option>
                  <option value="shopping">Shopping</option>
                  <option value="health">Health</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Action Buttons - responsive */}
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                onClick={onAddTask}
              >
                Update Task
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default UpdateTask;
