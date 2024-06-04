import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import userAuthService from "../../api/services/userAuthService";
import { logout } from "../../redux/slices/auth";
import BtnGray from "../buttons/BtnGray";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

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
      sessionStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      setLoggingOut(false);
      toast.success("Logged out successfully");
      navigate('/');
    } catch (error) {
      setLoggingOut(false);
      toast.error(error.toString());
    }
  }

  return (

    <div onMouseEnter={() => setOffCanvas(true)} onMouseLeave={() => setOffCanvas(false)}>
      <div className="rounded-full h-7 w-7  md:h-10 md:w-10 cursor-pointer" >
        <img src={user?.avatarUrl} alt="profile" className="rounded-full" />
      </div>
      <div className={`absolute z-[5] right-[20%] ${offCanvas ? '' : 'hidden'}`}>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="rounded-full h-7 w-7 border-1 md:h-10 md:w-10">
              <img src={user?.avatarUrl} alt="profile" className="rounded-full" />
            </div>
            <div className="ml-2">
              <p className="text-sm -ml-2.5 md:ml-0 md:text-lg font-bold">{user?.fullName}</p>
              <p className="text-xs md:text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
          <div className=" w-full flex justify-between mt-5">
           {user?.role=="admin" && <Link to={'/admin'}><BtnGray text="admin" /></Link>}
            <Link to={`/user/${user?.regno}`}><BtnGray text="Profile" /></Link>
            <BtnGray onClick={handleLogOut} text="Logout" isLoading={logginOut} isDisabled={logginOut} />
          </div>
        </div>
      </div>
    </div>

  )
}

export default UserNav