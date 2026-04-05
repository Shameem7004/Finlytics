import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { validateRequest, registerSchema, loginSchema } from "../validation/index.js";

const router = express.Router();

// register route
router.post(
        "/register",
        validateRequest(registerSchema),
        register
    );

// login route
router.post(
        "/login",
        validateRequest(loginSchema),        
        login
    );

export default router;