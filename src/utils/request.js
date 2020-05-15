import axios from 'axios'
import { getToken } from "./auth";
let request = axios;
/* url */
request.defaults.baseURL = "http://localhost:3009/api/v1/";
/* 拦截 */
request.interceptors.request.use((config) => {
    config.headers.Authorization = "Bearer " + getToken();
    return config;
})
export { request };