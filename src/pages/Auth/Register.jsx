/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Select from "../../components/inputs/Select";
import { PROGRAMMES, TRADES, getBatchYears } from "../../constant.js";
import {  useForm } from "react-hook-form";
import {userAuthService} from "../../api/services/userAuthService";
import { useNavigate } from "react-router";
import OverlayLoading from "../../components/Loaders/OverlayLoading";
import Timer from "../../components/timer/Timer.jsx";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();


  const [step, setStep] = useState(1);
  const [password, setPassword] = useState("");
  const [programme, setProgramme] = useState("");
  const [registered,setRegistered] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid }
  } = useForm();

  const onsubmit = async (data) => {
    if (Object.keys(errors).length > 0) {
      console.log(errors)
      return; // Stop the submission if there are errors
    }
    if(step < 2 ) {
     try {
       await userAuthService.generateOTP({email: data.email,name:data.fullName});
        toast.success("OTP sent to your email...");
        setStep(2);
       return;
     } catch (error) {
        setError("root",{message:error.toString()});
      return;
     }
    }
    
    try {
      const regno = data?.email.slice(0,7);
       await userAuthService.register({regno,...data});
        toast.success("Registration Successful. Redirecting to login page...");
        setTimeout(() => {
          setRegistered(true);
        }, 1000);
    } catch (error) {
      setError("root",{message:error.toString()});
    }
  }


  const handleBack = () => {
    setStep(step - 1);
  };

  useEffect(() => {
    if(errors.root) {
      toast.error(errors.root.message);
    }
    if(registered) navigate("/login");
  }, [errors.root, navigate, registered]);

  return (
    <>
    {isSubmitting && step<2 && ( <OverlayLoading title="Sending Otp" message="Please wait a moment..." /> )}
    {isSubmitting && step>1 && ( <OverlayLoading title="Registering" message="Please wait a moment..." /> )}
    <div className="container py-10  px-4 flex items-center justify-center min-h-[600px] md:min-h-[800px] mx-auto">
      <div className="max-w-sm bg-white p-6 rounded-lg shadow-md w-full md:max-w-md lg:max-w-lg mx-auto">
        <form onSubmit={handleSubmit(onsubmit)}>
          <h2 className="text-lg font-medium mb-4">Step {step} of 2</h2>
          <div className="flex mb-4">
            <div
              className={`w-1/2 border-r border-gray-400 ${step === 1 ? "bg-primaryBlue text-white" : "bg-gray-200"
                } p-2 text-center cursor-pointer`}
              onClick={() => setStep(1)}
            >
              Step 1
            </div>
            <div
              className={`w-1/2 ${step === 2 ? "bg-primaryBlue text-white" : "bg-gray-200"
                } p-2 text-center cursor-pointer`}
              onClick={() => {
                if(!isValid) return;
                setStep(2)}}
            >
              Step 2
            </div>
          </div>
          {step === 1 ? <Step1 register={register} errors={errors} programme={programme} setProgramme={setProgramme} /> : <Step2 register={register} errors={errors} password={password} setPassword={setPassword} />}
          <div className="flex gap-2 mt-6">
            {step > 1 && (
              <>
                <button
                  className="bg-gray-300 px-6 py-1.5 rounded-lg text-gray-700 hover:bg-gray-400"
                  onClick={handleBack}
                >
                  Back
                </button>
                <button type="submit" className="bg-primaryBlue px-6 py-1.5 rounded-lg text-white hover:bg-primaryBlue">Register</button>
              </>
            )}
            {step < 2 && (
              <button type="submit" 
                className="bg-primaryBlue px-6 py-1.5 rounded-lg text-white hover:bg-primaryBlue"
              >
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

const Step1 = ({ register, errors,programme,setProgramme }) => (
  <div>
    <div className="mb-4">
      <label
        className="block text-gray-700 font-bold mb-2"
        htmlFor="email">
        College Email
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBlue"
        id="email"
        type="text"
        placeholder="email" autoComplete="off"
        {...register("email", {
          required: "Email is required",
          validate: (value) => {
            const emailPattern = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9-]{2,4}$/;
            return emailPattern.test(value) && value.includes('sliet.ac.in') || "Invalid email format";
          }
        })} />
      {
        errors?.email &&
        (<p className="absolute ml-1 mt-0.5 text-xs text-alert">
          {errors?.email?.message}
        </p>)
      }
    </div>
    <div className="mb-4">
      <label
        className="block text-gray-700 font-bold mb-2"
        htmlFor="fullName">
        Full Name
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBlue"
        id="fullName"
        type="text"
        placeholder="name"
        {...register("fullName", { required: "Full name is required" })}
      />
      {
        errors?.fullName &&
        (<p className="absolute ml-1 mt-0.5 text-xs text-alert">
          {errors?.fullName?.message}
        </p>)
      }
    </div>
    <div className="mb-4">
      <Select title={'Programme'} options={PROGRAMMES} register={register} setValue={setProgramme} />
      {
        errors?.programme &&
        (<p className="absolute ml-1 mt-0.5 text-xs text-alert">
          {errors?.programme?.message}
        </p>)
      }
    </div>
    <div className="mb-4">
      <Select title={'Trade'} options={TRADES[programme]} register={register} />
      {
        errors?.trade &&
        (<p className="absolute ml-1 mt-0.5 text-xs text-alert">
          {errors?.trade?.message}
        </p>)
      }
    </div>
    <div className="mb-4">
      <Select title={'Batch'} options={getBatchYears()} register={register} />
      {
        errors?.batch &&
        (<p className="absolute ml-1 mt-0.5 text-xs text-alert">
          {errors?.batch?.message}
        </p>)
      }
    </div>
  </div>
);
const Step2 = ({ register, errors:errorsObj, password, setPassword }) => (
  <div>
    <h3 className="text-lg font-medium mb-4">Step 2</h3>
    <div className="mb-4">
      <label
        className="block text-gray-700 font-bold mb-2"
        htmlFor="password"
      >
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBlue"
        placeholder="Password"
        {...register("password", { required: "Password is required" })}
        onChange={(e) => setPassword(e.target.value)}
      />
      {
        errorsObj?.password &&
        (<p className="absolute ml-1 mt-0.5 text-xs text-alert">
          {errorsObj?.password?.message}
        </p>)
      }
    </div>
    <div className="mb-4">
      <label
        className="block text-gray-700 font-bold mb-2"
        htmlFor="confirmPassword"
      >
        Confirm Password
      </label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBlue"
        placeholder="Confirm Password"
        {...register("confirmPassword", {
          required: "Confirm Password is required",
          validate: (value) => value === password || "Passwords do not match",
        })
        }
      />
    {
      errorsObj?.confirmPassword &&
      (<p className="absolute ml-1 mt-0.5 text-xs text-alert">
        {errorsObj?.confirmPassword?.message}
      </p>)
    }
    </div>
    <div className="mb-4">
      <label htmlFor="otp" className="block text-gray-700 font-bold mb-2">OTP</label>
      <input
        type="number"
        id="otp"
        name="otp"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBlue"
        placeholder="OTP"
        maxLength={6}
        {...register("otp", { required: "OTP is required", minLength: { value: 6, message: "OTP must be 6 digits" }} )}
      />
      {
        errorsObj?.otp &&
        (<p className="absolute ml-1 mt-0.5 text-xs text-alert">
          {errorsObj?.otp?.message}
        </p>)
      }
    </div>
    <div id="note" className="max-w-[400px] mt-2">
      <p className="text-xs text-alert md:text-sm ml-1 md:ml-2">Otp expiring in <span className="text-primaryBlue">{<Timer minutes={5}/>}</span>  </p>
    </div>
  </div>
);

export default Register;