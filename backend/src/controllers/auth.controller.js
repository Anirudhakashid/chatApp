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
  const hashedPassword = await bcrypt.hash(trimmedData.password, salt);

  //create entry in the db
  const user = await User.create({
    fullName: trimmedData.fullName,
    email: trimmedData.email,
    password: hashedPassword,
  });

  const userResponse = user.toObject();
  delete userResponse.password;

  generateToken(user._id, res);

  try {
    await welcomeEmail(
      userResponse.email,
      userResponse.fullName,
      ENV.CLIENT_URL
    );
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }

  return res
    .status(201)
    .json(new ApiResponse(201, userResponse, "User created successfully"));
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const trimmedData = {
    email: email?.trim()?.toLowerCase(),
    password: password?.trim(),
  };

  if (!trimmedData.email || !trimmedData.password) {
    throw new ApiError(400, "All fields are necessary");
  }

  const user = await User.findOne({ email: trimmedData.email });
  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(
    trimmedData.password,
    user.password
  );
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  generateToken(user._id, res);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      },
      "Login successful"
    )
  );
});

const logout = asyncHandler((_, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  return res.status(200).json(new ApiResponse(200, {}, "Logout successfully"));
});

export { signup, login, logout };
