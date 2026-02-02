import { useEffect, useState } from "react";
import "./App.css";
import ProfileCard from "./components/ProfileCard.tsx";

function App() {
  const [data, setData] = useState([]);

  async function getData() {
    const data1 = await fetch("https://dummyjson.com/users");
    return data1.json();
  }

  useEffect(() => {
    (async () => {
      const dataD = await getData();

      setData(dataD.users);
    })();
  }, []);

  return (
    <>
        <div className=" w-full bg-gray-100 h-lhv overflow-x-scroll flex justify-center">

          <div className="max-w-350 flex justify-center flex-wrap gap-10 p-10">

        {data.map((user) => (
          <ProfileCard 
          key={user.id}
            name={user.firstName}
            role={user.role}
            phone={user.phone}
            email={user.email}
            url={user.image}
          />
        ))}
        </div>
        </div>
    </>
  );
}
export default App;
