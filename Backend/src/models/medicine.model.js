import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        genericName: {
            type: String,
            trim: true
        },

        strength: {
            type: String,
            trim: true
        },

        form: {
            type: String,
            enum: [
                "tablet",
                "capsule",
                "syrup",
                "injection",
                "cream",
                "ointment",
                "drops"
            ],
            required: true
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const Medicine = mongoose.model(
    "Medicine",
    medicineSchema
);

export default Medicine;