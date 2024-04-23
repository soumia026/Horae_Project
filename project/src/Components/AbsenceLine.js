import React from "react";
import axios from "axios";

export const AbsenceLine = (props) => {

    
    const handleDelete = (id) => {
        axios.delete('http://localhost:3000/absences/' + id)
        .then(res => {
            window.location.reload()
        })
        .catch(err => console.log(err));
    }

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
            <td>
                <div className="update-abscence">
                    <svg onClick={() => props.handleAbsence()} width="1rem" height="1rem" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_204_907)">
                            <path d="M12.041 2.12487C12.2271 1.93883 12.4479 1.79126 12.691 1.69058C12.9341 1.58989 13.1946 1.53807 13.4577 1.53807C13.7208 1.53807 13.9813 1.58989 14.2244 1.69058C14.4674 1.79126 14.6883 1.93883 14.8743 2.12487C15.0604 2.31091 15.208 2.53177 15.3086 2.77485C15.4093 3.01792 15.4612 3.27844 15.4612 3.54154C15.4612 3.80464 15.4093 4.06516 15.3086 4.30823C15.208 4.55131 15.0604 4.77217 14.8743 4.95821L5.31185 14.5207L1.41602 15.5832L2.47852 11.6874L12.041 2.12487Z" stroke="black" stroke-width="1.41667" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_204_907">
                                <rect width="17" height="17" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <svg onClick={() => handleDelete(props.deletedObject)} width="1rem" height="1rem" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.125 4.25H3.54167H14.875" stroke="black" stroke-width="1.41667" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M13.4577 4.25001V14.1667C13.4577 14.5424 13.3084 14.9027 13.0428 15.1684C12.7771 15.4341 12.4167 15.5833 12.041 15.5833H4.95768C4.58196 15.5833 4.22162 15.4341 3.95595 15.1684C3.69027 14.9027 3.54102 14.5424 3.54102 14.1667V4.25001M5.66602 4.25001V2.83334C5.66602 2.45762 5.81527 2.09728 6.08095 1.8316C6.34662 1.56593 6.70696 1.41667 7.08268 1.41667H9.91602C10.2917 1.41667 10.6521 1.56593 10.9178 1.8316C11.1834 2.09728 11.3327 2.45762 11.3327 2.83334V4.25001" stroke="black" stroke-width="1.41667" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M7.08398 7.79167V12.0417" stroke="black" stroke-width="1.41667" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M9.91602 7.79167V12.0417" stroke="black" stroke-width="1.41667" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>

            </td>
        </tr>
    )
}