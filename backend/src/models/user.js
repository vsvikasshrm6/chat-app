import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  useremail :{
    type : String,
    require : true,
    unique :true
  },
  fullname :{
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
  },
 timestamps: true
})
export const User = mongoose.model("User", userSchema);