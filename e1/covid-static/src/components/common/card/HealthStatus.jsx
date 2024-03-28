import React from 'react'
import { Box, Input, Button } from '@mui/material'
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize'
import { styled } from '@mui/system'
import moment from 'moment'
import AppList from '../AppList'
import AppDatePicker from '../AppDatePicker'

const PatientHealthStatus = (props) => {
    const [openList, setOpenList] = React.useState({ vaccinations: false, disease: false })
    const [addDisease, setOpenAddingDisease] = React.useState(false)
    const [addVacc, setOpenAddingVacc] = React.useState(false)

    const [vaccData, setVaccData] = React.useState({ timestamps: undefined, producer: undefined })

    const [diseaseData, setDiseaseData] = React.useState({ start: undefined, end: undefined })

    const { item } = props

    const handleProducerName = (e) => {
        setVaccData(prev => ({ ...prev, producer: e.target.value }))
    }

    const handleTimeVacc = (value) => {
        setVaccData(prev => ({ ...prev, timestamps: value }))
    }
    const handleOpenList = (path) => {

        if (path === 'vaccinations') {
            if (openList.vaccinations) setOpenList({ disease: false, vaccinations: false })

            else setOpenList({ disease: false, vaccinations: true })
        }
        else {
            if (openList.disease) setOpenList({ disease: false, vaccinations: false })
            else setOpenList({ disease: true, vaccinations: false })
        }
    }
    const handleAddingDisease = () => {
        setOpenAddingDisease(true)
    }

    const handleAddingVacc = () => {
        setOpenAddingVacc(true)
    }

    const vaccinationsList = item.vaccinations.map((v) => ({ primary: v.producer, secondary: moment(v.timestamps).format('DD/MM/YYYY') }))

    const diseaseList = item.disease.map((v) => ({ primary: moment(v.start).format('DD/MM/YYYY'), secondary: moment(v.end).format('DD/MM/YYYY') }))

    const handleCloseCalendar = (e) => {
        setOpenAddingDisease(false)

        props.handleAddDisease({ start: diseaseData.start, end: e })
    }

    const createNewVacc = () => {
        props.handleAddVacc(vaccData)
    }

    return (
        <Box sx={style}>

            <Button
                value={`number of vaccinations: ${item.vaccinations.length}`} onClick={() => handleOpenList('vaccinations')}>vaccinations</Button>
            {openList.vaccinations && <React.Fragment>
                <AppList items={vaccinationsList} />
                {vaccinationsList.length < 4 && <Button onClick={handleAddingVacc}>Add</Button>}

                {addVacc && <React.Fragment>
                    <Input onChange={(e) => handleProducerName(e)} />
                    <AppDatePicker selectedDay={vaccData.timestamps} handleDayClick={(e) => handleTimeVacc(e)} />

                    <Button onClick={createNewVacc}>Save</Button>
                </React.Fragment>}
            </React.Fragment>}

            <Button
                value={`number of disease: ${item.disease.length}`} onClick={() => handleOpenList('disease')}>disease</Button>
            {openList.disease &&
                <React.Fragment>
                    <AppList items={diseaseList} />
                    {!diseaseList.length && <Button onClick={handleAddingDisease}>Add</Button>}

                    {addDisease ?

                        !diseaseData.start
                            ? <AppDatePicker selectedDay={diseaseData.start} handleDayClick={(e) => setDiseaseData(prev => ({ ...prev, start: e }))} />
                            : <AppDatePicker selectedDay={diseaseData.end} handleDayClick={(e) => handleCloseCalendar(e)} />

                        : <></>}

                </React.Fragment>}

        </Box >
    )
}

export default PatientHealthStatus

const style = {
    position: 'absolute',
    minHeight: '250px',
    top: '50%',
    flexDirection: 'column',
    display: 'flex',
    left: '50%',
    height: '60%',
    overflowY: 'scroll',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const TextareaAutosize = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);