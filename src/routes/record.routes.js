import express from "express";
import * as recordController from "../controllers/record.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { validateRequest, createRecordSchema, updateRecordSchema } from "../validation/index.js";

const router = express.Router();


// create -> Admin Only
router.post(
    "/",
    authenticate,
    authorizeRoles("ADMIN"),
    validateRequest(createRecordSchema),
    recordController.create
);

// get all -> Analyst + Admin
router.get(
    "/",
    authenticate,
    authorizeRoles("ADMIN", "ANALYST"),
    recordController.getAll
);

// get one
router.get(
    "/:id",
    authenticate,
    authorizeRoles("ADMIN", "ANALYST"),
    recordController.getOne
);

// update -> Admin Only
router.patch(
    "/:id",
    authenticate,
    authorizeRoles("ADMIN"),
    validateRequest(updateRecordSchema),
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