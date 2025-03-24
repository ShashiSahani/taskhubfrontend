import PropTypes from "prop-types";
export const Card=({children,className})=>{
    return (
        <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
{children}
        </div>
    )
}


export const CardContent=({children})=>{
    return <div className="mt-2">{children}</div>
}
Card.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
  };
  
  CardContent.propTypes = {
    children: PropTypes.node.isRequired,
  };