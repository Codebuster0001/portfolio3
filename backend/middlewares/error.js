
export class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Global Error Handling Middleware
export const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Duplicate Key Error (e.g., duplicate email)
  if (err.code === 11000) {
    err = new ErrorHandler(
      `Duplicate field value entered: ${Object.keys(err.keyValue)}`,
      400
    );
  }

  // Invalid JWT
  if (err.name === "JsonWebTokenError") {
    err = new ErrorHandler("Invalid token. Please log in again.", 401);
  }

  // Expired JWT
  if (err.name === "TokenExpiredError") {
    err = new ErrorHandler("Your token has expired. Please log in again.", 401);
  }

  // Mongoose CastError (invalid ObjectId)
  if (err.name === "CastError") {
    err = new ErrorHandler(`Resource not found. Invalid: ${err.path}`, 400);
  }

  // Mongoose Validation Errors
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);
    err = new ErrorHandler(messages.join(", "), 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
