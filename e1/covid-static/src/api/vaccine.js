import { DELETE, GET, PATCH, POST, PUT } from './api-req'

const API = 'vacc'

export const getAllPatients = async () => {
    try {
        const response = await GET(API)

        return response
    } catch (error) {
        throw new Error('Unable to fetch system patients')
    }
}


export const createVacc = async (vaccData, id) => {
    try {
        const response = await POST(`${API}/${id}`, vaccData)

        return response
    } catch (error) {
        throw new Error(`Unable to fetch patient`)
    }
}