import jwt from "jsonwebtoken"

export const generateToken = (userId, res)=>{
  const jwtToken = jwt.sign({userId}, "jwt-secret",
    {
      expiresIn: "7d"
    }
  )
  //more value to be set here
  res.cookie("jwt", jwtToken,{
    maxAge : 7*24*60*60*1000,
    httpOnly : true,
    sameSite : "strict"
  })
  // return jwtToken;
}