'use client';

import clsx from "clsx";

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset' | undefined;
    fulWidth?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    secondary?: boolean;
    danger?: boolean;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    type,
    fulWidth,
    children,
    onClick,
    secondary,
    danger,
    disabled
}) => {

    return (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={clsx("flex justify-center rounded-md px-6 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2", disabled && "opacity-50 cursor-default", fulWidth && "w-full", secondary ? 'text-gray-900' : 'text-white', danger && 'bg-red-500 hover:bg-rose-600 focus-visible:outline-red-500', !secondary && !danger && 'myButton')}
        >
            {children}
        </button>
    );
}

export default Button;