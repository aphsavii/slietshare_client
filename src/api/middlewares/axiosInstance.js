import axios from 'axios';
import {jwtDecode} from 'jwt-decode'
import userAuthService from '../services/userAuthService';
import {setLocalAuth} from '../../helpers/LocalAuth';

let baseURL = window.location.origin.includes('localhost') ? 'http://localhost:5050' : 'https://slietshare-server.onrender.com/';
if(window.location.origin.includes('slietshare-client-um2t')) baseURL = 'https://slietshare-server-2lbv.onrender.com';

const axiosAuthInstance = axios.create({
    baseURL: baseURL,
},
);

const axiosInstance = axios.create({
    baseURL: baseURL,
});

axiosInstance.interceptors.request.use(async (req)=>{
    const refreshToken = localStorage.getItem('refreshToken');
    if(refreshToken) req.headers.Authorization = `Bearer ${refreshToken}`;
    return req;
}
);



axiosAuthInstance.interceptors.request.use(async (req)=>{
    const accessToken = sessionStorage.getItem('accessToken');
     if(!accessToken) return Promise.reject('No access token found');
    req.headers.Authorization = `Bearer ${accessToken}`;
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