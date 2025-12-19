import axios from "axios"

export const API_BASE_URL = "https://my-ecommerce-website-production.up.railway.app"
const token = localStorage.getItem("jwt");

export const api = axios.create({
    baseURL:API_BASE_URL,
    headers:{
        "Authorization" : `Bearer ${token}`,
       'Content-Type': "application/json"
    }
})