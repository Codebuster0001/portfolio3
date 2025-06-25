import { v2 as cloudinary } from "cloudinary";
import { User } from "../models/UserSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { ErrorHandler } from "../middlewares/error.js";
import { generateToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";

// ✅ Admin Register (with resume upload only)
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

  if (!fullName || !email || !password) {
    return next(
      new ErrorHandler("Full name, email, and password are required", 400)
    );
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler("Email already exists", 409));
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
    isAdmin: true, // ✅ Make this user admin
    resume: {
      public_id: cloudUpload.public_id,
      url: cloudUpload.secure_url,
    },
  });

  generateToken(user, "User Registered", 201, res);
});

// ✅ Login
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Provide Email and Password!", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 404));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  generateToken(user, "Login Successfully!", 200, res);
});

// ✅ Logout
export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out!",
    });
});

// ✅ Get Authenticated User
export const getUser = catchAsyncErrors(async (req, res, next) => {
  if (!req.user || !req.user.id) {
    return next(new ErrorHandler("Not Authenticated!", 401));
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new ErrorHandler("User not found!", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// ✅ Update Profile
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  if (!req.body) {
    return next(new ErrorHandler("No data provided", 400));
  }

  const {
    fullName,
    email,
    phone,
    portfolioURL,
    githubURL,
    instagramURL,
    linkedInURL,
  } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new ErrorHandler("User not found!", 404));
  }

  const newUserData = {
    fullName,
    email,
    phone,
    portfolioURL,
    githubURL,
    instagramURL,
    linkedInURL,
  };

  // ✅ Resume upload
  if (req.files && req.files.resume) {
    const resume = req.files.resume;

    if (user.resume?.public_id) {
      await cloudinary.uploader.destroy(user.resume.public_id);
    }

    const uploadedResume = await cloudinary.uploader.upload(
      resume.tempFilePath,
      {
        folder: "PORTFOLIO_RESUME",
        resource_type: "auto",
      }
    );

    newUserData.resume = {
      public_id: uploadedResume.public_id,
      url: uploadedResume.secure_url,
    };
  }

  const updatedUser = await User.findByIdAndUpdate(req.user._id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Profile Updated!",
    user: updatedUser,
  });
});



// ✅ Update Password Controller
export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  if (!req.body) {
    return next(new ErrorHandler("Request body is missing", 400));
  }

  const { currentPassword, newPassword, confirmNewPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmNewPassword) {
    return next(new ErrorHandler("Please fill all fields.", 400));
  }

  const user = await User.findById(req.user._id).select("+password");

  if (!user) {
    return next(new ErrorHandler("User not found!", 404));
  }

  const isPasswordMatched = await user.comparePassword(currentPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Incorrect current password!", 401));
  }

  if (newPassword !== confirmNewPassword) {
    return next(
      new ErrorHandler("New password and confirm password do not match!", 400)
    );
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password updated successfully!",
  });
});

export const getUserForPortfolio = catchAsyncErrors(async (req, res, next) => {
  const id = "685a7be382e1083f3f615a4c";
  const user = await User.findById(id);
  res.status(200).json({
    success: true,
    user,
  });
});


export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User Not Found!", 404));
  }
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${process.env.DASHBOARD_URL}/password/reset/${resetToken}`;

  const message = `Your Reset Password Token is:- \n\n ${resetPasswordUrl}  \n\n If 
  You've not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Personal Portfolio Dashboard Password Recovery`,
      message,
    });
    res.status(201).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});
