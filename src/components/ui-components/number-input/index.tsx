import clsx from 'clsx';
import s from './number-input.module.scss';
import { useState } from 'react';

interface NumberInputProps {
    defaultValue: number;
    placeholder?: string;
    min?: number;
    max?: number;
    maxLength?: number;
    step?: number;
    disabled?: boolean;
    onChange?: (value: number) => void;
}

export const NumberInput = ({
    defaultValue,
    placeholder,
    min,
    max,
    maxLength,
    step,
    disabled = false,
    onChange,
}: NumberInputProps) => {
    const [value, setValue] = useState<string>(defaultValue ? `${defaultValue}` : '');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const v = event.target.value;
        const num = Number(v);

        if (isNaN(num) && v.length > 0 && v !== '-') {
            return;
        }
        if (maxLength && v.length > maxLength) {
            return;
        }
        setValue(v);
    };

    const handleBlur = () => {
        let num = parseInt(value);

        if (isNaN(num)) {
            setValue(defaultValue.toString());
            onChange?.(defaultValue);
            return;
        }

        num = Math.max(num, min ? min : num);
        num = Math.min(num, max ? max : num);

        setValue(num.toString());
        onChange?.(num);
    };

    return (
        <input
            type='text'
            className={clsx(s['number-input'])}
            value={value}
            placeholder={placeholder}
            step={step}
            disabled={disabled}
            onChange={handleChange}
            onBlur={handleBlur}
        />
    );
};
