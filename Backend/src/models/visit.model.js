import mongoose from "mongoose";

const visitSchema = new mongoose.Schema(
    {
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

        visitDate: {
            type: Date,
            required: true
        },

        diagnosis: {
            type: String,
            trim: true
        },

        status: {
            type: String,
            enum: [
                "in-progress",
                "completed"
            ],
            default: "in-progress"
        }
    },
    {
        timestamps: true
    }
);

const Visit = mongoose.model(
    "Visit",
    visitSchema
);

export default Visit;