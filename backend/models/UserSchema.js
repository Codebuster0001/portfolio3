import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto"; 
// models/UserSchema.js
const userSchema = new mongoose.Schema({
  fullName: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: String,
  password: {
    type: String,
    required: true,
    select: false,
  },
  resume: {
    public_id: String,
    url: String,
  },
  portfolioURL: String,
  githubURL: String,
  instagramURL: String,
  linkedInURL: String,

  isAdmin: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

userSchema.methods.getResetPasswordToken = function () {
  //Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //Hashing and Adding Reset Password Token To UserSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //Setting Reset Password Token Expiry Time
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

export const User = mongoose.model("User", userSchema);
