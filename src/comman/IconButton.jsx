import { Trash2, Edit, Plus, ArrowRight } from "lucide-react";

import PropTypes from "prop-types"; 


const IconButton=({type,onClick,size=24,color})=>{



    const icons={
        delete:<Trash2 size={size} color={color}/>,
        edit:<Edit size={size} color={color}/>,
        add:<Plus size={size} color={color}/>,
        readmore:<ArrowRight size={size} color={color}/>,
    }

    return(
        <button
        onClick={onClick} 
        className=""
      >
        {icons[type] || null}
      </button>
    )
}
IconButton.propTypes={
    type:PropTypes.oneOf([
        ["delete", "edit", "add", "readmore"]
    ]).isRequired,
    onClick: PropTypes.func.isRequired, 
    size: PropTypes.number,
    color: PropTypes.string,

}

export default IconButton;