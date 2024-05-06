const apiHandler = async (apiCall)=>{
    try {
      const res =  await apiCall();
        return Promise.resolve(res.data)   
    } catch (error) {
        return Promise.reject(error?.response?.data?.message || error?.message || "Something went wrong");
    }
}
export {apiHandler}