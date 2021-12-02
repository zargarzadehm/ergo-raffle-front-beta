import React from "react";

const MultiStepLeft = ({steps, active}) => {
    return (
        <ul className="multi-step-left">
            {steps.map((item, index) => (
                <li className={index <= active ? "active" : ""}>{item}</li>
            ))}
        </ul>
    )
}

export default MultiStepLeft;
