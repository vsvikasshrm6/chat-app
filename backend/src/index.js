import express from "express"
import authenticationRouter from "./routes/authenticationRoutes.js";
import dotenv from "dotenv"
import { connectDb } from "./lib/db.js";
import cookieParser from "cookie-parser"
import {app, io, server} from "./lib/socket.js"

dotenv.config();
// const app = express();
app.use(cookieParser())
app.use(express.json());
const PORT = process.env.PORT

app.use('/api/auth', authenticationRouter)
app.use('/api/message', authenticationRouter)

server.listen(process.env.PORT, ()=>{
  console.log("Connection established on PORT" + PORT)
  connectDb();
});