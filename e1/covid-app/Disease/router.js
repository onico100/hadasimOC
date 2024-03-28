const express = require('express')
const router = express.Router()
const { getAllDiseases, getPatientDiseases, addDisease, updateDisease, deleteDisease } = require('./databasseAccess')

router.get('', async (req, res) => {
    try {
        const disease = await getAllDiseases()

        return res.send(disease)
    } catch (error) {
        console.log({ error })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params

        const diseases = await getPatientDiseases(id)
        return res.status(201).send(diseases)
    } catch (error) {
        console.log({ error })
    }
})

router.post('/:id', async (req, res) => {
    try {
        let diseaseData = req.body
        const patinet_id = req.params.id
        console.log(patinet_id)
        disease = await addDisease(diseaseData, patinet_id)
        return res.status(201).send(disease)
    } catch (error) {
        console.log({ error })
    }
})


router.put('/:id', async (req, res) => {
    try {
        let updatedDisease = req.body
        const id = req.params.id

        updatedDisease = await updateDisease(id, updatedDisease)
        return res.send(updatedDisease)
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id

        await deleteDisease(id)
        return res.send(id)
    } catch (error) {
        return console.log({ error })
    }
})

module.exports = router
