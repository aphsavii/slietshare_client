import axios from 'axios';
import { useSelector } from 'react-redux';
import {jwtDecode} from 'jwt-decode'
import userAuthService from '../services/userAuthService';
import setLocalAuth from '../../helpers/setLocalAuth';

const baseURL = window.location.origin.includes('localhost') ? 'http://localhost:5050' : 'https://slietshare-server.onrender.com/';

const axiosAuthInstance = axios.create({
    baseURL: baseURL,
},
);

const axiosInstance = axios.create({
    baseURL: baseURL,
});

axiosAuthInstance.interceptors.request.use(async (req)=>{
    const accessToken = sessionStorage.getItem('accessToken');
    if(!accessToken) return Promise.reject('No access token found');
    if (accessToken) {
        const decodedToken = jwtDecode(accessToken);
        if (decodedToken.exp * 1000 < Date.now()) {
            const res =   await userAuthService.refreshTokens();
            setLocalAuth(res.user,res.accessToken,res.refreshToken);
        }
    }
    return req;
}, (error) => {
    return Promise.reject(error);
});

axiosAuthInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        return Promise.reject(error);
    }
);

export { axiosAuthInstance, axiosInstance };