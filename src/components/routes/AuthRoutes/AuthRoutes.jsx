import { Outlet, Navigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useEffect } from 'react';
import { loginSuccess,loginFailure } from '../../../redux/slices/auth';
import { jwtDecode } from 'jwt-decode';
import userAuthService from '../../../api/services/userAuthService';
import { setAppLoading } from '../../../redux/slices/appLoading/index.js';


const AuthRoutes = () => {
  const dispatch = useDispatch();
  const accessToken = sessionStorage.getItem('accessToken');
  const user = JSON.parse(localStorage.getItem('user'));
  const refreshToken = localStorage.getItem('refreshToken');
  const isRefreshTokenValid = refreshToken && jwtDecode(refreshToken).exp > Date.now() / 1000;
  useEffect(() => {
    if (accessToken && user && isRefreshTokenValid) {
      dispatch(loginSuccess({ user, accessToken, refreshToken }));
      return;
    }
    if (isRefreshTokenValid && !accessToken) {
      dispatch(setAppLoading(true));
      userAuthService.refreshTokens().then((res) => {
        if (res?.user && res?.accessToken) {
          dispatch(loginSuccess({ user: res.user, accessToken: res.accessToken, refreshToken: res.refreshToken }));
        }
        dispatch(setAppLoading(false));
      }).catch((e) => {
        console.error(e);
        dispatch(setAppLoading(false));
        dispatch(loginFailure('Session expired'));
      })
    }
    else {
      dispatch(loginFailure('Session expired'));
    }
  });

  return (
    accessToken ? <Outlet /> : <Navigate to='/noAuth' />
  )
}

export default AuthRoutes;