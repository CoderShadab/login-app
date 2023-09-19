'use client';

import clsx from "clsx";
import {
    FieldErrors,
    FieldValues,
    UseFormRegister
} from 'react-hook-form';

interface InputProps {
    label: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>
    errors: FieldErrors;
    disabled?: boolean;
}


const Input: React.FC<InputProps> = ({
    label,
    id,
    type,
    required,
    register,
    errors,
    disabled
}) => {
    return (
        <div>
            <label
                className="
                 block
                 text-sm
                 font-medium
                 leading-6
                 text-gray-900
                "
                htmlFor={id}>
                {label}
            </label>
            <div className="mt-1">
                <input
                    id={id}
                    type={type}
                    disabled={disabled}
                    {...register(id, { required })}
                    className={clsx("form-input block w-full text-sm rounded-lg transition focus:ring-white focus:border-b-gray-600 focus:duration-50 border-gray-300 border-b-[3px] border-t-0 border-l-0 border-r-0 placeholder:text-gray-300", errors[id] && "focus:ring-red-500", disabled && "opacity-50 cursor-default")}
                >
                </input>
            </div>
        </div>
    );
}

export default Input;