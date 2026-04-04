import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

// testing route for Admin 
router.get(
    "/admin", 
    // middleware chains before calling the cotroller callback function
    authenticate,
    authorizeRoles("ADMIN"),
    (req, res) => {
        res.json({ message: "Welcome Admin" });
    }
);

// testing route for Admin + Analyst 
router.get(
    "/analyst", 
    authenticate,
    authorizeRoles("ADMIN", "ANALYST"),
    (req, res) => {
        res.json({ message: "Welcome Analyst/Admin" });
    }
);

// testing route for all viewers
router.get(
    "/viewer", 
    authenticate,
    authorizeRoles("ADMIN", "ANALYST", "VIEWER"),
    (req, res) => {
        res.json({ message: "Welcome All Users" });
    }
);

export default router;