import PropTypes from "prop-types";

export const Button = ({ children, className, onClick, icon: Icon }) => {
  return (
    <button
      className={`flex items-center gap-2 bg-primary-dark text-white px-4 py-2 rounded-lg hover:bg-primary-dark/90 transition ${className}`}
      onClick={onClick}
    >
      <span>{children}</span>
      {Icon && <Icon className="w-5 h-5" />}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.elementType, 
};
