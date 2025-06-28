import express from "express";
import {
  sendMessage,
  getAllMessages,
  deleteMessage,
} from "../controller/messageController.js";
import { isAuthenticated  } from "../middlewares/auth.js"; // ✅ Corrected

const router = express.Router();

router.post("/contact", sendMessage); // public
router.get("/getall", isAuthenticated, getAllMessages); // admin only
router.delete("/delete/:id", isAuthenticated, deleteMessage); // admin only

export default router;
