//help https://stackoverflow.com/questions/49500379/typical-file-structure-in-reactjs-application-grouping-api-calls-in-api-js
import axios from 'axios';
import resolve from './resolve';
require('dotenv').config()

// let apiBaseUrl = 'http://loca';
let apiBaseUrl = process.env.URL || 'http://localhost:4000';

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






export const getAllCategories = async () => {
    return await resolve(axios.get(`${apiBaseUrl}/api/v1/getAllCategories`)
        .then(res => res.data));
}
export const getAllSellers = async () => {
    return await resolve(axios.get(`${apiBaseUrl}/api/v1/getAllSellers`)
        .then(res => res.data));
}
export const getAllCompanies = async () => {
    return await resolve(axios.get(`${apiBaseUrl}/api/v1/getAllCompanies`)
        .then(res => res.data));
}

export const getStock = async (params) => {
    return await resolve(axios.get(`${apiBaseUrl}/api/v1/getSearchItems?name=${params.name}&barcode=${params.barcode}&limit=${params.limit}&page=${params.page}`)
        .then(res => res.data));
}
export const getDailySale = async (params) => {
    // console.log("params",params)
    return await resolve(axios.get(`${apiBaseUrl}/api/v1/getDailySale?name=${params.name}&from=${params.date}&orderNo=${params.orderNo}&barcode=${params.barcode}&limit=${params.limit}&page=${params.page}`)
        .then(res => res.data));
}

export const getSale = async (barcode) => {
    return await resolve(axios.get(`${apiBaseUrl}/api/v1/fetch?barcode=${barcode}`)
        .then(res => res.data));
}
export const getOrderNo = async () => {
    return await resolve(axios.get(`${apiBaseUrl}/api/v1/oNo`)
        .then(res => res.data));
}

//--------------------------------PUT--------------------------//
export const updateSeller = async (id, data) => {
    return await resolve(axios.put(`${apiBaseUrl}/api/v1/updateSeller/${id}`, data)
        .then(res => res.data));
}
export const updateStock = async (id, data) => {
    return await resolve(axios.put(`${apiBaseUrl}/api/v1/updateStock/${id}`, data)
        .then(res => res.data));
}
export const updateStockDel = async (params) => {
    return await resolve(axios.put(`${apiBaseUrl}/api/v1/updateStockDel?barcode=${params.barcode}&stockIn=${params.stockIn}`)
        .then(res => res.data));
}





