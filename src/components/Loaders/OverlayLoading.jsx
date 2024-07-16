/* eslint-disable react/no-unescaped-entities */
import PropTypes from "prop-types";
import { useEffect } from "react";

const OverlayLoading = ({ title = "Loading...", message = "please wait a moment..." }) => {
  useEffect(() => {
    // Block scroll when component mounts
    const html = document.querySelector("html");
    const body = document.querySelector("body");

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    // Allow scroll when component unmounts
    return () => {
      html.style.overflow = "auto";
      body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-45 overflow-hidden bg-gray-600 bg-opacity-70 flex flex-col items-center justify-center">
      <div className="flex justify-center items-center mb-5">
        <div className="animate-spin rounded-full h-10 w-10 border-t-[3px] border-b-[3px] border-primaryBlue"></div>
      </div>
      <div className="min-w-72 text-center flex flex-col items-center">
      <h2 className="text-lg text-center text-white md:text-xl font-semibold w-full">{title}</h2>
      <p className="text-center font-normal text-gray-300 text-sm md:text-lg w-full">{message}</p>
      </div>
     
    </div>
  );
};

OverlayLoading.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
};

export default OverlayLoading;