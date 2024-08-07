import userAuthService from "../../api/services/userAuthService";
import {  useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { loginSuccess } from "../../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import {setLocalAuth} from "../../helpers/LocalAuth";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import FullScreenLoader from "@/components/Loaders/FullScreenLoader";

const Login = () => {
const dispatch = useDispatch();
const navigate = useNavigate();

  const {isAuthenticated} = useSelector(state => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const res = await userAuthService.login({ email, password });
      const { loggedInUser, accessToken, refreshToken } = res;
      dispatch(loginSuccess({ user: loggedInUser, accessToken, refreshToken }));
      toast.success("Login successfull");
      setLocalAuth(loggedInUser, accessToken, refreshToken);
    }
    catch (error) {
      toast.error(error.toString());
    }
  }
  useEffect(() => {
    if(isAuthenticated)  navigate('/');
  }
    , [ isAuthenticated, navigate]);
  

  return (
    <>
      {isSubmitting && (
        <FullScreenLoader text={`Loggin you in...`} />
       )}

      <div className="container px-4 flex items-center justify-center min-h-[600px] md:min-h-[800px] mx-auto">
        <div className="max-w-sm bg-white  rounded-lg shadow-md w-full md:max-w-md lg:max-w-lg mx-auto">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome Back!
            </h2>
            <p className="text-gray-700 mb-6">Please sign in to your account</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="email"
                >
                  College Email
                </label>
                <input
                  {...register("email", {
                    required: "Email is required", validate: (value) => {
                      const emailPattern = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9-]{2,4}$/;
                      return emailPattern.test(value) && value.includes('sliet.ac.in') || "Invalid email format";
                    }
                  })}
                  className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBlue"
                  id="email"
                  type="text"
                  placeholder="email"
                  autoComplete="off"
                />
                {errors?.email && (
                  <p className="absolute ml-1 mt-0.5 text-xs text-alert">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  {...register("password", { required: "password is required" })}
                  className="  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBlue"
                  id="password"
                  type="password"
                  placeholder="Password"
                />
                {errors?.password && (
                  <p className="absolute ml-1 mt-0.5 text-xs text-alert">
                    {errors.password.message}{" "}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-primaryBlue hover:bg-opacity-80  text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-primaryBlue"
                  type="submit"
                >
                  Sign In
                </button>
                <Link to={'/forgot-password'} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                  Forgot Password?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
