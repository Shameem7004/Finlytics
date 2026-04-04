import express from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = express.Router();

// user register and login routes
router.post("/register", register);
router.post("/login", register);

export default router;