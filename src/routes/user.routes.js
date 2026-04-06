import express from "express";
import * as userController from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import {
    validateRequest,
    updateUserSchema,
    userIdParamSchema,
    changePasswordSchema
} from "../validation/index.js";

const router = express.Router();

// Get all users -> Admin + Analyst
router.get(
    "/", 
    authenticate, 
    authorizeRoles("ADMIN", "ANALYST"), 
    userController.getUsers
);

// Get current user profile -> All Authenticated Users (VIEWER, ANALYST, ADMIN)
router.get(
    "/me", 
    authenticate, 
    userController.getMe
);

// Get single user by ID -> Admin + Analyst
router.get(
    "/:id",
    authenticate,
    authorizeRoles("ADMIN", "ANALYST"),
    validateRequest(userIdParamSchema, "params"),
    userController.getUserById
);


// Change password -> All Authenticated Users
router.patch(
    "/change-password",
    authenticate,
    validateRequest(changePasswordSchema),
    userController.changePassword
);

// Update user -> Admin Only
router.patch(
    "/:id", 
    authenticate, 
    authorizeRoles("ADMIN"), 
    validateRequest(userIdParamSchema, "params"), 
    validateRequest(updateUserSchema),
    userController.updateUser
);

// Deactivate user -> Admin Only
router.delete(
    "/:id", authenticate, 
    authorizeRoles("ADMIN"),
    validateRequest(userIdParamSchema, "params"), 
    userController.deactivateUser
);

export default router;