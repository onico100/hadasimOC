import React from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import './style.css'
import EventNoteIcon from '@mui/icons-material/EventNote'
import DeleteIcon from '@mui/icons-material/Delete';
export default function AppCard(props) {
    const { _id, first_name, last_name } = props

    return (
        <Typography sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={style} className='app-card' onClick={() => props.showPatientCard(_id)}>
                {first_name + ' ' + last_name}
            </Box>
            <EventNoteIcon sx={{ cursor: 'pointer' }} onClick={() => props.showPatientHealth(_id)} />

            <DeleteIcon sx={{ color: 'red' }} onClick={() => props.handleDeletePatinet(_id)}/>
        </Typography>
    )
}

const style = {
    margin: '3%',
    display: 'flex',
    justifyContent: 'space-between',
    bgcolor: 'background.paper',
    width: '100%',
    border: '1px solid lightgrey',
    p: 4,
    borderRadius: '8px'
}