import express from "express"
import authenticationRouter from "./routes/authenticationRoutes.js";
import messageRouter from "./routes/messageRoutes.js"
import dotenv from "dotenv"
import { connectDb } from "./lib/db.js";
import cookieParser from "cookie-parser"
import cors from "cors"
import {app, server} from "./lib/socket.js"

dotenv.config();
// const app = express();
app.use(cookieParser())
app.use(express.json({limit: '50mb'}));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const PORT = process.env.PORT

app.use('/api/auth', authenticationRouter)
app.use('/api/message',messageRouter )

server.listen(5001, ()=>{
  console.log("Connection established on PORT" + 5001)
  connectDb();
});