import React from "react";
import Header from "./components/Header/Navbar";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CreatePost from "./components/Post/CreatePost";
import { toggleCreatePost } from "./redux/slices/popups";
function Layout() {
  // const { pathname } = useLocation();

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [pathname]);
  const dispatch = useDispatch();
  const { createPost } = useSelector((state) => state.popup);

  return (
    <>
      <Header />
      <div className="bg-body w-full  bg-gray-200">
        {createPost && (
          <CreatePost onClose={() => dispatch(toggleCreatePost())} />
        )}
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
