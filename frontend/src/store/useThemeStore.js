import {create} from "zustand"

export const useThemeStore = create((set)=>({
    Theme: localStorage.getItem("chat-theme")|| "light",
    
    setTheme : (theme)=>{
        localStorage.setItem("chat-theme", theme);
        set({Theme : theme})}
}))