import { Router } from "express";
import passport from "passport";
import * as userController from "../controllers/user.controller.js";
import * as otpController from "../controllers/otp.controller.js";

const router = Router();

// Local sign up
router.post("/signup", userController.signUp);

// Local sign in
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  userController.signIn
);

// Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  userController.socialAuth
);

// GitHub
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
router.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: "/login",
  }),
  userController.socialAuth
);

// LinkedIn
router.get(
  "/linkedin",
  passport.authenticate("linkedin", {
    scope: ["r_emailaddress", "r_liteprofile"],
  })
);
router.get(
  "/linkedin/callback",
  passport.authenticate("linkedin", {
    session: false,
    failureRedirect: "/login",
  }),
  userController.socialAuth
);

router.post("/otp/request", otpController.requestOTP);
router.post("/otp/verify", otpController.verifyOTP);

export default router;
