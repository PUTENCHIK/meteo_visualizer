import clsx from 'clsx';
import s from './input-label.module.scss';

type InputLabelType = 'horizontal' | 'vertical';

interface InputLabelProps {
    label: string;
    type?: InputLabelType;
    error?: string;
    children: React.ReactNode;
}

export const InputLabel = ({ label, type = 'vertical', error, children }: InputLabelProps) => {
    return (
        <label className={clsx(s['label'], s[type])}>
            <span>{label}:</span>
            <div className={clsx(s['input-wrapper'])}>
                {children}
                {error && <span className={clsx(s['error'])}>{error}</span>}
            </div>
        </label>
    );
};
