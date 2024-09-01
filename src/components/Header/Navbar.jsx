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
import { useEffect } from "react";
import chatService from "@/api/services/chatService";
import { useDispatch } from "react-redux";
import { setChats } from "@/redux/slices/chats";

const Navbar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    chatService.getRecentChats().then((res) => {
      dispatch(setChats(res));
    });
  },[]);
  let unreadCount = 0;
  const recentChats = useSelector((state) => state.chats.chats);
  recentChats.forEach((chat) => {
    if (chat.isUnreadMessages) unreadCount++;
  });
  const isLoginPage = useLocation().pathname === "/login";
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <div className="w-full bg-primaryBlue sticky z-[30] top-0 shadow-lg">
      <nav className="container mx-auto relative  text-center flex items-center justify-between  h-[8vh] md:h-[8vh]  text-lg md:text-2xl  bg-primaryBlue ">
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
                <FileSpreadsheet className="text-white h-5 w-5 md:h-7 md:w-7 cursor-pointer" />
              </Link>
              <UserSearch />
              <Link to="/chat">
                <div>
                  <MessageSquare className="text-white h-5 w-5 md:h-7 md:w-7 cursor-pointer" />
                  {unreadCount > 0 && (
                    <span className="absolute h-3 w-4 md:h-4 md:w-6 bg-red-500 rounded-full top-4 md:top-4 text-white font-medium text-[10px] leading-3 md:text-xs">
                      {unreadCount}
                    </span>
                  )}
                </div>
              </Link>
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
