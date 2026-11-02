import Prescription from "../models/prescription.model.js";
import Visit from "../models/visit.model.js";
import Medicine from "../models/medicine.model.js";

export const createPrescription = async (req, res) => {
    try {

        // 1. Get data from request body
        const {
            visitId,
            medicineId,
            dosage,
            frequency,
            duration,
            instructions
        } = req.body;


        // 2. Validate required fields
        if (
            !visitId ||
            !medicineId ||
            !dosage ||
            !frequency ||
            !duration
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields"
            });
        }


        // 3. Find the visit
        const visit = await Visit.findById(visitId);

        if (!visit) {
            return res.status(404).json({
                success: false,
                message: "Visit not found"
            });
        }


        // 4. Verify that the logged-in doctor owns this visit
        if (visit.doctor.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized for this visit"
            });
        }


        // 5. Check visit status
        if (visit.status === "completed") {
            return res.status(400).json({
                success: false,
                message: "Cannot add prescription to a completed visit"
            });
        }


        // 6. Find medicine
        const medicine = await Medicine.findById(medicineId);

        if (!medicine) {
            return res.status(404).json({
                success: false,
                message: "Medicine not found"
            });
        }


        // 7. Check medicine is active
        if (!medicine.isActive) {
            return res.status(400).json({
                success: false,
                message: "This medicine is currently inactive"
            });
        }


        // 8. Create prescription
        const prescription = await Prescription.create({
            visit: visit._id,
            patient: visit.patient,
            doctor: visit.doctor,
            medicine: medicine._id,
            dosage,
            frequency,
            duration,
            instructions
        });


        // 9. Send response
        return res.status(201).json({
            success: true,
            message: "Prescription created successfully",
            data: prescription
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getPrescriptions = async (req, res) => {

    try {

        // 1. Get query parameters
        const {
            visitId,
            patientId,
            medicineId
        } = req.query;

        // 2. Create an empty filter
        const filter = {};

        // 3. Filter by visit
        if (visitId) {
            filter.visit = visitId;
        }

        // 4. Filter by patient
        if (patientId) {
            filter.patient = patientId;
        }

        // 5. Filter by medicine
        if (medicineId) {
            filter.medicine = medicineId;
        }

        // 6. Find prescriptions
        const prescriptions = await Prescription.find(filter)
            .populate("patient", "name phone visitDate queueNumber status")
            .populate("doctor", "fullName role")
            .populate("medicine")
            .populate("visit");

        // 7. Send response
        return res.status(200).json({
            success: true,
            message: "Prescriptions fetched successfully",
            count: prescriptions.length,
            data: prescriptions
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const getPrescriptionById = async (req, res) => {

    try {

        // 1. Get prescription ID from URL
        const { prescriptionId } = req.params;

        // 2. Find prescription
        const prescription = await Prescription.findById(
            prescriptionId
        )
            .populate("patient")
            .populate("doctor")
            .populate("medicine")
            .populate("visit");

        // 3. Check if prescription exists
        if (!prescription) {
            return res.status(404).json({
                success: false,
                message: "Prescription not found"
            });
        }

        // 4. Send response
        return res.status(200).json({
            success: true,
            message: "Prescription fetched successfully",
            data: prescription
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};