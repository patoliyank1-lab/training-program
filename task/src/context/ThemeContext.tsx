'use client';
import { createContext, useCallback, useEffect } from 'react';
import { AppStore } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setDark, setLight } from "../redux/Slices/uiSlice";
import { getItem, setItem } from '../hooks/useLocalStorage';

const defaultValue: {
    mode: 'dark' | 'light';
    setDarkTheme: () => void;
    setLightTheme: () => void;
    toggleTheme: () => void;
} = {
    mode: 'light',
    setDarkTheme: () => { },
    setLightTheme: () => { },
    toggleTheme: () => { },
}

export const ThemeContext = createContext(defaultValue);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {

    const dispatch = useDispatch();
    const uiStore = useSelector((state: AppStore) => state.ui)
    const mode = uiStore.theme;

    const setDarkTheme = useCallback(() => {
        dispatch(setDark())
        setItem('Theme', 'dark')
        document.documentElement.setAttribute('data-theme', 'dark')
    }, [dispatch])

    const setLightTheme = useCallback(() => {
        dispatch(setLight())
        setItem('Theme', 'light')
        document.documentElement.setAttribute('data-theme', 'light')
    }, [dispatch])

    const toggleTheme = useCallback(() => {
        if (mode === 'light') {
            setDarkTheme()
        } else {
            setLightTheme()
        }
    }, [mode, setDarkTheme, setLightTheme])

    const renderFunction = useCallback(() => {
        const storeTheme = getItem('Theme', 'light')
        if (storeTheme === 'dark') {
            setDarkTheme()
        } else {
            setLightTheme()
        }
    }, [setLightTheme, setDarkTheme])

    useEffect(() => {
        renderFunction()
    }, [renderFunction])

    return (
        <ThemeContext.Provider value={{ mode, setDarkTheme, setLightTheme, toggleTheme }} >
            {children}
        </ThemeContext.Provider>
    )
}
