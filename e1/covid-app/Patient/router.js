const express = require('express')
const router = express.Router()
const { createPatient, getPatient, getAllPatients, updatePatient, deletePatient } = require('./databaseAccess')
const { default: mongoose } = require('mongoose')
//Read
router.get('', async (req, res) => {
    try {
        const patients = await getAllPatients()

        return res.send(patients)
    } catch (error) {
        console.log({ error })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params

        const patient = await getPatient(id)
        return res.status(201).send(patient)
    } catch (error) {
        console.log({ error })
    }
})
//Create
router.post('', async (req, res) => {
    try {
        let patient = req.body

        patient = await createPatient(patient)
        return res.status(201).send(patient)
    } catch (error) {
        console.log({ error })
    }
})

//Update
router.put('/:id', async (req, res) => {
    try {
        let updatedPatient = req.body
        const id = req.params.id

        updatedPatient = await updatePatient(id, updatedPatient)
        return res.send(updatedPatient)
    } catch (error) {
        return console.log({ error })// handleError(res, error.status || 500, error.message)
    }
})
//Delete
router.delete('/:id', async (req, res) => {
    try {
        let id = req.params.id
        id = new mongoose.Types.ObjectId(id)

        await deletePatient(id)
        return res.send(id)
    } catch (error) {
        return console.log({ error })//handleError(res, error.status || 500, error.message)
    }
})

module.exports = router
