import React from 'react'
import { Box, Button, Input, Typography } from '@mui/material'
import useUserForm from '../useForm'
import AppFormField from '../common/AppFormField'
import './style.css'
import { createPatient } from '../../api/patient'
import AppDatePicker from '../common/AppDatePicker'
import AppModal from '../common/modal/AppModal'
import { useNavigate } from 'react-router-dom'
import { IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const patientProfile = {
    FIRST_NAME: 'first_name',
    LAST_NAME: 'last_name',
    IDENTIFIER_NUMBER: 'identifier_number',
    PHONE_NUM: 'phone',
    CELL: 'cell',
    CITY: 'city',
    STREET: 'street',
    APPR: 'appr'
}
const PatientForm = () => {
    const [isEditPatient, setIsEditPatient] = React.useState(false)
    const [openCalender, setOpenCalender] = React.useState(false)
    const [birthDay, setBirthDay] = React.useState()

    const navigate = useNavigate()

    const {
        onFormChange,
        resetForm,
        identifier_number,
        cell,
        phoneNumber,
        city,
        street,
        appr,
        firstName,
        lastName } = useUserForm()

        const addNewPatient = () => {
        const patient = {
            identifier_number, first_name: firstName, last_name: lastName, cell, phoneNumber, birth: birthDay,
            city, street, appr, phone: phoneNumber
        }

        createPatient(patient)

        resetForm()
        
        navigate('/')
    }

    const openCalenderModal = () => {
        setOpenCalender(true)
    }
    const closeCalenderModal = () => {
        setOpenCalender(false)
    }

    const handleDayClick = (e) => {
        closeCalenderModal()

        setBirthDay(e)
    }

    const returnBack = () => {
        navigate('/')
    }

    return (
        <React.Fragment>
            <IconButton aria-label="pull" className='return-arrow'>
                <ArrowBackIcon onClick={returnBack} />
            </IconButton>

            <Typography className='header'>Add patient</Typography>

            <Box sx={style} style={{ borderTop: '20px solid green', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>

                <Box component='div' className='form-container'>
                    <AppFormField
                        handleChange={onFormChange}
                        isEditProfile={isEditPatient}
                        label={patientProfile.FIRST_NAME}
                        value={firstName} />

                    <AppFormField
                        handleChange={onFormChange}
                        isEditProfile={isEditPatient}
                        label={patientProfile.LAST_NAME}
                        value={lastName} />

                    <AppFormField
                        handleChange={onFormChange}
                        isEditProfile={isEditPatient}
                        label={patientProfile.IDENTIFIER_NUMBER}
                        value={identifier_number} />

                    <AppFormField
                        handleChange={onFormChange}
                        isEditProfile={isEditPatient}
                        label={patientProfile.PHONE_NUM}
                        value={phoneNumber} />

                    <AppFormField
                        handleChange={onFormChange}
                        isEditProfile={isEditPatient}
                        label={patientProfile.CELL}
                        defaultValue={cell} />

                    <AppFormField
                        handleChange={onFormChange}
                        isEditProfile={isEditPatient}
                        label={patientProfile.CITY}
                        value={city} />

                    <AppFormField
                        handleChange={onFormChange}
                        isEditProfile={isEditPatient}
                        label={patientProfile.STREET}
                        defaultValue={street} />

                    <AppFormField
                        handleChange={onFormChange}
                        isEditProfile={isEditPatient}
                        label={patientProfile.APPR}
                        defaultValue={appr} />

                    <Input type='text' name='birth' placeholder='birth-day' onClick={openCalenderModal} />

                    {<Button onClick={addNewPatient}>save</Button>}

                </Box>
            </Box>

            <AppModal
                children={<Box sx={Modalstyle}><AppDatePicker handleDayClick={handleDayClick} /></Box>}
                close={closeCalenderModal}
                open={openCalender}
            />

        </React.Fragment >

    )
}

export default PatientForm

const style = {
    bgcolor: 'background.paper',
    width: '100%',
    border: '1px solid lightgrey',
    p: 4,
    position: 'relative',
    top: '20%',
    height: '100%'
}

const Modalstyle = {
    bgcolor: 'background.paper',
    width: '40%',
    display: 'flex',
    justifyContent: 'center',
    border: '1px solid lightgrey',
    p: 4,
    position: 'relative',
    top: '20%'
}
