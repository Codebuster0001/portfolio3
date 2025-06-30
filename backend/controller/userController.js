import { v2 as cloudinary } from "cloudinary";
import { User } from "../models/UserSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { ErrorHandler } from "../middlewares/error.js";
import { generateToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";

// Register
export const register = catchAsyncErrors(async (req, res, next) => {
  const resumeFile = req.files?.resume;

  const {
    fullName,
    email,
    phone,
    password,
    portfolioURL,
    githubURL,
    instagramURL,
    linkedInURL,
    description,
    technologies,
  } = req.body;

  if (!fullName || !email || !password) {
    return next(
      new ErrorHandler("Full name, email, and password are required", 400)
    );
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) return next(new ErrorHandler("Email already exists", 409));

  let resume = {};
  if (resumeFile) {
    const uploaded = await cloudinary.uploader.upload(resumeFile.tempFilePath, {
      folder: "PORTFOLIO_RESUME",
    });
    resume = {
      public_id: uploaded.public_id,
      url: uploaded.secure_url,
    };
  }

  const user = await User.create({
    fullName,
    email,
    phone,
    password,
    portfolioURL,
    githubURL,
    instagramURL,
    linkedInURL,
    resume,
    description,
    technologies,
  });

  generateToken(user, "User Registered", 201, res);
});

// Login
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new ErrorHandler("Provide Email and Password!", 400));

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password)))
    return next(new ErrorHandler("Invalid Email or Password", 401));

  generateToken(user, "Login Successful", 200, res);
});

// Logout
export const logout = catchAsyncErrors(async (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .status(200)
    .json({ success: true, message: "Logged Out!" });
});

// Get Current User
export const getUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) return next(new ErrorHandler("User not found!", 404));

  res.status(200).json({ success: true, user });
});

// Update Profile (Partial)
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) return next(new ErrorHandler("User not found!", 404));

  const fields = [
    "fullName",
    "email",
    "phone",
    "portfolioURL",
    "githubURL",
    "instagramURL",
    "linkedInURL",
    "description",
    "technologies",
  ];

  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      // ✅ Clean technologies array
      if (field === "technologies") {
        let techValue = req.body.technologies;
        if (typeof techValue === "string") {
          try {
            // Attempt JSON parse first (if sent like '["React","Node.js"]')
            techValue = JSON.parse(techValue);
          } catch {
            // Otherwise fallback to comma-split
            techValue = techValue.split(",").map((t) => t.trim());
          }
        }
        user.technologies = Array.isArray(techValue) ? techValue : [];
      } else {
        user[field] = req.body[field];
      }
    }
  });

  // Resume Upload
  if (req.files?.resume) {
    if (user.resume?.public_id) {
      await cloudinary.uploader.destroy(user.resume.public_id);
    }

    const uploaded = await cloudinary.uploader.upload(
      req.files.resume.tempFilePath,
      {
        folder: "PORTFOLIO_RESUME",
        resource_type: "auto",
      }
    );

    user.resume = {
      public_id: uploaded.public_id,
      url: uploaded.secure_url,
    };
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile Updated!",
    user,
  });
});

// Update Password
export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;

  const user = await User.findById(req.user._id).select("+password");
  if (!user) return next(new ErrorHandler("User not found!", 404));
  if (!(await user.comparePassword(currentPassword)))
    return next(new ErrorHandler("Incorrect current password!", 401));
  if (newPassword !== confirmNewPassword)
    return next(new ErrorHandler("Passwords do not match!", 400));

  user.password = newPassword;
  await user.save();

  res
    .status(200)
    .json({ success: true, message: "Password updated successfully!" });
});

// Forgot Password
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new ErrorHandler("User Not Found!", 404));

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.DASHBOARD_URL}/password/reset/${resetToken}`;
  const message = `Reset password using this link:\n\n${resetUrl}\n\nIf not requested, ignore.`;

  try {
    await sendEmail({ email: user.email, subject: "Password Reset", message });
    res
      .status(200)
      .json({ success: true, message: `Reset link sent to ${user.email}` });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler("Email could not be sent", 500));
  }
});

// Reset Password
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const tokenHash = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken: tokenHash,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user)
    return next(new ErrorHandler("Invalid or expired reset token", 400));
  if (req.body.password !== req.body.confirmPassword)
    return next(new ErrorHandler("Passwords do not match", 400));

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  generateToken(user, "Password Reset Successful", 200, res);
});

// Get Public Portfolio User
export const getUserForPortfolio = catchAsyncErrors(async (req, res) => {
  const id = "68611f69ceccc56a133576b5"; // Update this as needed
  const user = await User.findById(id);
  res.status(200).json({ success: true, user });
});
