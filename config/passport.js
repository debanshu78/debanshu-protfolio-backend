import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { findOrCreateSocialUser } from "../services/user.service.js";

// Local
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) return done(null, false, { message: "Incorrect email." });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return done(null, false, { message: "Incorrect password." });
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await findOrCreateSocialUser({
          name: profile.displayName,
          email: profile.emails[0].value,
          provider: "google",
          providerId: profile.id,
        });
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// GitHub
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/api/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await findOrCreateSocialUser({
          name: profile.displayName || profile.username,
          email: profile.emails[0].value,
          provider: "github",
          providerId: profile.id,
        });
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// LinkedIn
passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: "/api/auth/linkedin/callback",
      scope: ["r_emailaddress", "r_liteprofile"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await findOrCreateSocialUser({
          name: profile.displayName,
          email: profile.emails[0].value,
          provider: "linkedIn",
          providerId: profile.id,
        });
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
