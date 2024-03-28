import React from 'react'
import { Box, FormControl, InputLabel, Input, Button, Typography } from '@mui/material'
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize'
import { styled } from '@mui/system'
import moment from 'moment'
import AppTooltip from '../AppTooltip'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import useUserForm from '../../useForm'


const PatientDetails = (props) => {
    const [isEditProfile, setIsEditProifle] = React.useState(false)
    const { item } = props

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


    const hasChanges = true

    const toggleEditProfile = () => {
        setIsEditProifle(prev => !prev)
    }

    const handleUpdate = () => {
        const patient = {
            identifier_number, first_name: firstName, last_name: lastName, cell, phoneNumber,
            city, street, appr
        }

        props.handleUpdatePatinet(patient, item._id)
    }

    return (
        <Box sx={style}>
            <div className='patient-actions'>

                <AppTooltip title='edit'>
                    <CreateOutlinedIcon onClick={toggleEditProfile} />
                </AppTooltip>

            </div>

            <FormControl variant="standard" >

                <Typography sx={{ border: '1px solid lightgrey', p: 3 }}>
                    <InputLabel htmlFor="component-simple">Full name</InputLabel>

                    <Input
                        onChange={onFormChange}
                        id="component-simple"
                        name='first_name'
                        style={{ margin: '4%' }}
                        defaultValue={item.first_name}
                        disabled={!isEditProfile}
                    />

                    <Input
                        onChange={onFormChange}
                        id="component-simple"
                        name='last_name'
                        style={{ margin: '4%' }}
                        defaultValue={item.last_name}
                        disabled={!isEditProfile}
                    />

                </Typography>

            </FormControl>

            <FormControl variant="standard" >

                <InputLabel htmlFor="component-simple">Address</InputLabel>

                <Typography sx={{ border: '1px solid lightgrey', p: 3 }}>

                    <Input
                        onChange={onFormChange}
                        id="component-simple"
                        name='city'
                        style={{ margin: '4%' }}
                        defaultValue={item.address.city}
                        disabled={!isEditProfile}
                    />
                    <Input
                        onChange={onFormChange}
                        id="component-simple"
                        name='street'
                        style={{ margin: '4%' }}
                        defaultValue={item.address.street}
                        disabled={!isEditProfile}
                    />
                    <Input
                        onChange={onFormChange}
                        id="component-simple"
                        name='appr'
                        style={{ margin: '4%' }}
                        defaultValue={item.address.appr}
                        disabled={!isEditProfile}
                    />
                </Typography>

            </FormControl>

            <FormControl variant="standard" >

                <InputLabel htmlFor="component-simple">Contacts</InputLabel>

                <Typography sx={{ border: '1px solid lightgrey', p: 3 }}>

                    <Input
                        onChange={onFormChange}
                        id="component-simple"
                        name='contact'
                        style={{ margin: '4%' }}
                        defaultValue={item.cell}
                        disabled={!isEditProfile}
                    />

                    <Input
                        onChange={onFormChange}
                        id="component-simple"
                        name='contact'
                        style={{ margin: '4%' }}
                        defaultValue={item.phone}
                        disabled={!isEditProfile}
                    />

                </Typography>
            </FormControl>

            <InputLabel htmlFor="component-simple">Birth day</InputLabel>

            <Input
                onChange={onFormChange}
                id="component-simple"
                name='birth'
                style={{ margin: '4%' }}
                defaultValue={`${moment(item.birth).format('DD/MM/YYYY')}`}
                disabled
            />

            {hasChanges && <Button onClick={handleUpdate} > Save</Button>}

        </Box >
    )
}

export default PatientDetails

const style = {
    position: 'absolute',
    minHeight: '250px',
    top: '50%',
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