import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";

const app = express();

// Database connection
connectDB();

app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world");
});

export default app;
