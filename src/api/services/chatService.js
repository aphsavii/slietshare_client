import { apiHandler } from "../utils/apiHandler";
import { axiosAuthInstance } from "../middlewares/axiosInstance";
const chatService = {
  getConversation: async (regno) => {
    const { data, error } = await apiHandler(() =>
      axiosAuthInstance.get(`/chat/conversation/${regno}`)
    );
    return data ?? error;
  },
  getRecentChats: async () => {
    const { data, error } = await apiHandler(() =>
      axiosAuthInstance.get("/chat/recent")
    );
    return data ?? error;
  }
};



export default chatService;
