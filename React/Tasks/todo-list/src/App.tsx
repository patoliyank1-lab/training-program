import Header from "./layout/Header";
import MainContent from "./layout/MainContent";
import Sidebar from "./layout/Sidebar";

function App() {
  return (
   <div className="w-full h-lhv flex flex-col">
    <Header />
    <div className="flex">
    <Sidebar />
    <MainContent />
    </div>
   </div>
  );
}

export default App;
