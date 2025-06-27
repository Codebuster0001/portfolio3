import { Skill } from "../models/skillSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { ErrorHandler } from "../middlewares/error.js";

// ✅ Add a new skill
export const addNewSkill = catchAsyncErrors(async (req, res, next) => {
  const { label, iconName, link, color, order } = req.body;

  if (!label || !iconName || !link) {
    return next(
      new ErrorHandler("Please provide label, iconName, and link", 400)
    );
  }

  const skill = await Skill.create({
    label,
    iconName,
    link,
    color,
    order,
  });

  res.status(201).json({
    success: true,
    message: "Skill added successfully",
    skill,
  });
});

// ✅ Get all skills
export const getAllSkills = catchAsyncErrors(async (req, res, next) => {
  const skills = await Skill.find().sort({ order: 1 });

  if (!skills || skills.length === 0) {
    return next(new ErrorHandler("No skills found", 404));
  }

  res.status(200).json({
    success: true,
    skills,
  });
});

// ✅ Update a skill
export const updateSkill = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const updatedSkill = await Skill.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedSkill) {
    return next(new ErrorHandler("Skill not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Skill updated successfully",
    skill: updatedSkill,
  });
});

// ✅ Delete a skill
export const deleteSkill = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const skill = await Skill.findById(id);
  if (!skill) {
    return next(new ErrorHandler("Skill not found", 404));
  }

  await skill.deleteOne();

  res.status(200).json({
    success: true,
    message: "Skill deleted successfully",
  });
});
