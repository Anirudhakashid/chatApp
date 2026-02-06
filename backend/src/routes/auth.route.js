import express from "express";
import {
  signup,
  login,
  logout,
  updateProfile,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const router = express.Router();

router.use(arcjetProtection);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", verifyJWT, logout);

router.put("/update-profile", verifyJWT, updateProfile);

router.get("/check", verifyJWT, (req, res) => {
  const user = {
    _id: req.user._id,
    fullName: req.user.fullName,
    email: req.user.email,
    profilePic: req.user.profilePic,
  };
  return res.status(200).json(new ApiResponse(200, user, "User verified"));
});

export default router;
