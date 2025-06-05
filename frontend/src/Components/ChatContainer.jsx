import ChatHeader from "./ChatHeader"
import MessageInput from "./MessageInput"

function ChatContainer() {
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader></ChatHeader>
      Chat Container
      <MessageInput></MessageInput>
    </div>
  )
}

export default ChatContainer
