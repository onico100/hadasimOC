const mongoose = require("mongoose")
const generateError = require('../error-handler')
const Vaccination = require('./models/Vaccination.model')

const getPatientVacc = async (id) => {
    try {
        const vacc = await Vaccination.find({ patient_id: new mongoose.Types.ObjectId(id) })

        return Promise.resolve(vacc)
    } catch (err) {
        return generateError("Mongoose", err)
    }
}

const getAllVaccs = async (id) => {
    try {
        const vaccs = await Vaccination.find({}, { __v: 0 })

        return Promise.resolve(vaccs)
    } catch (err) {
        return generateError("Mongoose", err)
    }
}

const updateVacc = async (id, updatedVacc) => {
    try {
        let vacc = await Vaccination.findByIdAndUpdate(new mongoose.Types.ObjectId(id), updatedVacc, {
            new: true,
        })

        if (!vacc)
            throw new Error("There is no vacc with given id")


        return Promise.resolve(vacc)
    } catch (err) {
        return generateError("Mongoose", err)
    }
}

const addVacc = async (vaccData, patient_id) => {
    try {
        let newVacc = new Vaccination(vaccData)
        newVacc._id = new mongoose.Types.ObjectId()
        newVacc.patient_id = new mongoose.Types.ObjectId(patient_id)

        await newVacc.save()
        return newVacc
    } catch (err) {
        return generateError("Mongoose", err)
    }
}

module.exports = {
    getPatientVacc,
    getAllVaccs,
    updateVacc,
    addVacc
}