const mongoose = require("mongoose")

const diseaseSchema = new mongoose.Schema({
    start: Date,
    end: String
}, { _id: false })

const vaccinationSchema = new mongoose.Schema({
    timestamps: Date,
    producer: String
})

const addressSchema = new mongoose.Schema({
    city: String,
    street: String,
    appr: String,
}, { _id: false })

const patientSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId
        },
        first_name: {
            type: String,
            lowercase: true
        },
        last_name: {
            type: String,
            require: [true, "Please enter a password"],
            lowercase: true
        },
        identifier_number: {
            type: Number
        },
        address: {
            type: addressSchema
        },

        birth: {
            type: Date,
        },

        phone: {
            type: String,
        },

        cell: {
            type: String
        },
        vaccinations: {
            type: [vaccinationSchema]
        },
        disease: {
            type: [diseaseSchema]
        }

    },
    {
        timestamps: true,
    }
)

const Patient = mongoose.model("Patient", patientSchema)
module.exports = Patient
