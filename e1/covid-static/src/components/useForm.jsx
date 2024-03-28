import React from 'react'

const FormFields = {
    set_identifier_number: 'identifier_number',
    set_last_name: 'last_name',
    set_first_name: 'first_name',
    set_phone_number: 'phone',
    set_cell: 'cell',
    set_reset_form: 'reset_form',
    set_city: 'city',
    set_street: 'street',
    set_appr: 'appr',
}

const initialState = {
    identifier_number: '',
    first_name: '',
    last_name: '',
    phone: '',
    cell: '',
    city: '',
    street: '',
    appr: ''
}

export const reducer = (state, action) => {
    switch (action.type) {
        case FormFields.set_identifier_number: {
            return { ...state, identifier_number: action.identifier_number }
        }
        case FormFields.set_first_name: {
            return { ...state, first_name: action.first_name }
        }

        case FormFields.set_last_name: {
            return { ...state, last_name: action.last_name }
        }

        case FormFields.set_phone_number: {
            return { ...state, phone_number: action.phone_number }
        }

        case FormFields.set_cell: {
            return { ...state, cell: action.cell }
        }

        case FormFields.set_appr: {
            return { ...state, appr: action.appr }
        }

        case FormFields.set_city: {
            return { ...state, city: action.city }
        }

        case FormFields.set_street: {
            return { ...state, street: action.street }
        }

        case FormFields.reset_form: {
            return initialState;
        }

        default:
            return state
    }
}

const useUserForm = () => {
    const [{ identifier_number, phone_number, cell, city, street, appr, first_name, last_name }, localDispatch] =
        React.useReducer(reducer, initialState)

    const resetForm = () => {
        localDispatch({ type: FormFields.reset_form })
    }
console.log({identifier_number, phone_number, cell, city, street, appr, first_name, last_name})
    const onFormChange = ({ target: { name, value } }) => {
        console.log({ name, value })
        if (name === 'identifier_number') {
            localDispatch({ type: FormFields.set_identifier_number, identifier_number: value })
        }

        if (name === 'first_name') {
            localDispatch({ type: FormFields.set_first_name, first_name: value })
        }

        if (name === 'last_name') {
            localDispatch({ type: FormFields.set_last_name, last_name: value })
        }

        if (name === 'phone') {
            console.log({this: value})
            localDispatch({ type: FormFields.set_phone_number, phone_number: value })
        }

        if (name === 'cell') {
            localDispatch({ type: FormFields.set_cell, cell: value })
        }

        if (name === 'city') {
            localDispatch({ type: FormFields.set_city, city: value })
        }
        if (name === 'street') {
            localDispatch({ type: FormFields.set_street, street: value })
        }
        if (name === 'appr') {
            localDispatch({ type: FormFields.set_appr, appr: value })
        }

        if (name === 'reset_form') {
            localDispatch({ type: FormFields.set_reset_form, repeatedPassword: value })
        }

    }

    return { onFormChange, resetForm, identifier_number, cell, phoneNumber: phone_number, city, street, appr, firstName: first_name, lastName: last_name }
}

export default useUserForm