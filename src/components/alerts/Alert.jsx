import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setError, clearError } from "../../redux/slices/appError";
import { clearSuccess } from "../../redux/slices/appSuccess";

const Alert = ({ message, type, }) => {
  const dispatch = useDispatch();
  const removeAlert = () => {
    dispatch(clearError(""));
    dispatch(clearSuccess(""));
  }



  if (type === "error") {
    return (
      <div
        className={` min-w-[250px] fixed mx-auto z-[100] left-1/2 -translate-x-1/2 top-16 md:top-24 flex items-center justify-between px-5 py-3 md:px-5 md:py-5 mb-5 leading-normal text-red-600 bg-red-100 rounded-lg`}
        role="alert"
      >
        <p>{message}</p>
        <span className="ml-5 cursor-pointer" onClick={removeAlert}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
      </div>
    );
  } else if (type === "success") {
    return (
      <div
        className="min-w-[250px] fixed mx-auto z-[100] left-1/2 -translate-x-1/2 top-16 md:top-24 flex items-center justify-between px-5 py-3 md:p-5 mb-5 leading-normal text-green-600 bg-green-100 rounded-lg"
        role="alert"
      >
        <p>{message}</p>
        <span className="ml-5 cursor-pointer" onClick={removeAlert}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
      </div>
    );
  }
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Alert;
