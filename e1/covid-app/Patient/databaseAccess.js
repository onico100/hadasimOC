const mongoose = require("mongoose")
const Patient = require("./models/Patient.model")
const generateError = require('../error-handler')
const Vaccination = require("../Vaccination/models/Vaccination.model")
const Disease = require("../Disease/models/Disease.model")

const createPatient = async (patient) => {
    try {
        let newPatient = new Patient(patient)
        newPatient._id = new mongoose.Types.ObjectId()
        newPatient.address = {
            city: patient.city,
            street: patient.street,
            appr: patient.appr
        }

        await newPatient.save()
        return newPatient
    } catch (err) {
        return generateError("Mongoose", err)
    }
}

const getAllPatients = async () => {
    try {
        const patients = await Patient.find({}, { __v: 0 })

        const vaccs = await Vaccination.find({}, { __v: 0 })

        patients.forEach(patient => {
            const patientVaccinations = vaccs.filter(v => {
                if (v.patient_id)
                    return v.patient_id.toString() === patient._id.toString()
            })
            patient.vaccinations = patientVaccinations
        })

        const diseases = await Disease.find({}, { __v: 0 })


        patients.forEach(patient => {
            const patientDiseases = diseases.filter(v => {
                if (v.patient_id)
                    return v.patient_id.toString() === patient._id.toString()
            })
            patient.disease = patientDiseases
            // console.log({ patientVaccinations })
        });

        return Promise.resolve(patients)
    } catch (error) {
        return console.log({ error })//handleBadRequest("Mongoose", error)
    }
}

const getPatient = async (id) => {
    try {
        const [patient] = await Patient.find({ _id: new mongoose.Types.ObjectId(id) })

        const vaccs = await Vaccination.find({}, { __v: 0 })

        const patinetVacc = vaccs.filter(v => {
            if (v.patient_id)
                return v.patient_id.toString() === patient._id.toString()
        })

        patient.vaccinations = patinetVacc

        const diseases = await Disease.find({}, { __v: 0 })

        const patinetDisease = diseases.filter(v => {
            if (v.patient_id)
                return v.patient_id.toString() === patient._id.toString()
        })

        patient.disease = patinetDisease

        return Promise.resolve(patient)
    } catch (err) {
        return generateError("Mongoose", err)
    }
}

const updatePatient = async (id, updatedPatient) => {
    try {
        let [patient] = await Patient.find({ _id: id })

        if (updatedPatient.city.trim() || updatedPatient.appr || updatedPatient.street.trim()) {
            if (updatedPatient.city.trim()) {

                patient = await Patient.findOneAndUpdate(
                    { _id: id },
                    { $set: { address: { city: updatedPatient.city, street: patient.address.street, appr: patient.address.appr } } },
                    { new: true }
                );
            }
            if (updatedPatient.appr.trim()) {
                patient = await Patient.findOneAndUpdate(
                    { _id: id },
                    { $set: { address: { appr: updatedPatient.appr, city: patient.address.city, street: patient.address.street } } },
                    { new: true }
                );
            }
            if (updatedPatient.street.trim()) {
                patient = await Patient.findOneAndUpdate(
                    { _id: id },
                    { $set: { address: { street: updatedPatient.street, appr: patient.address.appr, city: patient.address.city } } },
                    { new: true }
                );
            }

        }

        if (updatedPatient.first_name) {
            patient = await Patient.findOneAndUpdate(
                { _id: id },
                { $set: { first_name: updatedPatient.first_name } },
                { new: true }
            );
        }

        if (updatedPatient.last_name) {
            patient = await Patient.findOneAndUpdate(
                { _id: id },
                { $set: { last_name: updatedPatient.last_name } },
                { new: true }
            );
        }

        if (updatedPatient.phone) {
            patient = await Patient.findOneAndUpdate(
                { _id: id },
                { $set: { phone: updatedPatient.phone } },
                { new: true }
            );
        }

        if (updatedPatient.cell) {
            patient = await Patient.findOneAndUpdate(
                { _id: id },
                { $set: { cell: updatedPatient.cell } },
                { new: true }
            );
        }

        // patient = await Patient.findByIdAndUpdate(new mongoose.Types.ObjectId(id), updatedPatient, {
        //     new: true,
        // })

        if (!patient)
            throw new Error("There is no patient with given id")


        return Promise.resolve(patient)
    } catch (err) {
        return generateError("Mongoose", err)
    }
}

const deletePatient = async (id) => {
    try {
        let patient = await Patient.find({ _id: id })

        if (!patient)
            throw new Error("A patient with this ID cannot be found in the database")

        await Patient.findByIdAndDelete({ _id: id })

        await Vaccination.deleteOne({ patient_id: id })

        return Promise.resolve(patient._id)
    } catch (err) {
        return generateError("Mongoose", err)
    }
}


module.exports = {
    createPatient,
    getPatient,
    deletePatient,
    getAllPatients,
    updatePatient
}