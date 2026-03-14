import clsx from 'clsx';
import s from './guid-label.module.scss';
import { useMemo } from 'react';

interface GuidLabelProps {
    value: string;
}

export const GuidLabel = ({ value }: GuidLabelProps) => {
    const displayLabel = useMemo(() => {
        const parts = value.split('-');
        return `#${parts[0]}`;
    }, [value]);

    return (
        <div className={clsx(s['guid-label'])} title={value}>
            {displayLabel}
        </div>
    );
};
