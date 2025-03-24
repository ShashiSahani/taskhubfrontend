import PropTypes from "prop-types";
const Spinner = ({ size = "24px", color = "white" }) => {
    return (
      <svg
        className="animate-spin"
        width={size}
        height={size}
        viewBox="0 0 50 50"
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke={color}
          strokeWidth="4"
          fill="none"
        />
      </svg>
    );
  };
  Spinner.propTypes = {
    size: PropTypes.string,
    color: PropTypes.string,
  };
  export default Spinner;
  