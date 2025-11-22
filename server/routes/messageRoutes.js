import express from 'express';
import { protectRoute } from '../middleware/auth.js';
import {getMessages, getUsersForSidebar, markMessagesAsSeen, sendMessage, deleteConversation, deleteMessageForMe, deleteMessageForEveryone} from '../controllers/messageController.js';

const messageRouter = express.Router();

messageRouter.get("/users", protectRoute, getUsersForSidebar)
messageRouter.get("/:id", protectRoute, getMessages)
messageRouter.post("/mark/:id", protectRoute, markMessagesAsSeen)
messageRouter.post("/send/:id", protectRoute, sendMessage)
messageRouter.delete("/clear/:id", protectRoute, deleteConversation)
messageRouter.delete("/delete-for-me/:messageId", protectRoute, deleteMessageForMe)
messageRouter.delete("/delete-for-everyone/:messageId", protectRoute, deleteMessageForEveryone)

export default messageRouter;