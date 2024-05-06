import PropTypes from 'prop-types';
const BtnGray = ({
    onClick,
    text,
    isDisabled=false,
    isLoading=false,
    size="sm"
  }) => {
return(
<button
  onClick={onClick}
  disabled={isDisabled}
  className="align-middle mx-2 my-2 cursor-pointer select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xxs md:text-sm py-2 px-3  rounded-lg  text-white bg-gray-500 shadow-md shadow-gray-900/10  hover:shadow-gray-900/20 hover:opacity-[0.85] hover:shadow-none">
  {isLoading ? (
    <div className="animate-spin rounded-full h-5 w-5 border-t-[3px] border-b-[3px] border-white"></div>
  ) : (
    text
  )}
</button>
)
};

BtnGray.propTypes = {
  onClick: PropTypes.func, 
  text: PropTypes.string.isRequired, 
  isDisabled: PropTypes.bool, 
  isLoading: PropTypes.bool, 
};


export default BtnGray;