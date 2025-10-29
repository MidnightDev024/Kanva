import express from 'express';
import { signup } from '../controllers/userController.js';
import { login } from '../controllers/userController.js';
import { getUserData } from '../controllers/userController.js';
import { updateProfile } from '../controllers/userController.js';
import { protectRoute } from '../middleware/auth.js';

const userRouter = express.Router()

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/getUserData", protectRoute, getUserData);
userRouter.put("/updateProfile", protectRoute, updateProfile);