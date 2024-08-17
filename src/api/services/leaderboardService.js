import { apiHandler } from "../utils/apiHandler";
import { axiosAuthInstance } from "../middlewares/axiosInstance";

const leaderboardService = {
    getGFGLeaderboard : async()=>{
        const {data,error} = await apiHandler(()=> axiosAuthInstance.get(`leaderboard/gfg`));
        return data ?? error;
    },
    getCodeforcesLeaderboard : async()=>{
        const {data,error} = await apiHandler(()=> axiosAuthInstance.get(`leaderboard/codeforces`));
        return data ?? error;
    },
    getLeetcodeLeaderboard : async()=>{
        const {data,error} = await apiHandler(()=> axiosAuthInstance.get(`leaderboard/leetcode`));
        return data ?? error;
    }
}

export default leaderboardService;