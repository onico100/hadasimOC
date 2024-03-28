const mongoose = require('mongoose')

const diseaseSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId
        },
        start: {
            type: Date
        },
        end: {
            type: Date
        },
        patient_id: {
            type: mongoose.Schema.Types.ObjectId
        }
    },
    {
        timestamps: true,
        collection: 'Disease'
    }
)

const Disease = mongoose.model("Disease", diseaseSchema)
module.exports = Disease
