import express from "express";
import { getMessage, getUser, sendMessage } from "../controller/messageController.js";

const router = express.Router();

router.get("/user", getUser);
router.get("/:id", getMessage);
router.post('/send/:id', sendMessage);

export default router;