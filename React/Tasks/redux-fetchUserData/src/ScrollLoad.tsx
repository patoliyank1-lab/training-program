import { useCallback, useEffect, useRef } from "react";
import ProfileCard from "./components/ProfileCard.tsx";
import type { User } from "./Types.ts";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "./redux/store.ts";
import { fetchUserData, type initialType } from "./redux/features/userSlice.ts";

function ScrollLoad() {
  const store = useSelector( (state:{userStore:initialType}) => state.userStore)
  const userData:User[] = store.allUserData
  const dispatch = useDispatch<AppDispatch>()

  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const getUserData = useCallback(()=>{
    dispatch(fetchUserData());
    
  },[dispatch])

  
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && (store.status === 'success' || store.status === '')) {
      getUserData()
    }
  },[getUserData,store]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    });

    const currentTarget = messagesEndRef.current; 

    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [messagesEndRef,handleIntersection]); // Re-run effect if the target changes


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
        <div  ref={messagesEndRef}></div>
        </div>
        </div>
    </>
  );
}
export default ScrollLoad;
