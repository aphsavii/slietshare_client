const setLocalAuth = (user, accessToken,refreshToken) => {
    sessionStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('refreshToken', refreshToken);
} 
export default setLocalAuth;