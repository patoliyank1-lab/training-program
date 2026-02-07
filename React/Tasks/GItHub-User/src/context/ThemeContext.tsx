import { createContext, type ReactElement } from "react";
import { Header } from "../components";
import useTheme from "../hook/useTheme";

const ThemeContext = createContext({theme: 'dark' , setTheme : () => {}});


export default function ThemeProvider ({children}:{children:ReactElement }){

    const [theme , setTheme] = useTheme()


    return(
        <>
        <ThemeContext.Provider value = {{theme , setTheme}}>
            <Header />
            {children}
        </ThemeContext.Provider>
        </>
    )

}
 

export {ThemeContext};