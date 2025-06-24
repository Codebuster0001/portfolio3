import { v2 as cloudinary } from "cloudinary";
import { User } from "../models/UserSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { generateToken } from './../utils/jwtToken.js';

// Register admin (with resume file only)
export const register = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || !req.files.resume) {
    return next(new ErrorHandler("Resume file is required!", 400));
  }

  const resume = req.files.resume;

  const cloudUpload = await cloudinary.uploader.upload(resume.tempFilePath, {
    folder: "PORTFOLIO_RESUME",
  });

  const {
    fullName,
    email,
    phone,
    password,
    portfolioURL,
    githubURL,
    instagramURL,
    linkedInURL,
  } = req.body;

  const user = await User.create({
    fullName,
    email,
    phone,
    password,
    portfolioURL,
    githubURL,
    instagramURL,
    linkedInURL,
    resume: {
      public_id: cloudUpload.public_id,
      url: cloudUpload.secure_url,
    },
  });

  generateToken(user,"User Registered",201,res);
});
