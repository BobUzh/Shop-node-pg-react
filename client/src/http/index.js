import axios from 'axios';
import { checkAuthApi } from '../api/authApi'

const api = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000/api'
});

api.interceptors.request.use((config) => {
    const authToken = localStorage.getItem('token');
    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`
    }

    return config;
    }, (error => Promise.reject(error))
);

api.interceptors.response.use((config) => config, (async (error) => {
    console.log('error')
    console.log(error)
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await checkAuthApi();
            localStorage.setItem('token', response.data.accessToken);
            return api.request(originalRequest);
        } catch (e) {
            console.log(e)
        }
    }

    return Promise.reject(error)
})
);

export  default api;