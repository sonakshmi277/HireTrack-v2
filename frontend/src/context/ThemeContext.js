import {createContext,useContext,useState,useEffect} from "react";
const ThemeContext=createContext();

export function ThemeProvider({children}){
    const [mode,setMode]=useState(localStorage.getItem("theme")||"dark");
    useEffect(()=>{
        localStorage.setItem("theme",mode);
    },[mode]);
    function toggleTheme(){
        setMode(prev=>prev==="dark"?"light":"dark")
    }
    return(
        <ThemeContext.Provider value={{mode,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}
export function useTheme(){
    return useContext(ThemeContext);
}