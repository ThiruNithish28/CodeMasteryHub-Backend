import express from "express";
import { signinController, signupController } from "./auth.controller.js";

const router = express.Router();

router.post("/signin", signinController);
router.post("/signup", signupController);

export { router as authRouter };
