import * as userService from "../services/user.service.js";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";
import User from "../models/user.model.js";

// Local sign up
export const signUp = async (req, res) => {
  try {
    const user = await userService.signUp(req.body);
    logger.info(`User signed up: ${user.email}`);
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    logger.error(`Sign up failed for ${req.body.email}: ${err.message}`);
    res.status(400).json({ error: err.message });
  }
};

// Local sign in (with passport)
export const signIn = (req, res) => {
  try {
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("token", token, {
      // httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    logger.info(`User signed in: ${req.user.email}`);
    res.json({ token, user: req.user });
  } catch (err) {
    logger.error(`Sign in failed for ${req.user?.email}: ${err.message}`);
    res.status(500).json({ error: "Sign in failed" });
  }
};

// Social sign in/up (with passport)
export const socialAuth = (req, res) => {
  try {
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    logger.info(`Social auth successful for: ${req.user.email}`);
    res.json({ token, user: req.user });
  } catch (err) {
    logger.error(`Social auth failed for ${req.user?.email}: ${err.message}`);
    res.status(500).json({ error: "Social authentication failed" });
  }
};

// Fetch current user's details
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      logger.error(`User not found: ${req.user.id}`);
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    logger.error(`Failed to fetch user details for ${req.user.id}: ${err.message}`);
    res.status(500).json({ message: "Failed to fetch user details" });
  }
};
