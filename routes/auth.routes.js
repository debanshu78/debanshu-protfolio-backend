import { Router } from 'express';
import passport from 'passport';
import * as authController from '../controllers/auth.controller.js';
import * as otpController from '../controllers/otp.controller.js';
import { validateSignUp } from '../middlewares/validate.middleware.js';

const router = Router();

// Local sign up
router.post('/signup', validateSignUp, authController.signUp);

// Local sign in
router.post('/signin', passport.authenticate('local', { session: false }), authController.signIn);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/login',
  }),
  authController.socialAuth
);

// GitHub OAuth
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get(
  '/github/callback',
  passport.authenticate('github', {
    session: false,
    failureRedirect: '/login',
  }),
  authController.socialAuth
);

// LinkedIn OAuth
router.get(
  '/linkedin',
  passport.authenticate('linkedin', {
    scope: ['r_emailaddress', 'r_liteprofile'],
  })
);
router.get(
  '/linkedin/callback',
  passport.authenticate('linkedin', {
    session: false,
    failureRedirect: '/login',
  }),
  authController.socialAuth
);

// OTP routes
router.post('/otp/request', otpController.requestOTP);
router.post('/otp/verify', otpController.verifyOTP);

// Logout route
router.post('/logout', authController.logout);

export default router;
