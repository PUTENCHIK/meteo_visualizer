import clsx from 'clsx';
import s from './vector-input.module.scss';
import { NumberInput, type NumberInputRef } from '@components/number-input';
import { Vector3, Vector4, type Vector2 } from 'three';
import { forwardRef, useImperativeHandle, useRef, type ReactElement } from 'react';

type VectorAxes<T> = Extract<keyof T, 'x' | 'y' | 'z' | 'w'>;

type VectorInputType = Vector2 | Vector3 | Vector4;

interface VectorInputProps<T extends VectorInputType> {
    value: T;
    axisLabels?: Partial<Record<VectorAxes<T>, string>>;
    postfixes?: Partial<Record<VectorAxes<T>, string>>;
    min?: Partial<Record<VectorAxes<T>, number>>;
    max?: Partial<Record<VectorAxes<T>, number>>;
    maxLength?: Partial<Record<VectorAxes<T>, number>>;
    step?: Partial<Record<VectorAxes<T>, number>>;
    decimal?: Partial<Record<VectorAxes<T>, number>>;
    disabled?: boolean;
    onChange?: (value: T) => void;
}

export interface VectorInputRef {
    update: () => void;
}

const InnerVectorInput = <T extends VectorInputType>(
    {
        value,
        axisLabels,
        postfixes,
        min,
        max,
        maxLength,
        step,
        decimal,
        disabled = false,
        onChange,
    }: VectorInputProps<T>,
    ref: React.ForwardedRef<VectorInputRef>,
) => {
    const inputRefs = useRef<Record<string, NumberInputRef | null>>({});
    const axes: string[] =
        'w' in value ? ['x', 'y', 'z', 'w'] : 'z' in value ? ['x', 'y', 'z'] : ['x', 'y'];

    const handleChange = (axis: keyof T, newValue: number) => {
        const v = value.clone() as T;
        (v[axis] as number) = newValue;
        onChange?.(v);
    };

    useImperativeHandle(ref, () => ({
        update: () => {
            for (const el of Object.values(inputRefs.current)) {
                el?.update();
            }
        },
    }));

    return (
        <div className={clsx(s['vector-input'])}>
            {axes.map((axis, index) => (
                <div key={index} className={clsx(s['axis-wrapper'])}>
                    <NumberInput
                        key={`${value}`}
                        defaultValue={value[axis as keyof T] as number}
                        className={s['axis-input']}
                        postfix={postfixes && postfixes[axis as keyof T]}
                        min={min && min[axis as keyof T]}
                        max={max && max[axis as keyof T]}
                        maxLength={maxLength && maxLength[axis as keyof T]}
                        step={step && step[axis as keyof T]}
                        decimal={decimal && decimal[axis as keyof T]}
                        disabled={disabled}
                        onChange={(v: number) => handleChange(axis as keyof T, v)}
                        ref={(el) => {
                            inputRefs.current[axis] = el;
                        }}
                    />
                    {axisLabels && (
                        <span className={clsx(s['axis-label'])}>
                            {axisLabels[axis as keyof T] ?? ''}
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
};

export const VectorInput = forwardRef(InnerVectorInput) as <T extends VectorInputType>(
    props: VectorInputProps<T> & { ref?: React.ForwardedRef<VectorInputRef> },
) => ReactElement;
