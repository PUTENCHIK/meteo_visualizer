import clsx from 'clsx';
import s from './range-input.module.scss';

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
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange(Number(event.target.value));
    };

    return (
        <div className={clsx(s['range-input-wrapper'])}>
            {min}
            <input
                type='range'
                min={min}
                max={max}
                value={value}
                step={step}
                onChange={handleChange}
                disabled={disabled}
            />
            {max}
        </div>
    );
};
