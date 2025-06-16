import {create} from "zustand"
import { axiosInstance } from "../libs/axios"
import toast from "react-hot-toast";
import {io} from "socket.io-client"
const BASE_URL = "http://localhost:5001"

export const authStore = create((set, get)=>({
  authUser: null,
  onlineUser : ["jon", "tom", "rom","jon", "tom", "rom", "jon", "tom", "rom", "jon", "tom", "rom"],
  isCheckingAuth : true,
  isLogging : false,
  isUpdatingProfile : false,
  socket: null,  

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
      get().connectSocket();
      
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
  },
  connectSocket : ()=>{
    const {authUser} = get();
    if(!authUser || get().socket?.connected)return; 
    const socket = io(BASE_URL, {
      query :{userId : authUser._id}
    });
    socket.connect();
    socket.on("connection", ()=>{console.log("Connection done"+ socket.id)})
    set({socket: socket});
  },
  disconnectSocket : ()=>{
    if(get().socket?.connected)get().socket.disconnect();
  },


  }
))