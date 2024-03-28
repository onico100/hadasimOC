const express = require("express")
const cors = require("cors")
const connectToDb = require('./db/connecting')

const patientRouter = require('./Patient/router')
const vaccinationsRouter = require('./Vaccination/router')
const DiseasesRouter = require('./Disease/router')
const corsOptions = require("./config/cors")

const app = express()

app.use(express.json())

app.use(cors(corsOptions))

app.use('/api/patient', patientRouter)
app.use('/api/vacc', vaccinationsRouter)
app.use('/api/disease', DiseasesRouter)

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
    connectToDb()
})
