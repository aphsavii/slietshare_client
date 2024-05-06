import Header from "./components/Header/Navbar";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import CtaSticky from "./components/cta/CtaSticky";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearError } from "./redux/slices/appError";
import { clearSuccess } from "./redux/slices/appSuccess";

function Layout() {
  const dispatch = useDispatch();
  const {pathname} = useLocation() ;
   const isLoginSignup = pathname === '/login' || pathname === '/register';

    useEffect(() => {
      window.scrollTo(0, 0);
    },[pathname]);
    const { isError, errorMsg} = useSelector((state) => state.error);
    const { isSuccess,successMsg } = useSelector((state) => state.success);
  
  
    useEffect(()=>{
        dispatch(clearError());
        dispatch(clearSuccess());
    },[pathname])

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
