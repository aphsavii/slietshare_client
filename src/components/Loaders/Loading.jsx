// loading component

const Loading = () => {
  return (
    <div className="loading aboslute mx-auto my-auto z-10 ">
     <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-10 w-10 border-t-[3px] border-b-[3px] border-primaryBlue"></div>
    </div>
    </div>
  );
};

export default Loading;
