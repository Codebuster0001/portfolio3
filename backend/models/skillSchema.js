import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    unique: true, // Ensures label is not repeated
    trim: true,
  },
  iconName: {
    type: String,
    required: true,
    unique: true, // Ensures icon is not repeated
    trim: true,
  },
  link: {
    type: String,
    required: true,
    unique: true, // Ensures link is not repeated
    trim: true,
  },
  color: {
    type: String,
    default: "text-white",
    trim: true,
  },
  order: {
    type: Number,
    default: 0,
    unique: true, // Prevents multiple same order values
  },
});

// Create the model
export const Skill = mongoose.model("Skill", skillSchema);
