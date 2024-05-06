// error 404
import PropTypes from 'prop-types';
const Error = (
    {
        message = "Something went wrong"
    }
) => {
    return (
        <div className="mx-auto z-10 text-center">
      <img className='m-auto' src="assets/icons/error.gif"  alt="error" />
        <p className='text-alert  text-base md:text-lg  m-auto'>{message}</p>
        </div>
    );
}

Error.propTypes = {
    message: PropTypes.string
}

export default Error;
