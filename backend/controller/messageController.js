import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { ErrorHandler } from "../middlewares/error.js";

import { Message } from "../models/messageSchema.js";

// Send message (public)
export const sendMessage = catchAsyncErrors(async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return next(new ErrorHandler("All fields are required", 400)); // ✅ FIXED
  }

  const newMessage = await Message.create({ name, email, message });

  res.status(201).json({
    success: true,
    message: "Message sent successfully!",
    data: newMessage,
  });
});

// Get all messages (admin only)
export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json({
    success: true,
    messages,
  });
});

// Delete message (admin only)
export const deleteMessage = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const message = await Message.findById(id);

  if (!message) {
    return next(new ErrorHandler("Message not found or already deleted", 404)); // ✅ FIXED
  }

  await message.deleteOne();

  res.status(200).json({
    success: true,
    message: "Message deleted successfully",
  });
});
