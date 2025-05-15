import jwt from "jsonwebtoken"

export const generateToken = (userId, res)=>{
  const jwtToken = jwt.sign({userId}, process.env.JWT_SECRET,
    {
      expiresIn: "7d"
    }
  )
  //more value to be set here
  res.cokkie("token", jwtToken,{
    
  })
}