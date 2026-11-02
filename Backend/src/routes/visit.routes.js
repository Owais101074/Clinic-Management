import express from "express";

import { createVisit, getVisits, getVisitById } from "../controllers/visit.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

import { authorizeRoles } from "../middlewares/role.middleware.js";


const router = express.Router();


// Create visit

router.post(
    "/",
    protect,
    authorizeRoles("doctor"),
    createVisit
);

// Get all visits

router.get(
    "/",
    protect,
    authorizeRoles("doctor"),
    getVisits
);

// Get visit by ID

router.get(
    "/:visitId",
    protect,
    authorizeRoles("doctor"),
    getVisitById
);

export default router;