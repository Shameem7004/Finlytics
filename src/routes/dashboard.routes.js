import express from "express";
import * as dashboardController from "../controllers/dashboard.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();


// summary is visible for all
router.get(
    "/summary",
    authenticate,
    authorizeRoles("ADMIN", "ANALYST", "VIEWER"),
    dashboardController.getSummary
);

// category breakdown is visible for all
router.get(
    "/categories",
    authenticate,
    authorizeRoles("ADMIN", "ANALYST", "VIEWER"),
    dashboardController.getCategories
);

// trends is visible for all
router.get(
    "/trends",
    authenticate,
    authorizeRoles("ADMIN", "ANALYST", "VIEWER"),
    dashboardController.getTrends
);

// recent activity is visible for all
router.get(
    "/recent",
    authenticate,
    authorizeRoles("ADMIN", "ANALYST", "VIEWER"),
    dashboardController.getRecent
);

export default router;
