import { apiHandler } from "../utils/apiHandler";
import { axiosAuthInstance } from "../middlewares/axiosInstance";

const postService = {
  getPostById: async (postId)=>{
    const {data,error} = await apiHandler(()=> axiosAuthInstance.get(`post/${postId}`))
    return data ?? error;
  },
  createPost : async (formData) => {
    const { data, error } = await apiHandler(() =>
      axiosAuthInstance.put("post/create", formData)
    );
    return data ?? error;
  },
  postUnlike: async (postId) => {
    const { data, error } =  await apiHandler(() =>
       axiosAuthInstance.delete(`post/unlike/${postId}`)
    );
    return data ?? error;
  },

  deleteComment: async (postId, commentId) => {
    const { data, error } = await apiHandler(() =>
      axiosAuthInstance.delete(`post/comment/${postId}/${commentId}`)
    );
    return data ?? error;
  },

  getUserPosts: async ({pageParam,limit, regno}) => {
    const { data, error } = await apiHandler(() =>
      axiosAuthInstance.get(`post/user/${regno}?page=${pageParam}&limit=${limit}`)
    );
    return data ?? error;
  }
};

export default postService;