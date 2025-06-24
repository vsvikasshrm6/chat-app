import { Users } from "lucide-react";
import { authStore } from "../store/authStore";
import { useChatStore } from './../store/useChatStore';
import { useState } from "react";

export default function SideBar() {
  const { onlineUser } = authStore();
  const {users} = useChatStore();
  const [showOnlyOnline, setShowOnlyOnline] = useState();
  const filteredUser = showOnlyOnline ? onlineUser : users
  
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
         
        <div className="mt-3 flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
          <input 
          type="checkBox" 
          className="checkbox checkbox-sm"
          checked= {showOnlyOnline}
          onChange={(e)=>setShowOnlyOnline(e.target.checked)}
          ></input>
          <span>Show only online</span>
        </label>
        <span className="text-xs text-zinc-200 ">Online user length</span>
          </div> 
      </div>

       <div className=" overflow-y-auto w-full py-3">
          {filteredUser.map((user) => (
            <button
             key={user?.id}
             className={`flex flex-col items-center gap-3
              hover:bg-base-300 transition-colors
              `}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profilePic || "/avator.png"}
                  alt={user?.name}
                  className="size-12 rounded-full object-cover"
                />
              </div>
              <div className="text-left hidden lg:block min-w-0">
                  <div className="truncate font-medium">{user}</div>
                </div>
            </button>
          ))}
        </div>

    </aside>
  );
}
