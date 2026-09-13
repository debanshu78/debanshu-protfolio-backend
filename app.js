import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import "./config/passport.js";
import authRouter from "./routes/auth.routes.js"; // Import the auth routes
import userRouter from "./routes/user.routes.js"; // Import the user routes

const app = express();

// Database connection
connectDB();

const version = process.env.API_VERSION || "v1"; // API version

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true, // Allow cookies to be sent
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.send("API is healthy");
});

// Routes
app.use(`/api/${version}/auth`, authRouter);
app.use(`/api/${version}/user`, userRouter);

export default app;
