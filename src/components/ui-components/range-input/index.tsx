import clsx from 'clsx';
import s from './range-input.module.scss';
import React, { useEffect, useState } from 'react';

interface RangeInputProps {
    startValue: number;
    min: number;
    max: number;
    step: number;
    disabled?: boolean;
    onChange?: (value: number, final?: boolean) => void;
}

export const RangeInput = ({
    startValue,
    min,
    max,
    step,
    disabled = false,
    onChange,
}: RangeInputProps) => {
    const [value, setValue] = useState(startValue);
    const [showTooltip, setShowTooltip] = useState(false);
    const [thumbOffset, setThumbOffset] = useState(300);

    useEffect(() => {
        setThumbOffset(((value - min) / (max - min)) * 100);
    }, [value, min, max]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.valueAsNumber);
        if (onChange) onChange(value, false);
    };

    const handleMouseDown = () => {
        setShowTooltip(true);
    };

    const handleMouseUp = () => {
        setShowTooltip(false);
        if (onChange) onChange(value);
    };

    return (
        <div
            className={clsx(s['range-input-wrapper'])}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}>
            <div>{min}</div>
            <div className={clsx(s['input-wrapper'])}>
                <input
                    className={clsx(s['range-input'])}
                    type='range'
                    value={value}
                    min={min}
                    max={max}
                    step={step}
                    onChange={handleChange}
                    disabled={disabled}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                />
                {showTooltip && (
                    <span
                        className={clsx(s['tooltip'])}
                        style={{
                            left: `${thumbOffset}%`,
                        }}>
                        {value}
                    </span>
                )}
            </div>
            <div>{max}</div>
        </div>
    );
};
