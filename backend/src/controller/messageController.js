import { Message } from "../models/message.js";
import { User } from "../models/user.js";
import { v2 as cloudinary } from 'cloudinary';
import {getSocketIdFromUserId} from "./authenticationController.js"
import { io } from "../lib/socket.js";

export const getUser = async (req, res)=>{
  try {
   const userId = req.user._id;
   const allUser = await User.find({_id : {$ne : {userId}}});
   res.status(200).json({success : true , allUser : allUser}); 
  } catch (error) {
    res.status(500).json({success : false, message : "Error in fetching all user"})
    console.log("Error in fetching all user" + error);
  }
}
export const getMessage = async (req, res)=>{
  try {
    const {id} = req.params;
    const myId = req.user._id;
    const chatToId = id;
    const messages = await Message.find({
      $or:[
        {
          senderId : myId,
          receiverId: chatToId
        },
        {
          senderId : chatToId,
          receiverId : myId 
        }
      ]
    })
    res.status(200).json({success : true, messages : messages});

  } catch (error) {
    res.status(500).json({sucess: false, message : error})
    console.log("Error in getting message" + error);
  }
}
export const sendMessage = async (req, res)=>{
  try {
    const {id} = req.params;
    const {message, image} = req.body;
    const myId = req.user._id;
    if(!message){
      res.status(400).json({success : false, message: "Please enter message"});
    }
    let imageUrl;
    if(image){
      const uploadedResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadedResponse.secure_url;
    }
   
    
    const newMessage = Message.create({
      senderId : myId,
      receiverId : id,
      message : message,
      image: imageUrl
    })
    await newMessage.save();
    const socketId = getSocketIdFromUserId(id);
    if(socketId)io.to(socketId).emit("New Message", newMessage)
    
    res.staus(200).json({success : true, message : "Message sent Successfully"});
  } catch (error) {
    res.staus(500).json({success : false, message : "Message not sent"});
  }
}