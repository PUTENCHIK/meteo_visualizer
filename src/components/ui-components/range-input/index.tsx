import clsx from 'clsx';
import s from './range-input.module.scss';
import { useEffect, useState } from 'react';

interface RangeInputProps {
    value: number;
    min: number;
    max: number;
    step: number;
    disabled?: boolean;
    onChange?: (value: number) => void;
}

export const RangeInput = ({
    value,
    min,
    max,
    step,
    disabled = false,
    onChange,
}: RangeInputProps) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [thumbOffset, setThumbOffset] = useState(300);

    useEffect(() => {
        setThumbOffset(((value - min) / (max - min)) * 100);
    }, [value, min, max]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange(Number(event.target.value));
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
                    onMouseDown={() => setShowTooltip(true)}
                    onMouseUp={() => setShowTooltip(false)}
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
