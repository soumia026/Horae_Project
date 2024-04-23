import React from "react";
export const LineInfos = (props) => {
    return (
        
        <tr>
            <td>
                <span>{props.firstTitle}</span>
                <p>{props.firstValue}</p>
            </td>
            <td>
                <span>{props.secondTitle}</span>
                <p>{props.secondValue}</p>
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