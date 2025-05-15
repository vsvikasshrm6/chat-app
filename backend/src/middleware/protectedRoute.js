import { jwt } from "jsonwebtoken";
import { dotenv } from 'dotenv';

export const protectedRoute = (req, res, next)=>{
    const {token} = req.cookies;
    dotenv.config();
    const isValidToken = jwt.verify(token,process.env.JWT_SECRET);
    if(!isValidToken){
      res.status(400).json({success: false, message : "Unauthorised Access"});
    }
    const {_id} = jwt.decode(token);
    req.userId = _id;
    next();
}