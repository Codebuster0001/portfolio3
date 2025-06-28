export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax", // or "None" + secure: true if cross-domain
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
