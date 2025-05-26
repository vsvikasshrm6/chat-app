import { Router } from "express";
import { login, logout, signup,update, check  } from "../controller/authenticationController.js";
import { protectedRoute } from "../middleware/protectedRoute.js";


const authenticationRouter = Router();

authenticationRouter.post('/login', login)
authenticationRouter.post('/logout', logout)
authenticationRouter.post('/signup', signup)
authenticationRouter.put("/update", protectedRoute, update)
authenticationRouter.get('/check', protectedRoute, check)

export default authenticationRouter;