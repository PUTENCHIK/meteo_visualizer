import clsx from 'clsx';
import s from './number-input.module.scss';
import { forwardRef, useImperativeHandle, useState } from 'react';

interface NumberInputProps {
    defaultValue: number;
    placeholder?: string;
    className?: string;
    postfix?: string;
    min?: number;
    max?: number;
    maxLength?: number;
    step?: number;
    decimal?: number;
    disabled?: boolean;
    onChange?: (value: number) => void;
}

export interface NumberInputRef {
    update: () => void;
}

export const NumberInput = forwardRef<NumberInputRef, NumberInputProps>(
    (
        {
            defaultValue,
            placeholder,
            className,
            postfix,
            min,
            max,
            maxLength,
            step,
            decimal,
            disabled = false,
            onChange,
        }: NumberInputProps,
        ref,
    ) => {
        const [value, setValue] = useState<string>(`${defaultValue}`);

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
            let num = parseFloat(value);

            if (isNaN(num)) {
                setValue(defaultValue.toString());
                onChange?.(defaultValue);
                return;
            }
            if (decimal !== undefined && decimal >= 0) num = Number(num.toFixed(decimal));

            num = Math.max(num, min !== undefined ? min : num);
            num = Math.min(num, max !== undefined ? max : num);

            setValue(num.toString());
            onChange?.(num);
        };

        useImperativeHandle(ref, () => ({
            update: () => {
                setValue(defaultValue.toString());
            },
        }));

        return (
            <div className={clsx(s['number-input-wrapper'])}>
                <input
                    type='text'
                    className={clsx(s['number-input'], className)}
                    value={value}
                    placeholder={placeholder}
                    step={step}
                    disabled={disabled}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {postfix && <span className={clsx(s['postfix'])}>{postfix}</span>}
            </div>
        );
    },
);
