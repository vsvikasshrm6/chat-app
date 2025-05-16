import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId:{
    type: mongoose.Schema.Types.ObjectId,
    references : "User",
    require : true
  },
  receiverId:{
    type: mongoose.Schema.Types.ObjectId,
    references : "User",
    require : true
  },
  text:{
    type : String
  },
  image :{
    type : String
  },
},
{ timestamps: true }
)

export const Message = mongoose.model("Message", messageSchema);