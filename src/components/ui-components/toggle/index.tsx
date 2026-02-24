import clsx from 'clsx';
import s from './toggle.module.scss';

interface ToggleProps {
    value: boolean;
    onChange?: (value: boolean) => void;
    disabled?: boolean;
}

export const Toggle = ({ value, onChange, disabled = false }: ToggleProps) => {
    const handleClick = () => {
        if (onChange && !disabled) onChange(!value);
    };

    return (
        <div
            className={clsx(s['toggle'], disabled && s['disabled'], value ? s['on'] : s['off'])}
            onClick={handleClick}>
            <div className={clsx(s['ball'])}></div>
        </div>
    );
};
