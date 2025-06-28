import { Timeline } from "../models/timelineSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { ErrorHandler } from "../middlewares/error.js";

// ✅ POST: Create a new timeline entry (admin only)
export const postTimeline = catchAsyncErrors(async (req, res, next) => {
  const { year, title, description } = req.body || {}; // ← fallback to empty object

  if (!year || !title || !description) {
    return next(
      new ErrorHandler(
        "All fields (year, title, description) are required",
        400
      )
    );
  }

  const newTimeline = await Timeline.create({ year, title, description });

  res.status(201).json({
    success: true,
    message: "Timeline created successfully",
    timeline: newTimeline,
  });
});

// ✅ GET: Fetch all timeline entries (public)
export const getTimeline = catchAsyncErrors(async (req, res, next) => {
  const timeline = await Timeline.find().sort({ year: 1 });

  if (!timeline || timeline.length === 0) {
    return next(new ErrorHandler("No timeline found", 404));
  }

  res.status(200).json({
    success: true,
    timeline,
  });
});


// ✅ DELETE: Delete timeline entry by ID (admin only)
export const deleteTimeline = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const timelineEntry = await Timeline.findById(id);

  if (!timelineEntry) {
    return next(new ErrorHandler("Timeline entry not found", 404));
  }

  await timelineEntry.deleteOne();

  res.status(200).json({
    success: true,
    message: "Timeline entry deleted successfully",
  });
});


// ✅ PUT: Update a timeline entry by ID (admin only)
export const updateTimeline = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { year, title, description } = req.body;

  const timelineEntry = await Timeline.findById(id);
  if (!timelineEntry) {
    return next(new ErrorHandler("Timeline entry not found", 404));
  }

  timelineEntry.year = year || timelineEntry.year;
  timelineEntry.title = title || timelineEntry.title;
  timelineEntry.description = description || timelineEntry.description;

  await timelineEntry.save();

  res.status(200).json({
    success: true,
    message: "Timeline entry updated successfully",
    timeline: timelineEntry,
  });
});

