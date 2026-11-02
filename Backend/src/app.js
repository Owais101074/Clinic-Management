import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import patientRoutes from "./routes/patient.routes.js";
import prescriptionRoutes from "./routes/prescription.routes.js";
import visitRoutes from "./routes/visit.routes.js";
import medicineRoutes from "./routes/medicine.routes.js";

const app = express();

// Middlewares
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

// Health Check Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Clinic Management API Running 🚀"
    });
});

// Auth Routes
app.use("/api/auth", authRoutes);

// Patient Routes
app.use("/api/patients", patientRoutes);

// Visit Routes
app.use("/api/visits", visitRoutes);

// Medicine Routes
app.use("/api/medicines", medicineRoutes);

// Prescription Routes
app.use("/api/prescriptions", prescriptionRoutes);

export default app;


// med id = 6ab250fbea7bbbe4f7c34721
// visit id = 6aad9922e827a737024741bb