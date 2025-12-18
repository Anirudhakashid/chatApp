import express from "express";
import {
  signup,
  login,
  logout,
  updateProfile,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();

router.use(arcjetProtection);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", verifyJWT, logout);

router.put("/update-profile", verifyJWT, updateProfile);

router.get("/check", verifyJWT, (req, res) => res.status(200).json(req.user));

export default router;
