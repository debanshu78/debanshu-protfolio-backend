import User from "../models/user.model.js";
// import your email utility here

export const generateOTP = () => {
  return bcrypt.hash(
    Math.floor(100000 + Math.random() * 900000).toString(),
    10
  ); // 6-digit OTP
};

export const sendOTP = async (email) => {
  const otp = generateOTP();
  const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

  await User.updateOne({ email }, { otp, otpExpires });

  // Send OTP via email (implement sendEmail utility)
  // await sendEmail(email, `Your OTP is ${otp}`);
  return otp; // For testing, return OTP (remove in production)
};

export const verifyOTP = async (email, otp) => {
  const user = await User.findOne({ email });
  if (user && user.otp && user.otpExpires > new Date()) {
    const isMatch = await bcrypt.compare(otp, user.otp);
    if (isMatch) {
      // Optionally clear OTP after successful verification
      user.otp = undefined;
      user.otpExpires = undefined;
      await user.save();
      return true;
    }
  }
  return false;
};
