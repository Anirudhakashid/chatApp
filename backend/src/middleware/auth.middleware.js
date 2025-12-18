import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { ENV } from "../lib/env.js";
import User from "../models/user.models.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // Check Authorization header for devices that don't support cookies like mobile apps
    // it is in the fromat of Bearer <token>, we just need the token part
    const token =
      req.cookies?.jwt || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(401, "Unauthorized access: no token provided");
    }

    const verifiedToken = jwt.verify(token, ENV.JWT_SECRET);

    const user = await User.findById(verifiedToken.userId).select("-password");
    if (!user) {
      throw new ApiError(401, "Unauthorized access: user not found");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Unauthorized access");
  }
});
