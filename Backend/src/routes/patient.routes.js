import express from "express";

import { createPatient } from "../controllers/patient.controller.js";
import {getTodayPatients} from "../controllers/patient.controller.js";
import { callPatient } from "../controllers/patient.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = express.Router();


// Create Patient
router.post(
    "/",
    protect,
    authorizeRoles("receptionist"),
    createPatient
);

// Get Today's Patients
router.get(
    "/today",
    protect,
    authorizeRoles("doctor", "receptionist"),
    getTodayPatients
);

// Call Patient
router.post(
    "/:id/call",
    protect,
    authorizeRoles("doctor"),
    callPatient
);


export default router;