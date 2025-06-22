import mongoose from "mongoose"


export const connectDb = async()=>{
  try {
    console.log(process.env.MONGO_URI);
    // await mongoose.connect(process.env.MONGO_URI)  
    await mongoose.connect("mongodb+srv://vsvikasshrm6:UxuxvnK9XBxvmn7j@cluster0.szroq0i.mongodb.net/")
    console.log("Connected to data base")
  } catch (error) {
    console.log('Error connecting to DB' + error)
  }
}
