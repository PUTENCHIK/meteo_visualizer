import clsx from 'clsx';
import s from './text-input.module.scss';
import React, { useState } from 'react';

interface TextInputProps {
    defaultValue?: string;
    placeholder?: string;
    maxLength?: number;
    minLength?: number;
    disabled?: boolean;
    onChange?: (value: string) => void;
}

export const TextInput = ({
    defaultValue,
    placeholder,
    maxLength,
    minLength,
    disabled = false,
    onChange,
}: TextInputProps) => {
    const [value, setValue] = useState(defaultValue ?? '');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    };

    const handleBlur = () => {
        if (onChange) onChange(value);
    };

    return (
        <input
            type='text'
            className={clsx(s['text-input'])}
            minLength={minLength}
            maxLength={maxLength}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={disabled}
        />
    );
};
