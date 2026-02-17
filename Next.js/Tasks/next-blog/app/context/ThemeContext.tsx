'use client';
import { createContext, useCallback, useEffect } from 'react';
import { AppStore } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setDark, setLight } from "../redux/Slices/uiSlice";
import { getItem, setItem } from '../hooks/useLocalStorage';



const defaultValue: {
    theme: 'dark' | 'light';
    setDarkTheme: () => void;
    setLightTheme: () => void;

} = {
    theme: 'light',
    setDarkTheme: () => {},
    setLightTheme: () => {},
}


export const ThemeContext = createContext(defaultValue);


export default function ThemeProvider({children}:{children:React.ReactNode}) {

    const dispatch = useDispatch();

    const uiStore = useSelector((state: AppStore) => state.ui)
    const theme = uiStore.theme;


    const setDarkTheme = useCallback(() => {        
        dispatch(setDark())
        setItem('Theme','dark')
    },[dispatch])

    const setLightTheme = useCallback(() => {
        dispatch(setLight())
        setItem('Theme','light')
    },[dispatch])



    const renderFunction = useCallback(()=>{
        const storeTheme = getItem('Theme','light')
        if(storeTheme === 'light'){
            setLightTheme()
        }else{
            setDarkTheme()
        }
        
    },[setLightTheme, setDarkTheme])

    useEffect(()=>{
        renderFunction()
    },[renderFunction])

    return(
        <ThemeContext.Provider value={{theme, setDarkTheme, setLightTheme}} >
            {children}
        </ThemeContext.Provider>
    )
}

