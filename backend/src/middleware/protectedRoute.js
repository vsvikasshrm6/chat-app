import  jwt  from "jsonwebtoken";
import  dotenv  from 'dotenv';
import { User } from "../models/user.js";


export const protectedRoute = async (req, res, next)=>{
  try {
    const {token} = req.cookies;
    dotenv.config();
    const isValidToken = jwt.verify(token,process.env.JWT_SECRET);
    if(!isValidToken){
      res.status(400).json({success: false, message : "Unauthorised Access"});
    }
    const {_id} = jwt.decode(token);
    const user = await User.findById({_id});
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({message: error});
    console.log("Error in Protected Route" + error);
  }
    
}