import Medicine from "../models/medicine.model.js";

export const createMedicine = async (req, res) => {

    try {

        // 1. Get data from request body
        const {
            name,
            genericName,
            strength,
            form
        } = req.body;

        // 2. Validate required fields
        if (!name || !form) {
            return res.status(400).json({
                success: false,
                message: "Medicine name and form are required"
            });
        }

        // 3. Create medicine
        const medicine = await Medicine.create({
            name,
            genericName,
            strength,
            form
        });

        // 4. Send response
        return res.status(201).json({
            success: true,
            message: "Medicine created successfully",
            data: medicine
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};