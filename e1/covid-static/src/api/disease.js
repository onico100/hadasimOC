import { DELETE, GET, PATCH, POST, PUT } from './api-req'

const API = 'disease'

export const getAllDisease = async () => {
    try {
        const response = await GET(API)

        return response
    } catch (error) {
        throw new Error('Unable to fetch system patients')
    }
}

export const createDisease = async (diseaseData, id) => {
    try {
        const response = await POST(`${API}/${id}`, diseaseData)

        return response
    } catch (error) {
        throw new Error(`Unable to fetch patient`)
    }
}