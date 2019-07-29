import React from "react";

function Selectbox(props) {
    return (
        <g stroke="#FCB401" fill="#FCB401">
            <rect x={Number(props.x) - 1} y={Number(props.y) - 1}
                  width={Number(props.width) + 2} height={Number(props.height) + 2} strokeWidth="2" fillOpacity="0"/>
            <rect x={Number(props.x) - 4} y={Number(props.y) - 4} width="6" height="6"/>
            <rect x={Number(props.x) + Number(props.width) - 2} y={Number(props.y) - 4} width="6" height="6"/>
            <rect x={Number(props.x) - 4} y={Number(props.y) + Number(props.height) - 2} width="6" height="6"/>
            <rect x={Number(props.x) + Number(props.width) - 2} y={Number(props.y) + Number(props.height) - 2} width="6" height="6"/>
        </g>
    )
}

export default Selectbox;