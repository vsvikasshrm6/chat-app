import {create} from "zustand"
import { axiosInstance } from "./axios"

export const authStore = create((set)=>({
  authUser: null,
  isCheckingAuth : true,

  checkAuth : async ()=>{
    try {
      const res = await axiosInstance.get("auth/check");
      set({authUser : res.data});
    } catch (error) {
      console.log(error.message)
      set({authUser : null});
    }
    finally{
      set({isCheckingAuth : false})
    }
      
  }
}))