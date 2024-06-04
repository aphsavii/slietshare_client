import Header from "./components/Header/Navbar";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import CtaSticky from "./components/cta/CtaSticky";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function Layout() {
  const {pathname} = useLocation() ;
   const isLoginSignup = pathname === '/login' || pathname === '/register';

    useEffect(() => {
      window.scrollTo(0, 0);
    },[pathname]);

  

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
