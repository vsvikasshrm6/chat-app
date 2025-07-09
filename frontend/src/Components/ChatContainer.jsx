import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { authStore } from "./../store/authStore";
import NoChatSelected from "./NoChatSelected";
import { useEffect, useRef } from "react";
import {formatMessageDate} from "../libs/fomatDate"

function ChatContainer() {
  const { messages, selectedUser, getMessages, subscribeToMessage, unsubscribeToMessage } = useChatStore();
  const { authUser } = authStore();
  const messageEndRef = useRef(null);
  useEffect(()=>{
      getMessages(selectedUser._id)
      subscribeToMessage();
      return ()=>unsubscribeToMessage();
  }
  , [selectedUser, getMessages, subscribeToMessage, unsubscribeToMessage])
  useEffect( ()=>{
    if(messageEndRef.current && messages){
      messageEndRef.current.scrollIntoView({behavior : "smooth"});
    }
  } , [messages])
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader></ChatHeader>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {messages.map((message) => (
          <div
            className={`chat ${
              message.senderId == authUser?._id ? "chat-end" : "chat-start"
            }`}
            key={message._id}
            ref={messageEndRef}
          >
            <div className="chat-image avator">
              <div className="size-10 rounded-full border">
                <img
                src={
                  message?.senderId == authUser?._id
                    ? authUser?.profilepic || "avator.png"
                    : selectedUser?.profilepic || "avator.png"
                }
                alt="Profile Pic"
              />
              </div>
              
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageDate(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex felx-col">
              {message.image && (
                <img
                src="message.image"
                alt="Attachment"
                className="sm:max-w-[200px] rounded-md mb-2"
                ></img>
              )}
              {message.text && <p>{message.text}</p>}
            </div>


          </div>
        ))}
      </div>

      <MessageInput></MessageInput>
    </div>
  );
}

export default ChatContainer;
