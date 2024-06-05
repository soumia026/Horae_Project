import React from "react";
export const LineInfos = (props) => {

    const textStyle = {
        textTransform: props.style1
      };
    const textStyle1 = {
        textTransform: props.style2
    } 
    
    return (
        
        <tr>
            <td>
                <span>{props.firstTitle}</span>
                <p style={textStyle}>{props.firstValue}</p>
            </td>
            <td>
                <span>{props.secondTitle}</span>
                <p style={textStyle1}>{props.secondValue}</p>
            </td>
            <td>
                <span>{props.thirdTitle}</span>
                <p>{props.thirdValue}</p>
            </td>
            <td>
                <span>{props.fourthTitle}</span>
                <p>{props.fourthValue}</p>
            </td>
        </tr>
    )
}