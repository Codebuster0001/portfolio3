import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
    required: true,
  },
  challenges: [String],
  learnings: [String],
  role: String,
  technologies: [String],
  type: {
    type: String,
    enum: ["web", "mobile", "desktop", "fullstack", "api", "design"],
    default: "web",
  },
  githubUrl: String,
  demoUrl: String,
  images: [
    {
      url: {
        type: String,
        required: true,
      },
      public_id: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Project = mongoose.model("Project", projectSchema);
