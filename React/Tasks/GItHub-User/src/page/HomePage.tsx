import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function HomePage() {
  const { theme } = useContext(ThemeContext)
  return (<>
    <div
      className={`flex justify-center flex-col  items-center h-screen
            ${theme === 'dark' ? 'bg-body text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
      <div className="text-4" >Home Page</div>

    </div>

  </>);
}

