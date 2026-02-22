import { createContext, useEffect, type ReactElement } from "react";
import  Header  from "../layout/Header";
import { useDispatch, useSelector } from "react-redux";
import type { AppStore } from "../redux/store";
import { changeTheme, getTheme, setUser } from "../redux/features /userSlice";
import { getCurrentUser } from "../utils/userData";
import { useNavigate } from "react-router-dom";


const defaultValue:{
    theme: string , 
    setTheme : React.ActionDispatch<[]>, 
    isLogin: boolean , 
} = {theme: 'light' , setTheme : () => {}, isLogin: false}

const ContextValue = createContext(defaultValue);


export default function ThemeProvider ({children}:{children:ReactElement }){


    const dispatch = useDispatch()
    
    const getStore  = useSelector((state:AppStore) => state)

    const theme = getStore.userDetails.theme;
    useEffect(()=>{
        dispatch(getTheme())
    },[dispatch])
    const setTheme = () => {dispatch(changeTheme())}

    const isLogin = getStore.userDetails.isLogin;
    
 

    const navigate = useNavigate();
  const currUser =  getCurrentUser();

  useEffect(()=>{

    if(currUser){
      dispatch(setUser(currUser))
    }
  },[currUser,navigate,dispatch])


    return(
        <>
        <ContextValue.Provider value = {{theme , setTheme, isLogin}}>
            <Header />
            {children}
        </ContextValue.Provider>
        </>
    )

}
 

export {ContextValue};