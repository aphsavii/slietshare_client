import PropTypes from 'prop-types';
const BtnPrimary = ({
    onClick,
    text,
    isDisabled=false,
    isLoading=false
  }) => {
return(
<button
  onClick={onClick}
  disabled={isDisabled}
  className="bg-primaryBlue hover:bg-opacity-80 text-xs md:text-base  text-white font-bold py-1.5 md:py-2  px-2 md:px-4 rounded focus:outline-none focus:ring-2 focus:ring-primaryBluer"
>
  {isLoading ? (
    <div className="animate-spin rounded-full h-5 w-5 border-t-[3px] border-b-[3px] border-grayish"></div>
  ) : (
    text
  )}
</button>
)
};

BtnPrimary.propTypes = {
  onClick: PropTypes.func.isRequired, 
  text: PropTypes.string.isRequired, 
  isDisabled: PropTypes.bool, 
  isLoading: PropTypes.bool, 
};


export default BtnPrimary;