import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import userAuthService from "../../api/services/userAuthService";
import { logout } from "../../redux/slices/auth";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { LogOut, User, Crown, ShieldCheck } from "lucide-react";
import { Avatar,AvatarFallback, AvatarImage } from "@/shadcn/ui/avatar";

function UserNav() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [offCanvas, setOffCanvas] = useState(false);
  const [logginOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      setLoggingOut(true);
      await userAuthService.logout();
      dispatch(logout());
      sessionStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      setLoggingOut(false);
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      setLoggingOut(false);
      toast.error(error.toString());
    }
  };

  return (
    <div
      onMouseEnter={() => setOffCanvas(true)}
      onMouseLeave={() => setOffCanvas(false)}
    >
      {/* <div className="rounded-full h-7 w-7  md:h-10 md:w-10 cursor-pointer">
        <img src={user?.avatarUrl} alt="" className="rounded-full" />
      </div> */}
      <Avatar className="h-7 w-7  md:h-10 md:w-10 cursor-pointer">
        <AvatarImage src={user?.avatarUrl} />
        <AvatarFallback>
          <User color="#6b7280" size={24} />
        </AvatarFallback>
      </Avatar>

      <div
        className={`absolute z-[5] right-[0%] top-8 md:top-10 ${
          offCanvas ? "" : "hidden"
        }`}
      >
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="rounded-full h-7 w-7 border-1 md:h-10 md:w-10">
              <img
                src={user?.avatarUrl}
                alt="profile"
                className="rounded-full"
              />
            </div>
            <div className="ml-2">
              <p className="text-sm -ml-2.5 md:ml-0 md:text-lg font-bold">
                {user?.fullName}
              </p>
              <p className="text-xs md:text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
          <div className=" w-full flex flex-col mt-5 text-left text-sm md:text-base">
            <ul className="list-none">
              <li className=" text-lightBlack hover:text-primaryBlue pb-2">
                {user?.role == "admin" && (
                  <Link to={"/admin"}>
                    <ShieldCheck
                      color="#6b7280"
                      size={16}
                      className="inline mr-2"
                    />
                    admin
                  </Link>
                )}
              </li>
              <li className="border-t-[1px] py-1 md:py-2 rounded-md text-lightBlack hover:text-primaryBlue ">
                <Link to={`/me`}>
                  <User color="#6b7280" size={16} className="inline mr-2" />
                  Profile
                </Link>
              </li>
              <li className="border-t-[1px] py-1 md:py-2 rounded-md  text-lightBlack hover:text-primaryBlue">
                <Link>
                  <Crown color="#6b7280" size={16} className="inline mr-2" />
                  Leaderboard
                </Link>
              </li>
              <li className="border-t-[1px] py-1 md:py-2 rounded-md  text-lightBlack hover:text-alert">
                <span className="cursor-pointer" onClick={handleLogOut}>
                  <LogOut color="#6b7280" size={16} className="inline mr-2" />
                  logout
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserNav;
