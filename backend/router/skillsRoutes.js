// router/skillsRoutes.js
import express from "express";
import {
  addNewSkill,
  getAllSkills,
  deleteSkillBySchemaOrder,
} from "../controller/skillController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// ✅ Add new skill (auto-increment order & prevent duplicates)
router.post("/add", isAuthenticated, addNewSkill);

// ✅ Get all skills sorted by order
router.get("/getall", getAllSkills);

// ✅ Delete skill by order (not ID) & reorder others
router.delete("/delete/:order", isAuthenticated, deleteSkillBySchemaOrder);

export default router;
