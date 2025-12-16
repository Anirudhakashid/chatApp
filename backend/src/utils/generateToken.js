import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, //in ms
    httpOnly: true, //prevent XSS attacks
    sameSite: "strict", //CSRF protection
    secure: process.env.NODE_ENV === "production", //set to true only in production
  });

  return token;
};
