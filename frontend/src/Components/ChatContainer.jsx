import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { authStore } from "./../store/authStore";
import NoChatSelected from "./NoChatSelected";

function ChatContainer() {
  const { messages, selectedUser } = useChatStore();
  const { authUser } = authStore();
  console.log(messages)
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader></ChatHeader>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {messages.map((message) => (
          <div
            className={`${
              message?.senderId == authUser?._id ? "chat-end" : "chat-start"
            }`}
            key={message?._id}
          >
            <div className="chat-image avator">
              <img
                src={
                  message?.senderId == authUser?._id
                    ? authUser?.profilePic || "avator.png"
                    : selectedUser?.profilePic || "avator.png"
                }
                alt="Profile Pic"
              />
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {message?.createdAt}
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
