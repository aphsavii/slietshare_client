import Header from "./components/Header/Navbar";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import CtaSticky from "./components/cta/CtaSticky";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "./redux/slices/auth";
import { jwtDecode } from "jwt-decode";
import userAuthService from "./api/services/userAuthService";
import { setAppLoading } from "./redux/slices/appLoading";

function Layout() {
  const {pathname} = useLocation() ;
   const isLoginSignup = pathname === '/login' || pathname === '/register';

    useEffect(() => {
      window.scrollTo(0, 0);
    },[pathname]);

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
        dispatch(setAppLoading(false));
        dispatch(loginFailure('Session expired'));
      }
    });
  
  

  return (
    <>
      <Header />
      <div className="bg-body w-full  bg-gray-200">
        {/* {error && <Alert message={error} type="error" />} */}
        {!isLoginSignup && <CtaSticky></CtaSticky>}
      <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
