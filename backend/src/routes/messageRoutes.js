import express from "express";
import { getMessage, getUser, sendMessage } from "../controller/messageController.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const messageRouter = express.Router();

messageRouter.get("/user", protectedRoute, getUser);
messageRouter.get("/:id", protectedRoute, getMessage);
messageRouter.post('/send/:id',protectedRoute, sendMessage);

export default messageRouter;