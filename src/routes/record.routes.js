import express from "express";
import * as recordController from "../controllers/record.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();


// create -> Admin Only
router.post(
    "/",
    authenticate,
    authorizeRoles("ADMIN"),
    recordController.create
);

// get all -> Analyst + Viewer + Admin
router.get(
    "/",
    authenticate,
    authorizeRoles("ADMIN", "ANALYST", "VIEWER"),
    recordController.getAll
);

// get one
router.get(
    "/:id",
    authenticate,
    authorizeRoles("ADMIN", "ANALYST", "VIEWER"),
    recordController.getOne
)

// update -> Admin Only
router.patch(
    "/:id",
    authenticate,
    authorizeRoles("ADMIN"),
    recordController.update
);

// delete -> Admin Only
router.delete(
    "/:id",
    authenticate,
    authorizeRoles("ADMIN"),
    recordController.remove
);

export default router;