import { Trash2, Edit, Plus, ArrowRight,RefreshCw  } from "lucide-react";
import PropTypes from "prop-types";

const IconButton = ({ type, onClick, size = 24 }) => {
  const icons = {
    delete: <Trash2 size={size} />,
    edit: <Edit size={size} />,
    add: <Plus size={size} />,
    readmore: <ArrowRight size={size} />,
    none: <RefreshCw size={size} />, // No icon for "none"
  };

  return (
    <button onClick={onClick} className="">
      {icons[type] || null}
    </button>
  );
};

IconButton.propTypes = {
  type: PropTypes.oneOf(["delete", "edit", "add", "readmore", "none"]).isRequired,
  onClick: PropTypes.func,
  size: PropTypes.number,
};

export default IconButton;
