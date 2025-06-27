import express from "express";
import {
  postTimeline,
  getTimeline,
  deleteTimeline,
} from "../controller/timelineController.js";
import {  isAuthenticated  } from "../middlewares/auth.js"; // ✅ Corrected

const router = express.Router();

router.post("/add",isAuthenticated,postTimeline ); // public
router.get("/getall",  getTimeline ); // admin only
router.delete("/delete/:id", isAuthenticated, deleteTimeline); // admin only

export default router;
