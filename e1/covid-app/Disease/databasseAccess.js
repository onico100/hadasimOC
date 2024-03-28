const mongoose = require("mongoose")
const generateError = require('../error-handler')
const Disease = require("./models/Disease.model")

const addDisease = async (diseaseData, patient_id) => {
    try {
        let newDisease = new Disease(diseaseData)
        newDisease._id = new mongoose.Types.ObjectId()
        newDisease.patient_id = new mongoose.Types.ObjectId(patient_id)

        await newDisease.save()
        return newDisease
    } catch (err) {
        return generateError("Mongoose", err)
    }
}

const getAllDiseases = async () => {
    try {
        const diseases = await Disease.find({}, { __v: 0 })

        return Promise.resolve(diseases)
    } catch (error) {
        return console.log({ error })
    }
}

const getPatientDiseases = async (id) => {
    try {
        const patientDiseases = await Disease.find({ patient_id: new mongoose.Types.ObjectId(id) })

        return Promise.resolve(patientDiseases)
    } catch (err) {
        return generateError("Mongoose", err)
    }
}

const updateDisease = async (id, updatedDisease) => {
    try {
        let disease = await Disease.findByIdAndUpdate(new mongoose.Types.ObjectId(id), updatedDisease, {
            new: true,
        })

        if (!disease)
            throw new Error("There is no disease with given id")


        return Promise.resolve(disease)
    } catch (err) {
        return generateError("Mongoose", err)
    }
}

const deleteDisease = async (id) => { //SOMETHING WRONG WITH THAT FUNCTION
    try {
        let disease = await Disease.find({ _id: id })

        if (!disease)
            throw new Error("A disease with this ID cannot be found in the database")

        await disease.findByIdAndDelete({ _id: id })

        return Promise.resolve(disease._id)
    } catch (err) {
        return generateError("Mongoose", err)
    }
}


module.exports = {
    getAllDiseases,
    getPatientDiseases,
    addDisease,
    updateDisease,
    deleteDisease
}