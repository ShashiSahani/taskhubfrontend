import PropTypes from "prop-types";

export const Input=({placeholder,value,onChange,className})=>{
    return(
        <input
type="text"
value={value}
onChange={onChange}
placeholder={placeholder}
className={`border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500${className}`}
        />

    )
}

Input.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
  };