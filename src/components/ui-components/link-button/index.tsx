import clsx from 'clsx';
import s from './link-button.module.scss';

interface LinkButtonProps {
    title: string;
    disabled?: boolean;
    onClick?: () => void;
}

export const LinkButton = ({ title, disabled = false, onClick }: LinkButtonProps) => {
    return (
        <div className={clsx(s['link-button'], disabled && s['disabled'])} onClick={onClick}>
            {title}
        </div>
    );
};
