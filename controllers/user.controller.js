import * as userService from "../services/user.service.js";
import jwt from "jsonwebtoken";

// Local sign up
export const signUp = async (req, res) => {
  try {
    const user = await userService.signUp(req.body);
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Local sign in (with passport)
export const signIn = (req, res) => {
  // req.user is set by passport
  const token = jwt.sign(
    { id: req.user._id, email: req.user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  res.cookie("token", token, {
    // httpOnly: true,
    secure: process.env.NODE_ENV === "production", // set true in production
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
  res.json({ token, user: req.user });
};

// Social sign in/up (with passport)
export const socialAuth = (req, res) => {
  // req.user is set by passport
  const token = jwt.sign(
    { id: req.user._id, email: req.user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  res.json({ token, user: req.user });
};
