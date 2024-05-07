// ButtonLoader component

const ButtonLoader = ({color = 'primary'}) => {
    return (
      <div className="ButtonLoader aboslute mx-auto my-auto z-10 ">
       <div className="flex justify-center items-center">
        <div className={`animate-spin rounded-full h-5 w-5 border-t-[3px] border-b-[3px] border-${color}`}></div>
      </div>
      </div>
    );
  };
  
  export default ButtonLoader;