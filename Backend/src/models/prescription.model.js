import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
    {
        visit: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Visit",
            required: true
        },

        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true
        },

        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        medicine: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Medicine",
            required: true
        },

        dosage: {
            type: String,
            required: true,
            trim: true
        },

        frequency: {
            type: String,
            required: true,
            trim: true
        },

        duration: {
            type: String,
            required: true,
            trim: true
        },

        instructions: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

const Prescription = mongoose.model(
    "Prescription",
    prescriptionSchema
);

export default Prescription;