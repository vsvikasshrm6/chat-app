import { create } from "zustand"
import { axiosInstance } from '../libs/axios';
import toast from "react-hot-toast";
import { authStore } from "./authStore"

export const useChatStore = create((set) => ({
   messages: [],
   users: [],
   isMessageLoading: false,
   isUserLoading: false,
   selectedUser: null,

   setSelectedUser: (selectedUser) => set({ selectedUser }),
   getMessages: async (userId) => {
      set({ isMessageLoading: true })
      try {
         const res = await axiosInstance.get(`message/${userId}`)
         set({ message: res.data })
      } catch (error) {
         console.log(error.message)
      }
      finally {
         set({ isMessageLoading: false })
      }
   },
   sendMessage: async (messageData) => {
      const { message, selectedUser } = messageData;
      try {
         const res = await axiosInstance.post(`/message/${selectedUser._id}`, message);
         set({ message: [...message, res.data] });
      } catch (error) {
         toast.error(error.message)
         console.log(error.message);
      }
   },
   getUser: async () => {
      set({ isUserLoading: true })
      try {
         const res = await axiosInstance.get('/message/user');
         // console.log(res);
         set({ users: res.data});
      } catch (error) {
         toast.error(error.message)
         console.log(error)
      }
      finally {
         set({ isUserLoading: false })
      }
   },
   subscribeToMessage: () => {
      //optimisation is to be done
      const socket = authStore.getState().socket;
      socket.on("New Message", (newMessage) => {
         set({ messages: [...get().messages, newMessage] })
      })
   },
   unsubscribeToMessage: () => {
      const socket = authStore.getState().socket;
      socket.off("New Message");
   },


}))