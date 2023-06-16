import crypto from "crypto";

// Function to generate response token
export const generateResponseToken = () => {
  const token = crypto.randomBytes(16).toString("hex");
  return token;
};
