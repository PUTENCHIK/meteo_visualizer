import { Toast, type ToastType } from '@components/toast';
import { parseUnknownError } from '@utils/common';
import { toast } from 'react-toastify';

const showNotification = (text: string, title: string, type: ToastType) => {
    toast(<Toast text={text} title={title} type={type} />, {
        autoClose: 5000,
        hideProgressBar: true,
        position: 'bottom-right',
    });
};

export const showMessage = (text: string) => {
    showNotification(text, 'Сообщение', 'message');
};

export const showError = (error: unknown) => {
    const parsedError = parseUnknownError(error);
    showNotification(parsedError.message, `Ошибка ${parsedError.code ?? ''}`, 'error');
};
