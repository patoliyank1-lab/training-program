import { setTodos } from "../utils/setTodos";
import { useCallback, useEffect, useState } from "react";

const AddTask = ({ visible }: { visible: boolean }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [category, setCategory] = useState("work");
  const [dueDate, setDueDate] = useState(new Date().toISOString().split("T")[0]);
  const [nameError, setNameError] = useState(false);
  const [descError, setDescError] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [isVisible, setIsVisible] = useState<boolean>(true);
  
  useEffect(() => {
    setIsVisible(visible);
     if (!/^[a-zA-Z0-9\s,/()&.:-]{3,50}$/.test(title)) {
      setNameError(true);
    }
    else{
      setNameError(false);
    }
    if (!/^[a-zA-Z0-9\s,/()&.:-]{3,50}$/.test(description)) {
      setDescError(true);
    }
    else{
      setDescError(false);
    }
    console.log(nameError, descError);
  }, [nameError, descError,title, description, visible]);

  const onAddTask = useCallback(() => {
    if (!nameError && !descError) {
      setTodos(title, description, priority, category,dueDate);
      setIsVisible(false);
    }
  }, [nameError, descError, title, description, priority, category, dueDate]);


  


  return (
    <>
      {isVisible ? (
        <div className="fixed overflow-scroll top-0 h-lvh w-full p-5 bg-black/10 flex items-center justify-center">
          <div className="bg-white  min-w-100 shadow-xl flex flex-col rounded-xl p-5">
            <h1 className="text-gray-900 font-bold text-2xl mb-4">
              Add New Task
            </h1>
            <div>
              <label htmlFor="title" className="block mb-2">
                TItle
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholder="Task title"
                onChange={(e) => setTitle(e.target.value)}
              />
              {nameError && (
                <span className="text-red-500 ml-2">Invalid title</span>
              )}
            </div>
            <div className="mt-4">
              <label htmlFor="description" className="block mb-2">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                className="border resize-none border-gray-300 rounded-md p-2 w-full"
                placeholder="Task description"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              {descError && (
                <span className="text-red-500 ml-2">Invalid description</span>
              )}
            </div>
            <div>
                <label htmlFor="dueDate" className="block mb-2">
                Date
              </label>
              <input
                type="date"
                name="dueDate"
                id="dueDate"
                className="border border-gray-300 rounded-md p-2 w-full"
                min={new Date().toISOString().split("T")[0]}
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />  
            </div>
            <div className="mt-4">
              <label htmlFor="priority" className="block mb-2">
                Priority
              </label>
              <select
                name="priority"
                id="priority"
                className="border border-gray-300 rounded-md p-2 w-full"
                onChange={(e) => setPriority(e.target.value)}
                defaultValue="low"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="mt-4">
              <label htmlFor="category" className="block mb-2">
                Category
              </label>
              <select
                name="category"
                id="category"
                className="border border-gray-300 rounded-md p-2 w-full"
                onChange={(e) => setCategory(e.target.value)}
                defaultValue="work"
              >
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="shopping">Shopping</option>
                <option value="health">Health</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={onAddTask}
              >
                Add Task
              </button>
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                onClick={() => setIsVisible(false)}
              >
                Cancel
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

export default AddTask;
