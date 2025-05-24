import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/auth.routes.js"; // Import the auth routes

const app = express();

// Database connection
connectDB();

const version = process.env.API_VERSION || "v1"; // API version

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.send("API is healthy");
});

// Routes
app.use(`/api/${version}/auth`, authRouter);

export default app;
