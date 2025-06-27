import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controller/projectController.js";
import { isAuthenticated } from "../middlewares/auth.js";


const router = express.Router();


// Public
router.get("/getall", getAllProjects);
router.get("/:id", getProjectById);

// Admin Only
router.post("/add",isAuthenticated, createProject);
router.put("/update/:id", isAuthenticated, updateProject);
router.delete("/delete/:id", isAuthenticated, deleteProject);

export default router;
