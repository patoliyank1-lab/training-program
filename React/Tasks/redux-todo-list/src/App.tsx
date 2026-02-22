import { BrowserRouter, Routes, Route } from "react-router";
import { useState } from "react";
import ThemeProvider from "./context/ContextValue";
// import Header from "./layout/Header";
import MainContent from "./layout/MainContent";
import Sidebar from "./layout/Sidebar";
import Login from "./layout/Login";
import SignUp from "./layout/SignUp";
import PrivateRoute from "./PrivateRoute";
import Home from "./layout/Home";



function App() {
  const [selectedPriority, setSelectedPriority] = useState<string | undefined>(undefined);
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);



  const handlePriorityChange = (priority: string) => {
    setSelectedPriority(priority === "defaultValue" ? undefined : priority);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status === "all" ? undefined : status);
  };

  return (
    <div className="h-lvh flex flex-col overflow-hidden">
      <BrowserRouter>
        <Routes>
          <Route path={`/`}
            element={
              <>
                <ThemeProvider>
                  <Home />
                </ThemeProvider>
              </>
            } />

          <Route path={'/dashboard'} element={
            <>
              <ThemeProvider>
                <PrivateRoute>

                <div className="flex flex-1 overflow-hidden">
                  <Sidebar
                    onPriorityChange={handlePriorityChange}
                    selectedPriority={selectedPriority}
                    onStatusChange={handleStatusChange}
                    selectedStatus={selectedStatus}
                    />
                  <MainContent
                    selectedPriority={selectedPriority}
                    selectedStatus={selectedStatus}
                  />
                </div>
              </PrivateRoute>
              </ThemeProvider>
            </>
          } />

          <Route path={`login`}
            element={
                  <ThemeProvider>
                    <Login />
                  </ThemeProvider>
            } />
          <Route path={`register`}
            element={
              <>
                <ThemeProvider>
                  <SignUp />
                </ThemeProvider>
              </>
            } />

          <Route path={`/*`} element={
            <>
              <h1>Page not Found</h1>
            </>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


