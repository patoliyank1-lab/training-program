import { createContext, useEffect, useState, type ReactElement } from "react";
import { Header } from "../components";
import useTheme from "../hook/useTheme";
import { getCurrentUser } from "../utils/userData";


const defaultValue:{
    theme: string , 
    setTheme : React.ActionDispatch<[]>, 
    isLogin: boolean , 
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
} = {theme: 'light' , setTheme : () => {}, isLogin: false , setIsLogin: () => {}}

const ContextValue = createContext(defaultValue);


export default function ThemeProvider ({children}:{children:ReactElement }){

    const [isLogin, setIsLogin] = useState<boolean>(false)

    useEffect(()=>{
        if(getCurrentUser()){
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsLogin(true);
        }else{
            setIsLogin(false)
        }
    },[])
    const [theme , setTheme] = useTheme()


    return(
        <>
        <ContextValue.Provider value = {{theme , setTheme, isLogin, setIsLogin}}>
            <Header />
            {children}
        </ContextValue.Provider>
        </>
    )

}
 

export {ContextValue};