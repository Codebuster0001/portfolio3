import express from "express";
import {
  deleteTimeline,
  getTimeline,
  postTimeline,
  updateTimeline,
} from "../controller/timelineController.js";
import { isAuthenticated } from "../middlewares/auth.js"; // ✅ Corrected

const router = express.Router();

router.post("/create", isAuthenticated, postTimeline);
router.get("/getall", getTimeline);
router.delete("/delete/:id", isAuthenticated, deleteTimeline);
router.put("/update/:id", isAuthenticated, updateTimeline);

export default router;
