import * as otpService from "../services/otp.service.js";

export const requestOTP = async (req, res) => {
  const { email } = req.body;
  // Optionally, check if user exists
  const otp = await otpService.sendOTP(email);
  res.json({ message: "OTP sent", otp }); // Remove OTP from response in production!
};

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const valid = await otpService.verifyOTP(email, otp);
  if (valid) {
    res.json({ message: "OTP verified" });
  } else {
    res.status(400).json({ message: "Invalid or expired OTP" });
  }
};
