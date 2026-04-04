import express from "express";
import {
    create,
    getAll,
    getOne,
    update,
    remove
} from "../controllers/record.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

// create -> Admin Only
router.post(
    "/",
    authenticate,
    authorizeRoles("ADMIN"),
    create
);

// get all -> Analyst + Viewer + Admin
router.get(
    "/",
    authenticate,
    authorizeRoles("ADMIN", "ANALYST", "VIEWER"),
    getAll
);

// get one
router.get(
    "/:id",
    authenticate,
    authorizeRoles("ADMIN", "ANALYST", "VIEWER"),
    getOne
)

// update -> Admin Only
router.patch(
    "/:id",
    authenticate,
    authorizeRoles("ADMIN"),
    update
);

// delete -> Admin Only
router.delete(
    "/:id",
    authenticate,
    authorizeRoles("ADMIN"),
    remove
);

export default router;