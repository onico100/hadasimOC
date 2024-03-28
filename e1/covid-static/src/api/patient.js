import { DELETE, GET, PATCH, POST, PUT } from './api-req'

const API = 'patient'

export const getAllPatients = async () => {
    try {
        const response = await GET(API)

        return response
    } catch (error) {
        throw new Error('Unable to fetch system patients')
    }
}


export const getPatientById = async (id) => {
    try {
        const response = await GET(`${API}/${id}`)

        return response
    } catch (error) {
        throw new Error(`Unable to fetch patient with given id ${id}`)
    }
}

export const createPatient = async (patient) => {
    try {
        const response = await POST(`${API}`, patient)

        return response
    } catch (error) {
        throw new Error(`Unable to fetch patient`)
    }
}

export const deletePatient = async (id) => {
    try {
        const response = await DELETE(`${API}/${id}`)

        return response
    } catch (error) {
        throw new Error(`Failed to delete patient with given id ${id}`)
    }
}

export const updatePatient = async (updatedPatient, id) => {
    try {
        const response = await PUT(`${API}/${id}`, updatedPatient)

        return response
    } catch (error) {
        throw new Error(`Unable to edit patient with gien id ${id}`)
    }
}