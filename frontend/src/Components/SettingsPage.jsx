
import { THEMES } from "../Constant"
import { useThemeStore } from "../store/useThemeStore"


const SettingsPage = () => {
  const {Theme, setTheme} = useThemeStore();
  return (
    <div className="h-screen container max-w-5xl mx-auto px-4 pt-20">

      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-semibold">Theme</h1>
        <p className="text-sm text-base-content/70">Choose a theme for your chat interface</p>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
        {THEMES.map((t)=>{
           return (<button
             key={t}
             className = {`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
              ${Theme===t ? "bg-base-300": "hover:bg-base-200/50"}`}
              onClick={setTheme}
           > 
           <div className= "h-8 w-full rounded-b-md" data-theme={t}>
              <div className="grid grid-cols-4">
                <div className="rounded bg-primary"></div>
                <div className="rounded bg-secondary"></div>
                <div className="rounded bg-accent"></div>
                <div className="rounded bg-neutral"></div>
                
              </div>
           </div>
           <p>{t}</p></button>)
        })}
      </div>


    </div>
  )
}

export default SettingsPage
