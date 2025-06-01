import {create} from "zustand"
import { axiosInstance } from "../libs/axios"
import toast from "react-hot-toast";

export const authStore = create((set)=>({
  authUser: null,
  isCheckingAuth : true,
  isLogging : false,
  isUpdatingProfile : false,  

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
    
  },
  updateProfile : async (data)=>{
    set({isUpdatingProfile : true})
    try {
      const res = await axiosInstance.put("/api/auth/update", data);
      set({authUser : res.data})
      toast.success("Profile updated successfully");     
    } catch (error) {
      toast.error("Profile not updated");
      console.log(error);
    }
    finally{
      set({isUpdatingProfile : false});
    }
  }


  }
))