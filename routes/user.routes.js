import { Router } from "express";
import { getMe } from "../controllers/user.controller.js";
import { isSignIn } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/me", isSignIn, getMe);

export default router;
