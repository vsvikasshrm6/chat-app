import  jwt, { decode }  from "jsonwebtoken";
import  dotenv  from 'dotenv';
import { User } from "../models/user.js";


export const protectedRoute = async (req, res, next)=>{
  try {
    const token = req.cookies.jwt;
    dotenv.config();
    if(!token){
      return res.status(401).json({message : "Unauthorised NO token provided"})
    }
    const decodedToken = jwt.verify(token,"jwt-secret");
    if(!decodedToken){
      res.status(400).json({success: false, message : "Unauthorised Access"});
    }
    
    const user = await User.findById(decodedToken.userId);
    if(!user){
      return res.status(404).json({message : "User not found"});
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({message: error});
    console.log("Error in Protected Route" + error);
  }
    
}