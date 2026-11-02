import express from "express";

import { createMedicine } from "../controllers/medicine.controller.js";

const router = express.Router();

// Create medicine
router.post(
    "/",
    createMedicine
);

export default router;