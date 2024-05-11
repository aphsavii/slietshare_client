import { axiosAuthInstance } from "../middlewares/axiosInstance";
import { apiHandler } from "../utils/apiHandler";

const userService = {
    getUserDetails: async (regno) => {
        const {data, error} = apiHandler(()=>axiosAuthInstance.get('user/'+regno));
        return data ?? error ;
    }
}

export default userService;