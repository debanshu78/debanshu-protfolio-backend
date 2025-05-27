import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
// import your email utility here

// In-memory store for OTPs (replace with Redis in future)
const otpStore = new Map();

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

export const sendOTP = async (email) => {
  // Check if user exists in DB
  const user = await User.findOne({ email });
  if (!user) {
    // If user doesn't exist, store OTP in memory (or Redis in future)
    const otp = generateOTP();
    const otpExpires = Date.now() + 5 * 60 * 1000; // 5 minutes from now
    const hashedOtp = await bcrypt.hash(otp, 10);
    otpStore.set(email, { otp: hashedOtp, otpExpires });

    // Send OTP via email (implement sendEmail utility)
    // await sendEmail(email, `Your OTP is ${otp}`);
    return otp; // For testing, return OTP (remove in production)
  }
  // If user exists, you can handle accordingly (e.g., update in DB)
  return null;
};

export const verifyOTP = async (email, otp) => {
  // Debug logs
  const record = otpStore.get(email);
  console.log(`Verifying OTP for ${email}:`);
  console.log("Submitted OTP:", otp);
  console.log("Stored OTP record:", record);

  if (
    record &&
    (await bcrypt.compare(otp, record.otp)) &&
    record.otpExpires > Date.now()
  ) {
    otpStore.delete(email); // Remove OTP after successful verification
    console.log("OTP verified successfully.");
    return true;
  }
  console.log("OTP verification failed.");
  return false;
};

// For future Redis use, replace otpStore.get/set/delete with Redis commands.
