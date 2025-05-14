import { User } from "../models/user.js";
import bcrypt from "bcrypt";

export const login = (req, res)=>{
   res.send("Login");
}

export const logout = (req, res)=>{
   res.send("Logout");
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
   
   newUser.save();
}