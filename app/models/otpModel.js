import axios from "axios";
import dotenv from "dotenv";
process.env.DOTENV_CONFIG_PATH = "../../../.env";

dotenv.config();
const d7networksBearerToken = process.env.D7NETWORKS_BEARER_TOKEN;

// In-memory storage for OTP and tokens
export const otpMap = new Map();

// Function to generate OTP
export const generateOTP = (length) => {
  console.log("Token:" + d7networksBearerToken);
  const otp = Math.floor(
    Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
  );
  return otp.toString().padStart(length, "0");
};

// Function to send SMS via D7networks API
export const sendSMS = async (phoneNumber, otp) => {
  const data = JSON.stringify({
    messages: [
      {
        channel: "sms",
        recipients: [phoneNumber],
        content: `Your OTP is: ${otp}`,
        msg_type: "text",
        data_coding: "text",
      },
    ],
    message_globals: {
      originator: "SignOTP",
      report_url: "https://the_url_to_recieve_delivery_report.com",
    },
  });

  const config = {
    method: "post",
    url: "https://api.d7networks.com/messages/v1/send",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${d7networksBearerToken}`,
    },
    data: data,
  };

  await axios(config);
};
