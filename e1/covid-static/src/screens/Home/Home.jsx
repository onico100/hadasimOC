import React from 'react'
import { Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import './style.css'
import { useNavigate } from 'react-router-dom'
import { getAllPatients, deletePatient, updatePatient } from '../../api/patient'
import AppCard from '../../components/common/card/AppCard'
import AppModal from '../../components/common/modal/AppModal'
import PatientDetails from '../../components/common/card/PatientDetails'
import PatientHealthStatus from '../../components/common/card/HealthStatus'
import { createDisease } from '../../api/disease'
import { createVacc } from '../../api/vaccine'

export default function Home() {
    const [patients, setPatients] = React.useState([])
    const [openPatient, setOpenPatinet] = React.useState(undefined)
    const [openHealthStatus, setOpenHealthStatus] = React.useState(undefined)

    const navigate = useNavigate()

    const navigatePatientForm = () => {
        navigate('/patient-form')
    }

    React.useEffect(() => {
        fetchSystemPatients()
    }, [])

    const fetchSystemPatients = async () => {
        const patients = await getAllPatients()

        setPatients(patients)
    }

    const handleAddDisease = (diseaseData) => {
        createDisease(diseaseData, openHealthStatus._id)

        setTimeout(() => {
            closePatientHealthStatus()

            fetchSystemPatients()
        }, 1000)
    }

    const handleAddVacc = (vaccData) => {
        createVacc(vaccData, openHealthStatus._id)

        setTimeout(() => {
            closePatientHealthStatus()

            fetchSystemPatients()
        }, 1000)
    }

    const showPatientCard = (_id) => {
        const selectedPatient = patients.find(t => t._id === _id)

        setOpenPatinet(selectedPatient)
    }


    const closePatientHealthStatus = () => {
        setOpenHealthStatus(false)
    }
    const closePatientDetails = () => {
        setOpenPatinet(false)
    }

    const showPatientHealth = (_id) => {
        const selectedPatient = patients.find(t => t._id === _id)

        setOpenHealthStatus(selectedPatient)
    }

    const handleDeletePatinet = (id) => {
        deletePatient(id)

        const filteredList = patients.filter(p => p._id !== id)

        setPatients(filteredList)
    }

    const handleUpdatePatinet = async (patinet, id) => {
        const updateObject = await updatePatient(patinet, id)

        console.log({ updateObject })


        const index = patients.findIndex(p => p._id === id)


        if (index !== -1) {
            const newList = [...patients]
            newList[index] = updateObject
            setPatients(newList)
        }

        closePatientDetails()

    }

    return (
        <React.Fragment>
            <Box sx={style}>
                <div className='add-patient'><AddIcon onClick={navigatePatientForm} /></div>

                {patients.map(p => (
                    <AppCard {...p} showPatientCard={showPatientCard} showPatientHealth={showPatientHealth} handleDeletePatinet={handleDeletePatinet} />))
                }
            </Box>

            <AppModal popupModal open={Boolean(openPatient)} close={closePatientDetails} children={<PatientDetails item={openPatient} handleUpdatePatinet={handleUpdatePatinet} />} />

            <AppModal
                popupModal
                open={Boolean(openHealthStatus)}
                close={closePatientHealthStatus}
                children={<PatientHealthStatus item={openHealthStatus} handleAddDisease={handleAddDisease} handleAddVacc={handleAddVacc} />}
            />

        </React.Fragment >
    )
}

const style = {
    bgcolor: 'background.paper',
    width: '100%',
    p: 4,
    position: 'relative',
    top: '20%',
    height: '100%'
}