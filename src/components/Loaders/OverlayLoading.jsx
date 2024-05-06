/* eslint-disable react/no-unescaped-entities */
import PropTypes from "prop-types";

const OverlayLoading = (
    {
        title = "Loading...",
        message = "please wait a moment..."
    }
) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden  bg-gray-700 bg-opacity-75 flex flex-col items-center justify-center">
      <div className="flex justify-center items-center mb-5">
        <div className="animate-spin rounded-full h-10 w-10 border-t-[3px] border-b-[3px] border-primary"></div>
      </div>
      <h2 className="text-center text-white text-xl font-semibold">
            {title}
      </h2>
      <p className="w-1/3 text-center font-normal text-white">
        {message}
      </p>
    </div>
  );
};

OverlayLoading.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
};



export default OverlayLoading;
