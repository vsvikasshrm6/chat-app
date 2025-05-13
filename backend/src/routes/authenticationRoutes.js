import { Router } from "express";
import { login, logout, signup,  } from "../controller/authenticationController.js";


const authenticationRouter = Router();

authenticationRouter.post('/api/login', login)
authenticationRouter.post('/api/logout', logout)
authenticationRouter.post('/api/signup', signup)

export default authenticationRouter;