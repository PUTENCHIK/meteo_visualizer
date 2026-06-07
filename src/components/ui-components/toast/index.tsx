import clsx from 'clsx';
import s from './toast.module.scss';
import type { ToastContentProps } from 'react-toastify';
import { ComponentRowBox } from '@components/component-row-box';
import { IconButton } from '@components/icon-button';

export type ToastType = 'message' | 'error';


interface CustomProps {
    title: string;
    text: string;
    type?: ToastType;
}

type ToastProps = CustomProps & Partial<ToastContentProps>;

export const Toast = ({ closeToast, title, text, type = 'message' }: ToastProps) => {

    return (
        <div className={clsx(s['toast'], s[type])}>
            <ComponentRowBox
                left={[
                    <h3>
                        {title}
                    </h3>,
                ]}
                right={[
                    <IconButton
                        iconName='cross'
                        title='Закрыть'
                        iconSize={'small'}
                        iconColor='white'
                        onClick={closeToast}
                    />,
                ]}
                size='tiny'
            />
            <span>{text}</span>
        </div>
    );
};
