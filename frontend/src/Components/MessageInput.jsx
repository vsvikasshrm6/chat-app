import React, { useState, useRef } from "react";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { useChatStore } from './../store/useChatStore';

function MessageInput() {
  const [imagePreview, setImagePreview] = useState(null);
  const {sendMessage} = useChatStore();
  const [text, setText] = useState("");
  const fileInputRef = useRef(null); 
  const removeImage = () => {
    setImagePreview(null);
  };
  const handleImageChange = (e)=>{
    const file = e.target.files[0];
      if(!file.type.startsWith('image/')){
        toast.error("Please select image file")
        return;
      }
     const reader = new FileReader();
     reader.onload = ()=>{
      setImagePreview(reader.result)
     }
     reader.readAsDataURL(file);
  }
  const handleSendMessage = async (e)=>{
      e.preventDefault();
      if(!text.trim() && !imagePreview)return;
      try {
        
        await sendMessage({
          image : imagePreview,
          text : text.trim()
        })
        // setImagePreview(null);
        // setText("")
        if (fileInputRef.current) fileInputRef.current.value = "";

      } catch (error) {
        console.log(error.message)
      }

  }
  return (
    <div className="w-full p-4">
      {imagePreview && (
        <div className="flex items-center mb-3">
          <div className="relative">
            <img src={imagePreview} alt="image" />
            <button
              onClick={removeImage}
              className="absolute -left-1.5 -top-1.5 w-5 h-5 rounded-full bg-base-300
          flex items-center justify-center
          "
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div>
          <input
           type="text"
           className="w-full input input-bordered rounded-lg input-sm sm:input-md"
           placeholder="Type a message"
           value={text}
           onChange={(e)=>{setText(e.target.value)}}
           />
          <input
           type="file"
           className="hidden"
           accept="image/*"
           ref= {fileInputRef}
           onChange={handleImageChange} 
           />
           <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                        ${imagePreview ? "text-emerald-500" : "text-zinc-400"}
              `}

            onClick={()=>fileInputRef.current?.click()}
           ><Image size={20}></Image></button>
        </div>
        <button
        type="submit"
        className="btn btn-sm btn-circle"
        disabled= {!text.trim() && !imagePreview}
        >
        <Send size={22}> </Send>
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
