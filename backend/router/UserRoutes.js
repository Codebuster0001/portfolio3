import express from "express";
import {
  forgotPassword,
  getUser,
  getUserForPortfolio,
  login,
  logout,
  register,
  updatePassword,
  updateProfile,
} from "../controller/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// ✅ Register new admin user
router.post("/register", register);

// ✅ Login
router.post("/login", login);

// ✅ Logout (only accessible if authenticated)
router.get("/logout", isAuthenticated, logout);

// ✅ Get currently authenticated user details
router.get("/me", isAuthenticated, getUser);

// ✅ Update profile of the logged-in user
router.put("/update/me", isAuthenticated, updateProfile);

router.put("/update/password", isAuthenticated, updatePassword);
router.get("/me/portfolio", getUserForPortfolio);
router.post("/forgot/password",isAuthenticated, forgotPassword);

export default router;
