import express from "express";
import {
  getAllContacts,
  getMessagesByUserId,
  sendMessage,
  getAllChats,
} from "../controllers/message.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();

//first the arcjet projtection will run, then the JWT verification
//this is more efficient since unauthenticated requests from bots will be blocked early before hitting the auth middleware
router.use(arcjetProtection, verifyJWT);

router.get("/contacts", getAllContacts);
router.get("/chats", getAllChats);
router.get("/:id", validateObjectId("id"), getMessagesByUserId);
router.post("/send/:id", validateObjectId("id"), sendMessage);

export default router;
