export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    })
    .json({
      success: true,
      user,
      message,
    });
};