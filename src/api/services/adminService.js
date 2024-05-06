import {axiosAuthInstance} from "../middlewares/axiosInstance";
import { apiHandler } from "../utils/apiHandler";


export const adminService = {
    getPendingQs: async () => {
        const {data, error} = await apiHandler(async () => {
            return await axiosAuthInstance.get("/qs/pending",{withCredentials:true});
        });
        if(error) return error;
        return data;
    },
    approveQs: async (req) => {
        const {data, error} = await apiHandler(async () => {
            return await axiosAuthInstance.post(`/qs/approve/`+ req, req,{withCredentials:true},);
        });
        if(error) return error;
        return data;
    },
}

export default adminService;