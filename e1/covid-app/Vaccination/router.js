const express = require('express')
const router = express.Router()

const { getPatientVacc, getAllVaccs, updateVacc, addVacc } = require('./databaseAccess')

router.get('', async (req, res) => {
    try {
        const vaccs = await getAllVaccs()

        return res.send(vaccs)
    } catch (error) {
        console.log({ error })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params

        const vacc = await getPatientVacc(id)
        return res.status(201).send(vacc)
    } catch (error) {
        console.log({ error })
    }
})


router.put('/:id', async (req, res) => {
    try {
        let updatedVacc = req.body
        const id = req.params.id

        updatedVacc = await updateVacc(id, updatedVacc)
        return res.send(updatedVacc)
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
})

router.post('/:id', async (req, res) => {
    try {
        let vaccData = req.body
        const patinet_id = req.params.id

        vaccData = await addVacc(vaccData, patinet_id)
        return res.status(201).send(vaccData)
    } catch (error) {
        console.log({ error })
    }
})

router.delete('/:id', async (req, res) => {

})

module.exports = router
