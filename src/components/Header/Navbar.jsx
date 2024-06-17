import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UserNav from "./UserNav";
import { Button } from "/shadcn/ui/Button";
const Navbar = () => {
  const isLoginPage = useLocation().pathname === '/login';
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <div className="w-full bg-primaryBlue sticky z-[30] top-0">
      <nav className="container  relative mx-auto text-center flex items-center justify-center h-10 md:h-16  text-lg md:text-2xl  bg-primaryBlue ">
        <Link to="">
          <h1 className="text-white font-bold tracking-wider">SLIETshare</h1>
        </Link>
        {!isAuthenticated && !isLoginPage && <Link to="/login" className="absolute right-0">
           <Button className="mr-1" variant="secondary" size="responsive">Login</Button>
        </Link>}
        {!isAuthenticated && isLoginPage && <Link to="/register" className="absolute right-0">
          <Button className="mr-1" variant="secondary" size="responsive">Register</Button>
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
