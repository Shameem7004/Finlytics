import express from "express";
import * as userController from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

// Get all users -> Admin Only
router.get(
    "/", 
    authenticate, 
    authorizeRoles("ADMIN"), 
    userController.getUsers
);

// Get user by id -> Admin Only
router.patch(
    "/:id", 
    authenticate, 
    authorizeRoles("ADMIN"), 
    userController.updateUser
);

// Deactivate user -> Admin Only
router.delete(
    "/:id", authenticate, 
    authorizeRoles("ADMIN"), 
    userController.deactivateUser
);

export default router;