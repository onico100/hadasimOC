const mongoose = require('mongoose')

const vaccinationSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId
        },
        timestamps: {
            type: Date
        },
        producer: {
            type: String
        },
        patient_id: {
            type: mongoose.Schema.Types.ObjectId
        }
    },
    {
        timestamps: true,
    }
)

const Vaccination = mongoose.model("Vaccination", vaccinationSchema)
module.exports = Vaccination
