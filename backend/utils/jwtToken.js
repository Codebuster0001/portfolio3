export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true for HTTPS
      sameSite: "Lax", // or "None" for cross-site with HTTPS
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
