import { TextField } from '@mui/material'

const patientProfile = {
    FIRST_NAME: 'first_name',
    LAST_NAME: 'last_name',
    IDENTIFIER_NUMBER: 'identifier_number',
    PHONE_NUM: 'phone',
    CELL: 'cell'
}

const AppFormField = (props) => {
    const { isEditPatient, handleChange, label, value = '' } = props

    const requiredFileds = [patientProfile.FIRST_NAME, patientProfile.LAST_NAME, patientProfile.IDENTIFIER_NUMBER]

    return (
        <TextField
            onChange={(e) => handleChange(e)}
            id="standard-read-only-input"
            label={label}
            name={label}
            required={isEditPatient && requiredFileds.includes(label)}
            variant={isEditPatient ? 'outlined' : 'standard'}
            defaultValue={value}
            InputProps={{
                readOnly: false,
            }}
        />
    )
}

export default AppFormField