import express from "express";
import {
  sendOTP,
  verifyOTP,
  verifyToken,
  protectedRoute,
} from "./controllers/otpController.js";

const router = express.Router();

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.get("/protected", verifyToken, protectedRoute);

export default router;
