import express from "express";
import {
  forgotPassword,
  getUser,
  getUserForPortfolio,
  login,
  logout,
  register,
  resetPassword,
  updatePassword,
  updateProfile,
} from "../controller/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/me", isAuthenticated, getUser);
router.put("/me/profile/update", isAuthenticated, updateProfile);
router.get("/portfolio/me", getUserForPortfolio);
router.put("/update/password", isAuthenticated, updatePassword);
router.post("/forgot/password", forgotPassword);
router.put("/password/reset/:token", resetPassword);

export default router;
