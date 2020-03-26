//help https://stackoverflow.com/questions/49500379/typical-file-structure-in-reactjs-application-grouping-api-calls-in-api-js
import axios from 'axios';
import resolve from './resolve';
import { Body } from 'react-bootstrap/lib/Media';
require('dotenv').config()

// let apiBaseUrl = 'http://loca';
let apiBaseUrl =  'https://sales-management-server.herokuapp.com';

export const testAuth = async () => {
    return await resolve(axios.get(`${apiBaseUrl}/profile`).then(res => res.data));
}
export const login = async (email, password) => {

    try {

        return await resolve(axios.post(`${apiBaseUrl}/api/auth/login`, {
            user: {
                email,
                password
            }
        }).then(res => res.data))
    }
    catch (err) {
        console.log(err)
    }
}
//////////////////////////////POST//////////////////////////////////////////////

export const registerUser = async (data) => {
    return await resolve(axios.post(`${apiBaseUrl}/api/v1/register`, data)
        .then(res => res.data));
}
export const registerItem = async (data) => {
    return await resolve(axios.post(`${apiBaseUrl}/api/v1/itemReg`, data)
        .then(res => res.data));
}
export const sendCourier = async (data) => {
    return await resolve(axios.post(`${apiBaseUrl}/api/v1/sendCourier`, data)
        .then(res => res.data));
}

//==========================GET========================//
export const getAllUsers = async () => {
    return await resolve(axios.get(`${apiBaseUrl}/api/v1/get_all_users`)
        .then(res => res.data));
}
export const getAllItems = async () => {
    return await resolve(axios.get(`${apiBaseUrl}/api/v1/get_all_items`)
        .then(res => res.data));
}
export const get_today_courier = async (params) => {
    return await resolve(axios.get(`${apiBaseUrl}/api/v1/get_today_courier/${params.uid}?from=${params.from}`)
        .then(res => res.data));
}
export const get_all_courier = async (params) => {
    return await resolve(axios.get(`${apiBaseUrl}/api/v1/get_courier?from=${params.date}`)
        .then(res => res.data));
}




//--------------------------------PUT--------------------------//

export const courier_checkout = async (id, data) => {
    return await resolve(axios.put(`${apiBaseUrl}/api/v1/checkout/${id}`, data)
        .then(res => res.data));
}




