import Btnsecondary from "../buttons/BtnSecondary";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UserNav from "./UserNav";
const Navbar = () => {
  const isLoginPage = useLocation().pathname === '/login';
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <div className="w-full bg-primary sticky z-[1000] top-0">
      <nav className="container  relative mx-auto text-center flex items-center justify-center h-10 md:h-16  text-lg md:text-2xl  bg-primary ">
        <Link to="">
          <h1 className="text-white font-bold tracking-wider">SLIETshare</h1>
        </Link>
        {!isAuthenticated && !isLoginPage && <Link to="/login" className="absolute right-0">
          <Btnsecondary text="Login" onClick={()=>{}}/>
        </Link>}
        {!isAuthenticated && isLoginPage && <Link to="/register" className="absolute right-0">
          <Btnsecondary text="Register" onClick={()=>{}}/>
        </Link>}
      {isAuthenticated && 
        <div className="absolute right-2">
          <UserNav/>
        </div>      
      }
      </nav>
    </div>
  );
};

export default Navbar;
