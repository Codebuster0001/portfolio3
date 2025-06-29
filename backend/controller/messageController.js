// backend/controllers/messageController.js
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { ErrorHandler } from "../middlewares/error.js";
import { Message } from "../models/messageSchema.js";
import { sendEmail } from "../utils/sendEmail.js";

// Send message (public)
export const sendMessage = catchAsyncErrors(async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  const newMessage = await Message.create({ name, email, message });

  // Admin Alert
  await sendEmail({
    email: process.env.SMPT_MAIL,
    subject: `📬 New Contact Message from ${name}`,
    message: `You received a new message:\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
  });

  // Auto-reply
  await sendEmail({
    email,
    subject: `👋 Thank you for contacting Deepak Kushwaha`,
    message: `Hi ${name},\n\nThank you for your message! I’ve received it and will get back to you soon.\n\nYou wrote:\n"${message}"\n\nRegards,\nDeepak Kushwaha`,
  });

  res.status(201).json({
    success: true,
    message: "Message sent successfully!",
    data: newMessage,
  });
});

// Admin: Get all messages
export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json({ success: true, messages });
});

// Admin: Delete message
export const deleteMessage = catchAsyncErrors(async (req, res, next) => {
  const message = await Message.findById(req.params.id);

  if (!message) {
    return next(new ErrorHandler("Message not found", 404));
  }

  await message.deleteOne();

  res.status(200).json({
    success: true,
    message: "Message deleted successfully",
  });
});
