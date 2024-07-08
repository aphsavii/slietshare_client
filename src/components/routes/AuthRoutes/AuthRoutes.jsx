import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "@/redux/slices/auth";
import { jwtDecode } from "jwt-decode";
import userAuthService from "@/api/services/userAuthService";
import { setAppLoading } from "@/redux/slices/appLoading";
import toast from "react-hot-toast";


const AuthRoutes = () => {
  // const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const accessToken = sessionStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user"));
  const refreshToken = localStorage.getItem("refreshToken");
  const isRefreshTokenValid = refreshToken && jwtDecode(refreshToken).exp > Date.now() / 1000;
  const navigate =  useNavigate();

  useEffect(() => {
    if (accessToken && user && isRefreshTokenValid) {
      dispatch(loginSuccess({ user, accessToken, refreshToken }));
      setLoading(false);
      return;
    }
    if (isRefreshTokenValid && !accessToken) {
      dispatch(setAppLoading(true));
      userAuthService
        .refreshTokens()
        .then((res) => {
          if (res?.user && res?.accessToken) {
            dispatch(
              loginSuccess({
                user: res.user,
                accessToken: res.accessToken,
                refreshToken: res.refreshToken,
              })
            );
          }
          dispatch(setAppLoading(false));
        })
        .catch((e) => {
          console.error(e);
          dispatch(setAppLoading(false));
          toast.error("Session Expired, please Login again...");
          dispatch(loginFailure("Session expired"));
          navigate('/login');
        });
    } else {
      dispatch(setAppLoading(false));
      toast.error(" please Login...");
      dispatch(loginFailure("Session expired"));
      navigate('/login');
    }
  }, [accessToken, dispatch, isRefreshTokenValid, refreshToken, user]);


  return (
 <Outlet />
  )
}

export default AuthRoutes;