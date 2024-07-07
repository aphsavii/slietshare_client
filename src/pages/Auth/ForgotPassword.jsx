import { useState } from "react";
import { Button } from "@/shadcn/ui/Button.jsx";
import toast from "react-hot-toast";
import userAuthService from "@/api/services/userAuthService";
import { useNavigate } from "react-router";
function ForgotPassword() {
  const [otpGenerated, setOtpGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const validateOtpForm = () => {
    if (otp.length < 6) {
      return {
        isValid: false,
        message: "OTP must be 6 digits long",
      };
    }
    if (password.length < 8) {
      return {
        isValid: false,
        message: "Password must be atleast 8 characters long",
      };
    }
    if (password !== confirmPassword) {
      return {
        isValid: false,
        message: "Passwords do not match",
      };
    }
    return {
      isValid: true,
      message: "",
    };
  };

  const handleOtpGeneration = async () => {
    const emailregex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailregex.test(email)) {
      toast.error("Invalid Email Format");
      return null;
    }
    setLoading(true);
    try {
      await userAuthService.generateOTP({ email });
      toast.success("Otp sent to your email.");
      setOtpGenerated(true);
    } catch (error) {
      toast.error(error.toString());
    }
    setLoading(false);
    return null;
  };

  const handlePasswordReset = async () => {
    setLoading(true);
    try {
      await userAuthService.forgotPassword({
        otp,
        email,
        password,
      });
      toast.success("Password Reset Successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.toString());
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="container px-4 flex items-center justify-center min-h-[600px] md:min-h-[800px] mx-auto">
      <div className="max-w-sm bg-white rounded-lg shadow-md w-full md:max-w-md lg:max-w-lg mx-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Reset Password
          </h2>
          <p className="text-gray-700 mb-6">
          Oops, Forgot Again? Reset Here!
          </p>
          {!otpGenerated && (
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="email"
              >
                College Email
              </label>
              <input
                className="relative shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBlue"
                id="email"
                type="text"
                placeholder="email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                disabled={loading}
                loading={loading}
                className="mt-4"
                variant="primary"
                onClick={handleOtpGeneration}
              >
                Continue
              </Button>
            </div>
          )}
          {otpGenerated && (
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="otp"
              >
                OTP
              </label>
              <input
                className="relative shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBlue"
                id="otp"
                type="text"
                placeholder="OTP"
                autoComplete="off"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="password"
              >
                New Password
              </label>
              <input
                className="relative shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBlue"
                id="password"
                type="password"
                placeholder="Password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className="relative shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBlue"
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                autoComplete="off"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div>
                <Button
                  className="mt-4"
                  size="sm"
                  variant="secondary"
                  onClick={() => setOtpGenerated(false)}
                >
                  Back
                </Button>
                <Button
                  loading={loading}
                  disabled={loading}
                  className="mt-4"
                  variant="primary"
                  onClick={handlePasswordReset}
                >
                  Reset Password
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
