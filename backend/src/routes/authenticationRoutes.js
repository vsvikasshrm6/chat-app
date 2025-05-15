import { Router } from "express";
import { login, logout, signup,update  } from "../controller/authenticationController.js";
import { protectedRoute } from "../middleware/protectedRoute.js";


const authenticationRouter = Router();

authenticationRouter.post('/api/login', login)
authenticationRouter.post('/api/logout', logout)
authenticationRouter.post('/api/signup', signup)
authenticationRouter.put("/api/update", protectedRoute, update)

export default authenticationRouter;