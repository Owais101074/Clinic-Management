import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        phone: {
            type: String,
            required: true,
            trim: true
        },

        visitDate: {
            type: Date,
            required: true
        },

        queueNumber: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            enum: [
                "waiting",
                "called",
                "completed"
            ],
            default: "waiting"
        }
    },
    {
        timestamps: true
    }
);

const Patient = mongoose.model(
    "Patient",
    patientSchema
);

export default Patient;