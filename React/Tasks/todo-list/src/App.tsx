import { useState } from "react";
import Header from "./layout/Header";
import MainContent from "./layout/MainContent";
import Sidebar from "./layout/Sidebar";

function App() {
  const [selectedPriority, setSelectedPriority] = useState<string | undefined>(undefined);
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);

  const handleTaskAdded = () => {
    if ((window as any).refreshTodoList) {
      (window as any).refreshTodoList();
    }
  };

  const handlePriorityChange = (priority: string) => {
    setSelectedPriority(priority === "defaultValue" ? undefined : priority);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status === "all" ? undefined : status);
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          onTaskAdded={handleTaskAdded}
          onPriorityChange={handlePriorityChange}
          selectedPriority={selectedPriority}
          onStatusChange={handleStatusChange}
          selectedStatus={selectedStatus}
        />
        <MainContent
          onRefresh={handleTaskAdded}
          selectedPriority={selectedPriority}
          selectedStatus={selectedStatus}
        />
      </div>
    </div>
  );
}

export default App;
