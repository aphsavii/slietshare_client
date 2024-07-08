import Header from "./components/Header/Navbar";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "./redux/slices/auth";
import { jwtDecode } from "jwt-decode";
import userAuthService from "./api/services/userAuthService";
import { setAppLoading } from "./redux/slices/appLoading";
import toast from "react-hot-toast";

function Layout() {
  // const { pathname } = useLocation();

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [pathname]);

 
  return (
    <>
      <Header />
      <div className="bg-body w-full  bg-gray-200">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
