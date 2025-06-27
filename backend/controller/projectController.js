import { Project } from "../models/projectSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { ErrorHandler } from "../middlewares/error.js";
import { v2 as cloudinary } from "cloudinary";

// CREATE
export const createProject = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    longDescription,
    challenges,
    learnings,
    githubUrl,
    demoUrl,
    role,
    technologies,
    type,
  } = req.body;

  const files = req.files?.images || [];
  const imageFiles = Array.isArray(files) ? files : [files];

  const uploadedImages = await Promise.all(
    imageFiles.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "portfolio/projects",
      });
      return { url: result.secure_url, public_id: result.public_id };
    })
  );

  const project = await Project.create({
    name,
    longDescription,
    challenges: JSON.parse(challenges || "[]"),
    learnings: JSON.parse(learnings || "[]"),
    githubUrl,
    demoUrl,
    role,
    technologies: JSON.parse(technologies || "[]"),
    type,
    images: uploadedImages,
  });

  res.status(201).json({
    success: true,
    message: "Project created successfully!",
    project,
  });
});

// READ ALL
export const getAllProjects = catchAsyncErrors(async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, projects });
});

// READ ONE
export const getProjectById = catchAsyncErrors(async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  if (!project) return next(new ErrorHandler("Project not found", 404));
  res.status(200).json({ success: true, project });
});

// UPDATE
// UPDATE PROJECT
export const updateProject = catchAsyncErrors(async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  if (!project) return next(new ErrorHandler("Project not found", 404));

  // Extract fields from body
  const {
    name,
    longDescription,
    challenges,
    learnings,
    githubUrl,
    demoUrl,
    role,
    technologies,
    type,
  } = req.body;

  // Extract uploaded files
  const files = req.files?.images || [];
  const imageFiles = Array.isArray(files) ? files : [files];

  // If new images are uploaded, remove old ones from Cloudinary and upload new ones
  let uploadedImages = project.images;

  if (imageFiles.length > 0 && imageFiles[0]) {
    // Delete old images from Cloudinary
    await Promise.all(
      uploadedImages.map(async (img) => {
        if (img.public_id) {
          await cloudinary.uploader.destroy(img.public_id);
        }
      })
    );

    // Upload new images
    uploadedImages = await Promise.all(
      imageFiles.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "portfolio/projects",
        });
        return { url: result.secure_url, public_id: result.public_id };
      })
    );
  }

  // Safely update only fields that are provided
  if (typeof name !== "undefined") project.name = name;
  if (typeof longDescription !== "undefined")
    project.longDescription = longDescription;
  if (typeof challenges !== "undefined") {
    try {
      project.challenges = JSON.parse(challenges);
    } catch (e) {
      return next(new ErrorHandler("Invalid challenges format", 400));
    }
  }
  if (typeof learnings !== "undefined") {
    try {
      project.learnings = JSON.parse(learnings);
    } catch (e) {
      return next(new ErrorHandler("Invalid learnings format", 400));
    }
  }
  if (typeof githubUrl !== "undefined") project.githubUrl = githubUrl;
  if (typeof demoUrl !== "undefined") project.demoUrl = demoUrl;
  if (typeof role !== "undefined") project.role = role;
  if (typeof technologies !== "undefined") {
    try {
      project.technologies = JSON.parse(technologies);
    } catch (e) {
      return next(new ErrorHandler("Invalid technologies format", 400));
    }
  }
  if (typeof type !== "undefined") project.type = type;
  project.images = uploadedImages;

  // Save updated project
  await project.save();

  res.status(200).json({
    success: true,
    message: "Project updated successfully",
    project,
  });
});

// DELETE
export const deleteProject = catchAsyncErrors(async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  if (!project) return next(new ErrorHandler("Project not found", 404));

  // Optional: Delete images from Cloudinary
  await Promise.all(
    project.images.map(async (img) => {
      if (img.public_id) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    })
  );

  await project.deleteOne();

  res
    .status(200)
    .json({ success: true, message: "Project deleted successfully" });
});
