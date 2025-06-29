import { Skill } from "../models/skillSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { ErrorHandler } from "../middlewares/error.js";

// ✅ Add a new skill with uniqueness check
export const addNewSkill = catchAsyncErrors(async (req, res, next) => {
  const { label, iconName, link, color } = req.body;

  if (!label || !iconName || !link) {
    return next(
      new ErrorHandler("Please provide label, iconName, and link", 400)
    );
  }

  const trimmedLabel = label.trim();
  const trimmedIcon = iconName.trim();
  const trimmedLink = link.trim();

  // Check for duplicate label, iconName, or link
  const existing = await Skill.findOne({
    $or: [
      { label: trimmedLabel },
      { iconName: trimmedIcon },
      { link: trimmedLink },
    ],
  });

  if (existing) {
    return next(
      new ErrorHandler("Label, iconName, or link already exists", 409)
    );
  }

  const count = await Skill.countDocuments();

  const skill = await Skill.create({
    label: trimmedLabel,
    iconName: trimmedIcon,
    link: trimmedLink,
    color: color?.trim() || "text-white",
    order: count + 1,
  });

  res.status(201).json({
    success: true,
    message: "Skill added successfully",
    skill,
  });
});

// ✅ Delete skill by schema order number and shift remaining
export const deleteSkillBySchemaOrder = catchAsyncErrors(
  async (req, res, next) => {
    const { order } = req.params;
    const numericOrder = Number(order);

    const skillToDelete = await Skill.findOne({ order: numericOrder });

    if (!skillToDelete) {
      return next(new ErrorHandler(`Skill with order ${order} not found`, 404));
    }

    await skillToDelete.deleteOne();

    // Decrement order for skills after the deleted one
    await Skill.updateMany(
      { order: { $gt: numericOrder } },
      { $inc: { order: -1 } }
    );

    res.status(200).json({
      success: true,
      message: `Skill with order ${order} deleted and reordered.`,
    });
  }
);

// ✅ Get all skills sorted by order
export const getAllSkills = catchAsyncErrors(async (req, res) => {
  const skills = await Skill.find().sort({ order: 1 });

  res.status(200).json({
    success: true,
    skills,
  });
});
