import { create } from "zustand"
import { axiosInstance } from '../libs/axios';
import toast from "react-hot-toast";
import { authStore } from "./authStore"

export const useChatStore = create((set, get) => ({
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
         set({ messages: res.data })
      } catch (error) {
         console.log(error.message)
      }
      finally {
         set({ isMessageLoading: false })
      }
   },
   sendMessage: async (messageData) => {
      const { messages, selectedUser } = get();
      try {
         const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
         set({ messages: [...messages, res.data] });
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
      socket.on("NewMessage", (newMessage) => {
         console.log(newMessage)
         set({ messages: [...get().messages, newMessage] })
      })
   },
   unsubscribeToMessage: () => {
      const socket = authStore.getState().socket;
      socket.off("NewMessage");
   },


}))