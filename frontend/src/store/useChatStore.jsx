import {create} from "zustand"
import { axiosInstance } from './../libs/axios';
import toast from "react-hot-toast";

export const useChatStore = create((set)=>({
   messages : ["a", "b", "c", "d","e","f"],
   users : [],
   getMessages : async (userId)=>{
      set({isMessageLoading : true})
      try {
         const res =  await axiosInstance.get(`message/${userId}`)
         set({message : res.data})
      } catch (error) {
         console.log(error.message)
      }
      finally{
         set({isMessageLoading : false})
      }
   },
   sendMessage : async(messageData)=>{
      const {message, selectedUser} = messageData;
      try {
         const res = await axiosInstance.post(`/message/${selectedUser._id}`, message);
         set({message : [...message , res.data]});
      } catch (error) {
         toast.error(error.message)
         console.log(error.message);
      }
   },
   getUser : async()=>{
      set({isUserLoading : true})
      try {
         const res = await axiosInstance.get('/message/user');
         set({user : res.data});
      } catch (error) {
         toast.error(error.message)
         console.log(error.message)
      }
      finally{
         set({isUserLoading : false})
      }
   },
   isMessageLoading : false,
   isUserLoading : false,
   selectedUser : null,
   setSelectedUser: (selectedUser) => set({ selectedUser }),
}))