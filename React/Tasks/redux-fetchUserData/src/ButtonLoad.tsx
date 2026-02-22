import { useCallback, useEffect, useRef, useState } from "react";
import ProfileCard from "./components/ProfileCard.tsx";
import type { User } from "./Types.ts";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "./redux/store.ts";
import { fetchUserData, type initialType } from "./redux/features/userSlice.ts";

function ButtonLoad() {
  const store = useSelector( (state:{userStore:initialType}) => state.userStore)
  const userData:User[] = store.allUserData
  const dispatch = useDispatch<AppDispatch>()
  const [interact, setInteract] = useState(false)


  const messagesEndRef = useRef<null | HTMLDivElement>(null)
  const scrollToBottom = () => {
    if(messagesEndRef.current && interact){
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    } 
  }

  useEffect(scrollToBottom, [store,scrollToBottom]);
  

  const getUserData = useCallback(()=>{
    dispatch(fetchUserData())
  },[dispatch])

useEffect(()=>{
  getUserData()
},[getUserData])
  return (
    <>
        <div className=" w-full bg-gray-100 h-lhv min-h-screen flex flex-col items-center">
          <div className="max-w-350 w-full h-full flex justify-center flex-wrap gap-10 p-10">

        {userData.map((user) => (
          <ProfileCard 
          key={user.id}
            name={user.firstName}
            role={user.role}
            phone={user.phone}
            email={user.email}
            url={user.image}
          />
        ))}
        {store.status ==='loading'  && (<div className="w-full  h-[50vh] flex items-center justify-center">

          <div className="size-14 border-9 border-blue-500  animate-spin border-b-transparent rounded-full"></div>

        </div>)}
        {store.status ==='success'  && (<div className="w-full flex justify-center">
          <div className="btn-primary w-min bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {setInteract(true);  getUserData()}}
          >More</div>
        </div>
          )}
        <div ref={messagesEndRef}></div>
        </div>
        </div>
    </>
  );
}
export default ButtonLoad;
