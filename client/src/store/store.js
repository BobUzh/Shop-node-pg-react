import { makeAutoObservable } from "mobx";
import { login, registration, logout, checkAuthApi } from '../api/authApi';


export default class Store {
    user = {};
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    async login(params) {
        try {
            const response = await login(params);
            localStorage.setItem('token', response?.data?.accessToken);
            console.log('response');
            console.log(response);
            this.setAuth(true);
            this.setUser(response?.data?.user);
        } catch (e) {
            if (e.response?.status === 400) {
                return Promise.resolve({message: e.response.data});
            } else {
                return Promise.resolve({message: 'Bad request'});
            }
        }
    }

    async logout() {
        try {
            const response = await logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser(null);
        } catch (e) {
            console.log('error store');
            console.log(e);
        }
    }

    async registration(params) {
        try {
            const response = await registration(params);
            localStorage.setItem('token', response?.data?.accessToken);
            this.setAuth(true);
            this.setUser(response?.data?.user);
        } catch (e) {
            return  Promise.reject(e);
        }
    }

    async checkAuth() {
        try {
            console.log('checkAuth-1')
            const response = await checkAuthApi();
            localStorage.setItem('token', response?.data?.accessToken);
            console.log('checkAuth-2')
            console.log(response?.data)
            this.setAuth(true);
            this.setUser(response?.data?.user);
        } catch (e) {
            console.log('check error');
            console.log(e);
        }
    }
}