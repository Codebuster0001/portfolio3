// models/timelineSchema.js
import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema({
  year: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Timeline = mongoose.model("Timeline", timelineSchema);
