import axios from "axios";
import { backend_base_url } from "./envConfig";

export const api = axios.create({
    baseURL: backend_base_url
})

// const getToken = () => {
//     // Replace this with your actual token retrieval logic
//     return localStorage.getItem("token");
// };

// api.interceptors.request.use(
//     config => {
//         const token = getToken();
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );


export const apiGet = (
    url: string,
    config?: any
) => {
    if(config && Object?.keys(config)?.length > 0) {
        Object?.keys(config)?.forEach(key => {
            url += `&${key}=${config[key]}`
        })
    }
    api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    return api.get(url);
}

export const apiPost = (
    url: string,
    config?: any
) => {
    api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    return api.post(url, config);
}