import React from "react";

export const Modules = (props) => {
    return (
        <tr className="modules-line">
            <td>
                <span>Modules enseignes</span>
                {props.modules.map((module) => (
                    <p>{module.NomModule}</p>
                ))}
            </td>
        </tr>
    )
}