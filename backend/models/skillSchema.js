import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  iconName: {
    type: String,
    required: true,
    // Example: "SiReact", "SiHtml5"
  },
  link: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "text-white",
  },
  order: {
    type: Number,
    default: 0, // To manage display order if needed
  },
});

export const Skill = mongoose.model("Skill", skillSchema);
