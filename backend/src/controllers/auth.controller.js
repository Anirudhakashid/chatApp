import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { generateToken } from "../utils/generateToken.js";
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { welcomeEmail } from "../emails/emailHandler.js";
import { ENV } from "../lib/env.js";

const signup = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  const trimmedData = {
    fullName: fullName?.trim(),
    email: email?.trim()?.toLowerCase(),
    password: password?.trim(),
  };

  if (!trimmedData.fullName || !trimmedData.email || !trimmedData.password) {
    throw new ApiError(400, "All fields are necessary");
  }

  if (trimmedData.password.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters long");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedData.email)) {
    throw new ApiError(400, "Invalid email format");
  }

  const existingUser = await User.findOne({ email: trimmedData.email });
  if (existingUser) {
    throw new ApiError(409, "Email already exists");
  }

  //hashing password before saving to database
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create entry in the db
  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
  });

  const userResponse = user.toObject();
  delete userResponse.password;

  generateToken(user._id, res);

  const emailResponse = await welcomeEmail(
    userResponse.email,
    userResponse.fullName,
    ENV.CLIENT_URL
  );

  if (!emailResponse.id) {
    throw new ApiError(500, "Failed to send welcome email");
  } else {
    console.log("Welcome email sent successfully to " + userResponse.email);
  }

  return res
    .status(201)
    .json(new ApiResponse(201, userResponse, "User created successfully"));
});

export { signup };
