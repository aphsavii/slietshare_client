import { axiosAuthInstance } from "../middlewares/axiosInstance";
import { apiHandler } from "../utils/apiHandler";

const userService = {
    getMyProfile: async () => {
        const {data,error} = await apiHandler(async () => {
            return await axiosAuthInstance.get("/me",{withCredentials:true});
        });
        return data ?? error;
    },
    editBasicInfo: async(req)=>{
        const {data,error} = await apiHandler(async () => {
            return await axiosAuthInstance.post("/user/edit-basic-profile", req, {
                withCredentials: true,
                headers: {
                    'Cache-Control': 'max-age=3600',
                }
            });
        });
        return data ?? error;
    },
    editMyProfile: async (req) => {
        const {data,error} = await apiHandler(async () => {
            return await axiosAuthInstance.post("/user/edit-profile", req, {
                withCredentials: true,
                headers: {
                    'Cache-Control': 'max-age=3600',
                }
            });
        });
        return data ?? error;
    },
    getUserDetails: async (regno) => {
        const {data, error} = await apiHandler(()=> axiosAuthInstance.get('user/'+regno));
        return data ?? error ;
    }
}

export default userService;