const resetLocalAuth = () => {
    sessionStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    localStorage.removeItem('refreshToken');
} 

const setLocalAuth = (user, accessToken,refreshToken) => {
    sessionStorage.setItem('accessToken', accessToken);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('refreshToken', refreshToken);
} 
 
const setAuthUser = (user)=>{
    localStorage.setItem('user', JSON.stringify(user));
}
export  {resetLocalAuth,setLocalAuth, setAuthUser}