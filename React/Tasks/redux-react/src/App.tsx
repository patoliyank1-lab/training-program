import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncFunction, decrement, decrementByAmount, increment, incrementByAmount } from "./redux/features/countSlice";
import type { AppDispatch } from "./redux/store";

function App() {

  const counter = useSelector((state: { counter: { value: number; status:string; } }) => state.counter)
  const count = counter.value
  const dispatch = useDispatch<AppDispatch>()
  const [num, setNum] = useState(0);
  const handleAction = useCallback(() => {
 
    dispatch(asyncFunction());
    
  },[dispatch])

  useEffect(()=>{
    handleAction()
  },[handleAction])



  return (
  <div className="h-screen w-screen overflow-auto bg-gray-100 flex justify-center items-center">

    <div className="max-w-sm p-5 flex flex-col gap-2 items-center bg-white shadow-2xl rounded-md">
      <h1 className="bg-gray-100 p-5 text-3xl font-bold text-gray-800 rounded-md">{count}</h1>
      <div className="flex flex-col items-center gap-3 w-full">
        <div className="flex gap-3 w-full">
          <button className="cursor-pointer text-center flex-1 bg-blue-500 rounded-md text-gray-100 py-1 px-3"
          onClick={()=> dispatch && dispatch(increment())}
          >+</button>
          <button className="cursor-pointer text-center flex-1 bg-blue-500 rounded-md text-gray-100 py-1 px-3"
          onClick={()=> dispatch && dispatch(decrement())}
          >-</button>
        </div>
        <div className="flex gap-3">
          <button 
          onClick={()=> dispatch && dispatch(incrementByAmount(num))}
          className="cursor-pointer bg-blue-500 rounded-md text-gray-100 py-1 px-5">+</button>
          <input 
          type="number"
          value={num}
          min={0}
          max={10}
          onChange={(e) => setNum && setNum(Number(e.target.value))}
          onClick={handleAction}
          className="size-10 border-2 rounded-md text-center"
           />
          <button 
          onClick={()=> dispatch && dispatch(decrementByAmount(num))}
          className="cursor-pointer bg-blue-500 rounded-md text-gray-100 py-1 px-5">-</button>
        </div>
      </div>
    </div>

  </div>
);
}

export default App;
