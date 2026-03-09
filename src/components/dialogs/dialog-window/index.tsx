import clsx from 'clsx';
import s from './dialog-window.module.scss';
import { Rnd } from 'react-rnd';
import { IconButton } from '@components/icon-button';
import { useDialogs, type DialogId } from '@context/dialog-context';

interface DialogWindowProps {
    dialogId: DialogId;
    title: string;
    children: React.ReactNode;
}

export const DialogWindow = ({ dialogId, title, children }: DialogWindowProps) => {
    const { activeDialogs, closeDialog, focusDialog } = useDialogs();

    const isOpen = activeDialogs.includes(dialogId);

    const handleCloseClick = () => {
        closeDialog(dialogId);
    };

    if (!isOpen) return null;

    return (
        <Rnd
            className={clsx(s['dialog-window'])}
            default={{
                x: 100 + 20 * activeDialogs.indexOf(dialogId),
                y: 100 + 20 * activeDialogs.indexOf(dialogId),
                width: 'auto',
                height: 'auto',
            }}
            minWidth={200}
            minHeight={200}
            maxWidth={600}
            maxHeight={600}
            bounds='window'
            dragHandleClassName='handle-area'
            cancel='.close-button'
            onMouseDown={() => focusDialog(dialogId)}
            style={{
                zIndex: 10 + activeDialogs.indexOf(dialogId),
            }}>
            <div className={clsx(s['content-wrapper'])}>
                <div className='handle-area'>
                    <div className={clsx(s['window-title'])}>
                        <h2 className={clsx(s['title'])}>{title}</h2>
                        <IconButton
                            iconName='cross'
                            title='Закрыть'
                            className='close-button'
                            onClick={handleCloseClick}
                        />
                    </div>
                </div>
                <div className={clsx(s['content'])}>{children}</div>
            </div>
        </Rnd>
    );
};
