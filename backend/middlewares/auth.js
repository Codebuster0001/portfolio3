import { User } from "../models/UserSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import { ErrorHandler } from "../middlewares/error.js";


import jwt from "jsonwebtoken";

// ✅ Check if user is logged in
export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token =
    req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return next(new ErrorHandler("User not authenticated!", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findById(decoded.id);

  if (!user) {
    return next(new ErrorHandler("User does not exist!", 404));
  }

  req.user = user;
  next();
});

export const isAdmin = catchAsyncErrors((req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return next(new ErrorHandler("Admin access only!", 403));
  }
  next();
});
