import { useEffect, useReducer, type ActionDispatch } from "react"
import { getTheme, storeTheme } from "../utils/themeData"

export default function useTheme () : [string, ActionDispatch<[]>]{
    const defaultTheme =  getTheme();
    const [theme , setTheme] = useReducer((them:string) => them === 'dark' ? 'light': 'dark' , defaultTheme)

    useEffect(()=>{storeTheme(theme)},[theme])


    return [theme, setTheme];
}