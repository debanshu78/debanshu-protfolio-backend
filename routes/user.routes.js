import { Router } from "express";
import { isSignIn } from "../middlewares/auth.middleware.js";
import { getMe } from "../controllers/user.controller.js";

const router = Router();

router.get("/me", isSignIn, getMe);

export default router;
