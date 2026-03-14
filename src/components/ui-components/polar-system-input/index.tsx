import { VectorInput } from '@components/vector-input';
import type { PolarSystemPosition } from '@utils/coordinate-systems';
import { useState } from 'react';
import { Vector2 } from 'three';

interface PolarSystemInputProps {
    value: PolarSystemPosition;
    disabled?: boolean;
    onChange?: (value: PolarSystemPosition) => void;
}

export const PolarSystemInput = ({ value, disabled = false, onChange }: PolarSystemInputProps) => {
    const polarToVector = (pos: PolarSystemPosition) => {
        return new Vector2(pos.radius, pos.angle);
    };

    const [innerValue, setInnerValue] = useState<Vector2>(polarToVector(value));

    const handleChange = (v: Vector2) => {
        setInnerValue(v);
        onChange?.({ radius: v.x, angle: v.y });
    };

    return (
        <VectorInput
            value={innerValue}
            axisLabels={{ x: 'радиус', y: 'полярный угол' }}
            postfixes={{ x: 'м', y: '°' }}
            min={{ x: 0, y: 0 }}
            max={{ y: 360 }}
            decimal={{ x: 2, y: 0 }}
            disabled={disabled}
            onChange={handleChange}
        />
    );
};
