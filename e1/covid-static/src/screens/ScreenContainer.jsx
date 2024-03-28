import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

export default function ScreenContainer(props) {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md">
                <Box sx={{ height: '100vh' }} >
                    {props.children}
                </Box >
            </Container>
        </React.Fragment>
    )
}