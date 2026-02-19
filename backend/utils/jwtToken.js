export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      secure: true,          // REQUIRED on HTTPS
      sameSite: "none",     // REQUIRED for Vercel ↔ Render
      maxAge:
        process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    })
    .json({
      success: true,
      user,
      message,
      token,
    });
};
