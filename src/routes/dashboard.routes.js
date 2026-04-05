import express from "express";
import * as dashboardController from "../controllers/dashboard.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();


// dashboard is visible for all
router.get(
    "/summary",
    authenticate,
    authorizeRoles("ADMIN", "ANALYST", "VIEWER"),
    dashboardController.getSummary
);

router.get(
    "/categories",
    authenticate,
    authorizeRoles("ADMIN", "ANALYST", "VIEWER"),
    dashboardController.getCategories
);

router.get(
    "/trends",
    authenticate,
    authorizeRoles("ADMIN", "ANALYST", "VIEWER"),
    dashboardController.getTrends
);

export default router;
