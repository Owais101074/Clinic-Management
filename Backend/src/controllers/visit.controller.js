import Visit from "../models/visit.model.js";
import Patient from "../models/patient.model.js";
import Prescription from "../models/prescription.model.js";

export const createVisit = async (req, res) => {
    try {

        // 1. Get patient ID from request body
        const { patientId } = req.body;


        // 2. Validate patient ID
        if (!patientId) {
            return res.status(400).json({
                success: false,
                message: "Patient ID is required"
            });
        }


        // 3. Check whether patient exists
        const patient = await Patient.findById(patientId);

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found"
            });
        }


        // 4. Get logged-in doctor ID
        const doctorId = req.user._id;


        // 5. Create visit
        const visit = await Visit.create({
            patient: patient._id,
            doctor: doctorId,
            visitDate: new Date(),
            status: "in-progress"
        });


        // 6. Send success response
        return res.status(201).json({
            success: true,
            message: "Visit created successfully",
            data: visit
        });

    } catch (error) {

        // 7. Handle server errors
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getVisits = async (req, res) => {

    try {

        // 1. Find all visits
        const visits = await Visit.find()
    .populate("patient")
    .populate("doctor");

        // 2. Send response
        return res.status(200).json({
            success: true,
            message: "Visits fetched successfully",
            data: visits
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

export const getVisitById = async (req, res) => {

    try {

        // 1. Get visit ID from URL
        const { visitId } = req.params;

        // 2. Find visit
        const visit = await Visit.findById(visitId)
            .populate("patient")
            .populate("doctor");

        // 3. Check whether visit exists
        if (!visit) {
            return res.status(404).json({
                success: false,
                message: "Visit not found"
            });
        }

        // 4. Find prescriptions for this visit
        const prescriptions = await Prescription.find({
            visit: visitId
        }).populate("medicine");

        // 5. Send complete response
        return res.status(200).json({
            success: true,
            message: "Visit fetched successfully",
            data: {
                visit,
                prescriptions
            }
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};