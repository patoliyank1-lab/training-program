import { Plus, Inbox, Calendar, CalendarClock, LaptopMinimalCheck, NotepadText,AlignEndVertical } from "lucide-react";
import AddTask from "./AddTask";
import { useState } from "react";

const Sidebar = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false)


  return (
    <>
      <div className="bg-white shadow w-full md:w-50 sticky right-0 h-lvh p-3">
        <div className="">
          <div className="w-full flex  rounded-md p-2 my-2 cursor-pointer"
          onClick={() => setIsVisible((prev) => !prev)}>
            <Plus className=" bg-blue-500 text-white rounded-full " />
            <span className="text-blue-500 ml-2 ">Add Task</span>
          </div>
          <div className="w-full flex  rounded-md p-2 my-2">
            <Inbox className=" text-gray-800 " />
            <span className="text-gray-800 ml-2">Inbox</span>
          </div>
          <div className="w-full flex  rounded-md p-2 my-2">
            <Calendar className=" text-gray-800 " />
            <span className="text-gray-800 ml-2">Today</span>
          </div>
          <div className="w-full flex  rounded-md p-2 my-2">
            <CalendarClock className=" text-gray-800 " />
            <span className="text-gray-800 ml-2">Upcoming</span>
          </div>
        </div>

        <div className="p-2 ">
          <h3 className="text-xl font-medium text-blue-600">
            Filters & Labels
          </h3>
          <div className="flex flex-col">
            <label htmlFor="priority">priority</label>
            <select
              name="priority"
              id="priority"
              className="border border-gray-400 text-gray-800 bg-gray-100 px-2 py-1 rounded-md mb-2"
              defaultValue="defaultValue"
            >
              <option value="defaultValue" >
                Select
              </option>
              <option value="high">high</option>
              <option value="medium">medium</option>
              <option value="low">low</option>
            </select>
          </div>
        </div>

        <div>
          <div className="w-full flex  rounded-md p-2 my-2 hover:bg-blue-500 hover:text-white text-gray-800">
            <AlignEndVertical />
            <span className=" ml-2">All</span>
          </div>
          <div className="w-full flex  rounded-md p-2 my-2 hover:bg-blue-500 hover:text-white  text-gray-800">
            <NotepadText  />
            <span className=" ml-2">Active</span>
          </div>          <div className="w-full flex  rounded-md p-2 my-2 hover:bg-blue-500 hover:text-white  text-gray-800">
            <LaptopMinimalCheck  />
            <span className="ml-2">Completed</span>
          </div>
        </div>
      </div>
    <AddTask visible={isVisible} />
    </>
  );
};

export default Sidebar;
