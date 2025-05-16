import { Router } from "express";
import { login, logout, signup,update  } from "../controller/authenticationController.js";
import { protectedRoute } from "../middleware/protectedRoute.js";


const authenticationRouter = Router();

authenticationRouter.post('/login', login)
authenticationRouter.post('/logout', logout)
authenticationRouter.post('/signup', signup)
authenticationRouter.put("/update", protectedRoute, update)

export default authenticationRouter;