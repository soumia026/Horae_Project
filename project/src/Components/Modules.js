import React from "react";

export const Modules = (props) => {
    return (
        <tr className="modules-line">
            <td>
                <span>Modules enseignes</span>
                {props.modules.map((module) => (
                    <p>{module}</p>
                ))}
            </td>
            <td>
                <span>fonctions</span>
                {props.fonctions.map((fonction) => (
                    <p>{fonction}</p>
                ))}
            </td>
        </tr>
    )
}