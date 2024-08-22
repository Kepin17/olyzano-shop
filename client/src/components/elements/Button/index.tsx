import React from "react";

interface ButtonProps {
    type: string;
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
    const {
        type = "button",
        className = "w-full h-10 bg-blue-600",
        children,
        onClick,
    } = props;
    return (
        <button typeof={type} className={className} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
