import api from '../http/index';
import axios from "axios";

export const registration = async (params) => {
    return  api.post('/auth/registration', params);
};

export const login = async (params) => {
    return  api.post('/auth/login', params);
};

export const logout = async () => {
    return  api.post('/auth/logout');
};

export const product = async () => {
    return  api.get('/product');
};

export const checkAuthApi = async () => {
    return  axios.get('http://localhost:5000/api/auth/refresh', {withCredentials: true});
};
