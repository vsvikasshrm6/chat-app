import {create} from "zustand"
import { axiosInstance } from "../libs/axios"
import toast from "react-hot-toast";
import {io} from "socket.io-client"
const BASE_URL = "http://localhost:5001"

export const authStore = create((set, get)=>({
  authUser: null,
  onlineUser : [],
  isSigniningUp : false,
  isCheckingAuth : true,
  isLogging : false,
  isUpdatingProfile : false,
  socket: null,  

  checkAuth : async ()=>{
    try {
      const res = await axiosInstance.get("auth/check");
      set({authUser : res.data});
      get().connectSocket();
    } catch (error) {
      console.log("Error in checking auth" + error)
      set({authUser : null});
    }
    finally{
      set({isCheckingAuth : false})
    }
      
  },
  signUp : async (data)=>{
    set({isSigniningUp : true});
    try {
      
      const res = await axiosInstance.post("/auth/signup", data)
      // here are we redirecting to login page or homepage -- is there a need to set authuser
      set({authUser : res.data})
      toast.success("Account created successfully")
    } catch (error) {
      toast.error(error.response.data.message)
      console.log("Error in signup" + error);
    }
    finally{
      set({isSigniningUp : false});
    }
  },
  login : async (data)=>{
    set({isLogin : true})
    try {
      const res = await axiosInstance.post('auth/login',data)
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
      const res = await axiosInstance.put("auth/update", data);
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
  logout : async ()=>{
    try {
      await axiosInstance.post("/auth/logout");
      set({authUser : null})
      toast.success("Logout successfully")
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  connectSocket : ()=>{
    const {authUser} = get();
    if(!authUser || get().socket?.connected)return; 
    const socket = io(BASE_URL, {
      query :{
        userId : authUser._id
      },
    });
    socket.connect();
    socket.on("connection", ()=>{console.log("Connection done"+ socket.id)})
    socket.on("OnlineUser", (userIds)=>{
      console.log(userIds);
      set({onlineUser : userIds})})
    set({socket: socket});
  },
  disconnectSocket : ()=>{
    if(get().socket?.connected)get().socket.disconnect();
  },
  }
))