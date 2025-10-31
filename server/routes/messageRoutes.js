import express from 'express';
import { protectRoute } from '../middlewares/authMiddleware.js';
import { getUsersForSidebar } from '../controllers/messageController';

const messageRouter = express.Router();

messageRouter.get("/users", protectRoute, getUsersForSidebar)
messageRouter.get("/:id", protectRoute, getMessages)
messageRouter.post("/mark/:id", protectRoute, markMessagesAsSeen)

export default messageRouter;