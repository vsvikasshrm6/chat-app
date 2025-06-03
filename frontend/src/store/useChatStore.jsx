import {create} from "zustand"

export const useChatStore = create((set)=>({
   selectedUser : null
}))