import express from "express";

import { createPrescription, getPrescriptions, getPrescriptionById} from "../controllers/prescription.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

import { authorizeRoles } from "../middlewares/role.middleware.js";


const router = express.Router();


// Create prescription

router.post(
    "/",
    protect,
    authorizeRoles("doctor"),
    createPrescription
);

// Get all prescriptions
router.get(
    "/",
    protect,
    authorizeRoles("doctor"),
    getPrescriptions
);

// Get prescription by ID
router.get(
    "/:prescriptionId",
    protect,
    authorizeRoles("doctor"),
    getPrescriptionById
);

export default router;