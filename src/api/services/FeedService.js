import { axiosAuthInstance } from "../middlewares/axiosInstance"
import { apiHandler } from "../utils/apiHandler"
const FeedService = {
    getFeedPosts : async({pageParam,limit})=>{
        const {data,error} = await apiHandler(()=> axiosAuthInstance.get(`post/feed?page=${pageParam}&limit=${limit}`));
        return data ?? error;
    }
}

export default FeedService;