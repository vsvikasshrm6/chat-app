import {create} from "zustand"
import { axiosInstance } from "../libs/axios"

export const authStore = create((set)=>({
  authUser: null,
  isCheckingAuth : true,
  isLogging : false,

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
      
  },
  login : async (login)=>{
    set({isLogin : true})
    try {
      const res = await axiosInstance.post('api/auth/login',login)
      set({authUser : res.data})
      
    } catch (error) {
      console.log(error.message)
    }
    finally{
        set({isLogging : false})
    }
    
    }
  }
))