import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
} from "../controllers/usercontroller.js";
import {isAuthenticated} from '../middlewares/auth.js'

const userRouter = express.Router();



userRouter.get("/profile", isAuthenticated ,getProfile);

userRouter.get("/logout", logoutUser);

userRouter.post("/login", loginUser);

userRouter.post("/register",registerUser);




export { userRouter };
