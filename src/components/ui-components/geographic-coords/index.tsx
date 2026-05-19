import { numberToGeographic, type GeographicParameter } from '@utils/coordinate-systems';
import { useMemo } from 'react';

const paramDesignations: Record<GeographicParameter, Record<number, string>> = {
    lat: {
        0: 'ю.ш.',
        1: 'с.ш.',
        2: 'с.ш.',
    },
    lon: {
        0: 'з.д',
        1: 'в.д.',
        2: 'в.д.',
    },
};

interface GeographicCoordsProps {
    value: number;
    param: GeographicParameter;
}

export const GeographicCoords = ({ value, param }: GeographicCoordsProps) => {
    const separatedValue = useMemo(() => {
        return numberToGeographic(value);
    }, [value]);

    return (
        <span>
            {Math.abs(separatedValue.d)}° {separatedValue.m}' {separatedValue.s}''{' '}
            {paramDesignations[param][Math.sign(value) + 1]}
        </span>
    );
};
