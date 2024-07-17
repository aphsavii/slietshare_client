import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UserNav from "./UserNav";
import { Button } from "@/shadcn/ui/Button";
import { isMobile } from "@/helpers";
import { MessageSquare, FileSpreadsheet } from "lucide-react";
import Notification from "../Notification/Notification";
import UserSearch from "../SearchBar/UserSearch";
import Menu from "../menu/Menu";
import toast from "react-hot-toast";

const Navbar = () => {
  const isLoginPage = useLocation().pathname === "/login";
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <div className="w-full bg-primaryBlue sticky z-[30] top-0">
      <nav className="container mx-auto relative  text-center flex items-center justify-between  h-10 md:h-16  text-lg md:text-2xl  bg-primaryBlue ">
        <div>
          {!isMobile() && (
            <Link to="">
              <h1 className="text-white font-bold tracking-wider">
                SLIETshare
              </h1>
            </Link>
          )}
          {isMobile() && (
            <Link to="">
              <h2 className="-ml-5 text-white relative left-0 font-bold tracking-wider text-lg md:text-2xl">
                SLIETshare
              </h2>
            </Link>
          )}
        </div>
        <div id="links" className="mr-5 flex gap-x-3 md:mr-16 md:gap-x-6">
          {isAuthenticated && (
            <div className="flex gap-x-3  md:gap-x-6">
              <Menu />
              <Link to="/qs">
                <FileSpreadsheet className="text-white h-4 w-4 md:h-7 md:w-7 cursor-pointer" />
              </Link>
              <UserSearch />
              <MessageSquare className="text-white h-4 w-4 md:h-7 md:w-7 cursor-pointer" onClick={()=>toast.success('Coming soon...')} />
              <Notification />
            </div>
          )}
        </div>
        {!isAuthenticated && !isLoginPage && (
          <Link to="/login" className="absolute right-0">
            <Button className="mr-1" variant="secondary" size="responsive">
              Login
            </Button>
          </Link>
        )}
        {!isAuthenticated && isLoginPage && (
          <Link to="/register" className="absolute right-0">
            <Button className="mr-1" variant="secondary" size="responsive">
              Register
            </Button>
          </Link>
        )}
        {isAuthenticated && (
          <div className="absolute right-2">
            <UserNav />
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
