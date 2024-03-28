import axios from 'axios'
import base_url from './base_url'

export async function POST(url, body) {
    return await (
        await axios.post(`${base_url}${url}`, body)
    ).data
}

export async function PUT(url, body) {
    return await (
        await axios.put(`${base_url}${url}`, body)
    ).data
}

export async function GET(url) {
    return await (
        await axios.get(`${base_url}${url}`)
    ).data
}

export async function PATCH(url, body) {
    return await (
        await axios.patch(`${base_url}${url}`, body)
    ).data
}

export async function DELETE(url) {
    return await (
        await axios.delete(`${base_url}${url}`)
    ).data
}