import axios, {AxiosRequestConfig} from "axios";

export const API_URL = 'http://localhost:5000/'

const $host = axios.create({
    baseURL: API_URL
})
const $authHost = axios.create({
    baseURL: API_URL
})

$authHost.interceptors.request.use((config) => {
    config.headers!.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

export {
    $host,
    $authHost
}