// Qs Service
import { apiHandler } from "../utils/apiHandler";
import { axiosAuthInstance, axiosInstance } from "../middlewares/axiosInstance";

const qsService = {
    searchQs : async(query)=>{
        query = query.trim().replaceAll('-','');
        if(query.length<7 && query.includes(' ')) query = query.replace(' ','');
        const {data,error}= await apiHandler(()=> axiosInstance.get("/qs/search",{params:{q:query}}));
        if(error) return error;
        return data;
    },
    uploadQs: async(requestOptions)=>{
        const {data, error} = await apiHandler (()=> axiosAuthInstance.post("qs/upload",requestOptions,{withCredentials:true}));
        if(error) return error;
        return data;
    },
    deleteQs: async(qsId)=>{
        const {data, error} = await apiHandler (()=> axiosAuthInstance.delete(`qs/delete/${qsId}`,{withCredentials:true}));
        if(error) return error;
        return data;
    },
    getUserQs: async({pageParam,limit, regno})=>{
        const {data, error} = await apiHandler (()=> axiosAuthInstance.get(`qs/user/${regno}?page=${pageParam}&limit=${limit}`,{withCredentials:true}));
        return data ?? error;
    }

}

export default qsService;