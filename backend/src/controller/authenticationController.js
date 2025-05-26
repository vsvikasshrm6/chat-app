import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { generateToken } from './../lib/utils.js';


export const login = (req, res)=>{
   const {email , password}  = req.body;
   if(!email || !password){
      res.status(400).json({sucess : false, message: "Invalid creditionals"});
   }

   const user = User.findOne({email});
   const isPasswordCorrect = bcrypt.compare(password, user.password);
   if(!isPasswordCorrect){
      res.status(400).json({sucess : false, message: "Invalid creditionals"});
   }
   generateToken(user._id, res);
   res.status(200).json({
      _id : user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
   });
}

export const logout = (req, res)=>{
   res.cookie("token", "");
   res.status(200).json({success: true, message: "Logout successfull"});
}

export const signup = (req, res)=>{
   const {fullName, email, password} = req.body;
   if(!fullName || !email || !password){
      res.send(400).json({success : false, message : "All fields are requiered"});
   }
   if(password.length <6){
      res.send(400).json({success : false, message : "Password length is less than 6"});
   }
   const user = User.findOne({email});
   if(user){
      res.send(400).json({success : false, message : "User alredy exist"});
   }
   const salt = bcrypt.genSalt(10);
   const hashedPassword = bcrypt.hash(password, salt);
   const newUser = User.create({
      fullname,
      email,
      password : hashedPassword
   })
   generateToken(user._id, res);
   newUser.save();
   res.status(200).json({success: true, message : "Login successfull" })
}
export const update = (req, res)=>{
   const {userId} = req.body;
   const updatedImage = req.body;
   if(!updatedImage){
      return res.status(400).json({success: false, message: "Updated Image is required"});
   }
   const updatedUser = User.findOneAndUpdate({userId},{image : updatedImage}, {new: true});
   res.status(200).json({success : true, message : "Profile updated successfully"});
}

export const check = (req, res)=>{
   if(req.user){
      res.staus(200).json({message: "Authorised"})
   }
   else{
      res.status(400).json({message : "Unauthorised Request"});
   }
}