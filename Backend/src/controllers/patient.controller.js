import Patient from "../models/patient.model.js";

export const createPatient = async (req, res) => {

    try {

        const { name, phone, visitDate } = req.body;

        // 1. Validate required fields
        if (!name || !phone || !visitDate) {
            return res.status(400).json({
                success: false,
                message: "Name, phone and visit date are required"
            });
        }

        // 2. Find today's latest queue number
        const latestPatient = await Patient
            .findOne({ visitDate: new Date(visitDate) })
            .sort({ queueNumber: -1 });

        // 3. Generate next queue number
        const nextQueueNumber = latestPatient
            ? latestPatient.queueNumber + 1
            : 1;

        // 4. Create patient
        const patient = await Patient.create({
            name,
            phone,
            visitDate,
            queueNumber: nextQueueNumber,
            status: "waiting"
        });

        // 5. Send response
        return res.status(201).json({
            success: true,
            message: "Patient added successfully",
            data: patient
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

export const getTodayPatients = async (req, res) => {

    try {

        // Get today's date
        const today = new Date();

        // Start of today
        const startOfDay = new Date(today);
        startOfDay.setHours(0, 0, 0, 0);

        // End of today
        const endOfDay = new Date(today);
        endOfDay.setHours(23, 59, 59, 999);

        // Find today's patients
        const patients = await Patient.find({
            visitDate: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        }).sort({
            queueNumber: 1
        });

        return res.status(200).json({
            success: true,
            message: "Today's patients fetched successfully",
            count: patients.length,
            data: patients
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

export const callPatient = async (req, res) => {

    try {

        const { id } = req.params;

        // Find patient
        const patient = await Patient.findById(id);

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found"
            });
        }

        // Check patient status
        if (patient.status !== "waiting") {
            return res.status(400).json({
                success: false,
                message: "Patient is not in waiting status"
            });
        }

        // Update patient status
        patient.status = "called";

        await patient.save();

        return res.status(200).json({
            success: true,
            message: "Patient called successfully",
            data: patient
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};