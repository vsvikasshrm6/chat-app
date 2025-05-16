import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email :{
    type : String,
    require : true,
    unique :true
  },
  fullName :{
    type : String,
    require : true,
  },
  password :{
    type : String,
    require : true,
    minlength : 6
  },
  profilepic :{
    type : String,
    default : ""
  }
 
}, {timestamps: true})
export const User = mongoose.model("User", userSchema);