import express from "express"
import authenticationRouter from "./routes/authenticationRoutes.js";
import dotenv from "dotenv"
import { connectDb } from "./lib/db.js";

dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT
app.use('/', authenticationRouter)

app.listen(process.env.PORT, ()=>{
  console.log("Connection established on PORT" + PORT)
  connectDb();
});