import * as otpService from "../services/otp.service.js";

export const requestOTP = async (req, res) => {
  const { email } = req.body;
  try {
    const otp = await otpService.sendOTP(email);
    if (otp) {
      console.log(`OTP for ${email}: ${otp}`);
      res.json({ message: "OTP sent" }); // Do NOT send OTP in response in production
    } else {
      res.status(400).json({ message: "User already exists or OTP not sent" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to send OTP", error: err.message });
  }
};

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const valid = await otpService.verifyOTP(email, otp);
    if (valid) {
      res.json({ message: "OTP verified" });
    } else {
      res.status(400).json({ message: "Invalid or expired OTP" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "OTP verification failed", error: err.message });
  }
};
