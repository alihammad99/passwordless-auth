import jwt from "jsonwebtoken";
import { generateOTP, sendSMS, otpMap } from "../models/otpModel.js";
import { generateResponseToken } from "../views/otpView.js";
import dotenv from "dotenv";
process.env.DOTENV_CONFIG_PATH = "../../../.env";

dotenv.config();
const JWTSECRET = process.env.JWTSECRET;
export const sendOTP = async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    // Generate OTP
    const otp = generateOTP(4); // Specify the desired OTP length

    // Send OTP via SMS
    await sendSMS(phoneNumber, otp);

    // Generate a response token
    const token = generateResponseToken();

    // Store the OTP and token with expiration time
    const expirationTime = Date.now() + 3 * 60 * 60 * 1000; // 3 hours in milliseconds
    otpMap.set(phoneNumber, { otp, token, expiresAt: expirationTime });

    // Schedule deletion of OTP after 3 hours
    setTimeout(() => {
      otpMap.delete(phoneNumber);
    }, 3 * 60 * 60 * 1000); // 3 hours in milliseconds

    res.status(200).json({ message: "OTP sent successfully", otp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

export const verifyOTP = (req, res) => {
  const { phoneNumber, otp } = req.body;

  // Retrieve stored OTP and token
  const storedData = otpMap.get(phoneNumber);

  if (!storedData || storedData.otp !== otp) {
    // OTP verification failed
    res.status(400).json({ error: "Invalid OTP" });
    return;
  }

  // Check if OTP has expired
  if (Date.now() > storedData.expiresAt) {
    otpMap.delete(phoneNumber); // Remove expired OTP data from storage
    res.status(400).json({ error: "OTP has expired" });
    return;
  }

  // OTP verification successful
  otpMap.delete(phoneNumber); // Remove OTP data from storage

  // Generate an access token
  const accessToken = jwt.sign({ phoneNumber }, JWTSECRET, {
    expiresIn: "14d",
  });

  // Send the access token in the response
  res.status(200).json({ message: "OTP verified successfully", accessToken });
};

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Missing access token" });
  }

  jwt.verify(token, JWTSECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid access token" });
    }

    req.user = user;
    next();
  });
};
export const protectedRoute = (req, res) => {
  res.json({ message: "This is a protected route" });
};
