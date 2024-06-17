import PropTypes from 'prop-types';
function Select({ title, name=null, options = [], register, setValue = ()=> null}) {
  return (
    <>
      <label className="block text-gray-700 font-bold mb-2" htmlFor={title.toLowerCase().replaceAll(" ","")}>
        {title}
      </label>
      <select
        
        name={name?name:title.toLowerCase().replaceAll(" ","")}
        id={name?name:title.toLowerCase().replaceAll(" ","") }
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBlue"
        {...register(name?name:title.toLowerCase().replaceAll(" ",""), { required: `${title} is required` })}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}

Select.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array,
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func,
};

export default Select;