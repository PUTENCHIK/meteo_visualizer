import clsx from 'clsx';
import s from './geographic-input.module.scss';
import {
    geographicToNumber,
    numberToGeographic,
    type GeographicParameter,
    type GeographicPosition,
} from '@utils/coordinate-systems';
import { useCallback } from 'react';
import { NumberSegmentInput } from '@components/number-segment-input';

interface GeographicInputProps {
    value: number;
    param: GeographicParameter;
    disabled?: boolean;
    onChange?: (value: number) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const GeographicInput = ({
    value,
    param,
    disabled = false,
    onChange,
    onBlur,
}: GeographicInputProps) => {
    const maxDeg = param === 'lat' ? 89 : 179;
    const maxDegLength = param === 'lat' ? 2 : 3;

    const separatedValue = numberToGeographic(value);

    const degrees = separatedValue.d;
    const minutes = separatedValue.m;
    const seconds = separatedValue.s;

    const handleChange = useCallback(
        (axis: keyof GeographicPosition, axisValue: number) => {
            const currentDms: GeographicPosition = { d: degrees, m: minutes, s: seconds };

            switch (axis) {
                case 'd':
                    currentDms.d = axisValue;
                    break;
                case 'm':
                    currentDms.m = axisValue;
                    break;
                case 's':
                    currentDms.s = axisValue;
                    break;
            }

            console.log('changed:', currentDms);

            const newValue = Number(geographicToNumber(currentDms).toFixed(6));

            if (newValue !== value) {
                onChange?.(newValue);
            }
        },
        [degrees, minutes, seconds, value, onChange],
    );

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        onBlur?.(event);
    };

    return (
        <label className={clsx(s['geographic-input-wrapper'])}>
            <NumberSegmentInput
                value={degrees}
                length={maxDegLength}
                min={-maxDeg}
                max={maxDeg}
                postfix='°'
                normalizeZeros
                disabled={disabled}
                onChange={(v) => handleChange('d', v)}
                onBlur={handleBlur}
            />
            <NumberSegmentInput
                value={minutes}
                length={2}
                min={0}
                max={59}
                postfix={`'`}
                normalizeZeros
                disabled={disabled}
                onChange={(v) => handleChange('m', v)}
                onBlur={handleBlur}
            />
            <NumberSegmentInput
                value={seconds}
                length={2}
                min={0}
                max={59}
                decimal={1}
                postfix={`''`}
                normalizeZeros
                disabled={disabled}
                onChange={(v) => handleChange('s', v)}
                onBlur={handleBlur}
            />
        </label>
    );
};
