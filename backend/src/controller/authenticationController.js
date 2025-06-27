import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { generateToken } from './../lib/utils.js';
import cloudinary from "../lib/cloudinary.js";


export const login = async (req, res)=>{
   const {email , password}  = req.body;
   if(!email || !password){
      res.status(400).json({sucess : false, message: "Invalid creditionals"});
   }

   const user = await User.findOne({email});
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

export const signup = async (req, res)=>{
   try {
      const {fullName, email, password} = req.body;
      console.log(req.body);
   if(!fullName || !email || !password){
      return res.send(400).json({success : false, message : "All fields are requiered"});
   }
   if(password.length <6){
      return res.send(400).json({success : false, message : "Password length is less than 6"});
   }
   const user = await User.findOne({email});
   if(user){
      return res.send(400).json({success : false, message : "User already exist"});
   }
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);
   const newUser = new User({
      fullName : fullName,
      email : email,
      password : hashedPassword
   })
   if(newUser){
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(200).json({success: true, message : "Signup successfull" })
   }
   else{
      res.status(400).json({message: "Invalid user data"})
   }
      
   } catch (error) {
      console.log(error)
   }
   
}
export const update = async (req, res)=>{
   try {
      const {profilePic} = req.body;
      const userId = req.user._id;

      if(!profilePic){
         return res.status(400).json({message : "Profile pic required"});
      }
      const uploadedResponse = await cloudinary.uploader.upload(profilePic)
      const updatedUser = User.findByIdAndUpdate(
         userId,
         {profilepic : uploadedResponse},
         {new : true}
      );
      res.status(200).json(updatedUser);

   } catch (error) {
      console.log("Error in updating profile" + error);
      res.status(500).json({message: "Internal server error"})
   }  
}

export const check = (req, res)=>{
   try {
      res.status(200).json(req.user);
   } catch (error) {
      console.log("Error in checking auth controller" , error.message)
      res.status(500).json({message : "Internal server Error"});
   }
   
   
}
