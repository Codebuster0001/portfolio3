import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minLength: [2, "Name must be at least 2 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    minLength: [5, "Email must be valid"],
  },
  message: {
    type: String,
    required: [true, "Message is required"],
    minLength: [2, "Message must be at least 2 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 * 30, // 🧹 auto-delete after 30 days (30 * 24h * 60m * 60s)
  },
});

export const Message = mongoose.model("Message", messageSchema);
