import {setLocalAuth} from "../../helpers/LocalAuth";
import { axiosInstance } from "../middlewares/axiosInstance";
import { apiHandler } from "../utils/apiHandler";


export const userAuthService = {
    register: async (req) => {
        const {data, error} = await apiHandler(async () => {
            return await axiosInstance.post("/user/register", req,{withCredentials:true});
        });
        if(error) return error;
        return data;
    },
    login : async (req) => {
        const {data,error} = await apiHandler(async () => {
            const res = await axiosInstance.post("/user/login", req,{withCredentials:true});
            return res;
        });
        if(error) return error;
        return data;
    },

    logout: async () => {
        const {data,error} = await apiHandler(async () => {
            return await axiosInstance.get("/user/logout",{withCredentials:true});
        });
        if(error) return error;
        return data;
    },
    generateOTP: async (req) => {
        const {data,error} = await apiHandler(async () => {
            return await axiosInstance.post("/user/generate-otp", req);
        });
        return error ?? data ;
    },
    refreshTokens: async () => {
        const {data,error} = await apiHandler(async () => {
            return await axiosInstance.get("/user/refresh-token");
        });
        if(error) return error;
        setLocalAuth(data.user,data.accessToken,data.refreshToken);
        return data;
    },
    forgotPassword: async (req) =>{
        const {data, error} = await apiHandler(async ()=>{
            return await axiosInstance.post('/user/forgot-password',req)
        })
        return data ?? error ;
    },
    getMyProfile: async () => {
        const {data,error} = await apiHandler(async () => {
            return await axiosInstance.get("/me",{withCredentials:true});
        });
        return data ?? error;
    },
    editMyProfile: async (req) => {
        const {data,error} = await apiHandler(async () => {
            
            return await axiosInstance.post("/user/edit-profile",req,{withCredentials:true});
        });
        return data ?? error;
    }
}

export default userAuthService;