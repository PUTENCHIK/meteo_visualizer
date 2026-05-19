import clsx from 'clsx';
import s from './number-segment-input.module.scss';
import { useMemo } from 'react';

interface NumberSegmentInputProps {
    value: number;
    length: number;
    min?: number;
    max?: number;
    decimal?: number;
    normalizeZeros?: boolean;
    postfix?: string;
    disabled?: boolean;
    onChange?: (value: number) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const NumberSegmentInput = ({
    value,
    length,
    min,
    max,
    decimal = 0,
    normalizeZeros = false,
    postfix,
    disabled = false,
    onChange,
    onBlur,
}: NumberSegmentInputProps) => {
    const isNegativeValue = useMemo(() => value < 0 || Object.is(value, -0), [value]);

    const displayValue = useMemo(() => {
        const sign = isNegativeValue ? '-' : '';

        if (decimal > 0) {
            const parts = Math.abs(value).toString().split('.');
            const integerPart = normalizeZeros ? parts[0].padStart(length, '0') : parts[0];
            const decimalPart = (parts[1] || '').padEnd(decimal, '0');
            return `${sign}${integerPart}.${decimalPart}`;
        }

        let v = Math.abs(value).toString();
        v = normalizeZeros ? v.padStart(length, '0') : v;
        return sign + v;
    }, [value, normalizeZeros, length, decimal, isNegativeValue]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const getSource = (digits: string) => {
            const maxLength = length + decimal;
            digits += event.key;
            digits = digits.length > maxLength ? event.key : digits;
            digits = digits.padStart(maxLength, '0');

            const source = digits;

            if (decimal > 0) {
                const integerPart = digits.slice(0, -decimal);
                const decimalPart = digits.slice(-decimal);
                return `${integerPart}.${decimalPart}`;
            } else {
                return source;
            }
        };

        switch (event.key) {
            case 'Backspace':
            case 'Delete':
                onChange?.(isNegativeValue ? -0 : 0);
                return;
            case 'Tab':
                return;
        }

        let allowedSymbols = '\\d+';
        if (min === undefined || min < 0) allowedSymbols += '\\-';

        const regex = new RegExp(`^[${allowedSymbols}]$`);

        if (event.key.length !== 1 || !regex.test(event.key)) {
            return;
        }

        switch (event.key) {
            case '-':
                onChange?.(value === 0 ? -0 : -1 * Math.abs(value));
                return;
            case '+':
                onChange?.(Math.abs(value));
                return;
        }

        const source = getSource(value.toString().replace(/\D/g, ''));
        let newValue = parseFloat(source);

        if (!isNaN(newValue)) {
            if (isNegativeValue && newValue !== 0) {
                newValue = -newValue;
            } else if (isNegativeValue && newValue === 0) {
                newValue = -0;
            }

            const isBelowMin = min !== undefined && newValue < min;
            const isAboveMax = max !== undefined && newValue > max;

            if (!isBelowMin && !isAboveMax) {
                onChange?.(newValue);
            } else {
                const singleDigit = parseFloat(getSource('0'));
                if (!isNaN(singleDigit)) {
                    onChange?.(singleDigit);
                }
            }
        }
    };

    const handleSelect = (e: React.SyntheticEvent<HTMLInputElement>) => {
        const input = e.currentTarget;
        input.setSelectionRange(input.selectionStart, input.selectionStart);
    };

    return (
        <label className={clsx(s['number-segment-input'], disabled && s['disabled'])}>
            <input
                type='text'
                className={clsx(s['value'])}
                value={displayValue}
                style={{
                    width: `${0.6 * displayValue.length}rem`,
                }}
                readOnly
                disabled={disabled}
                onKeyDown={handleKeyDown}
                onSelect={handleSelect}
                onChange={() => {}}
                onBlur={onBlur}
            />
            <span className={clsx(s['postfix'])}>{postfix}</span>
        </label>
    );
};
