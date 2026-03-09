import { Toggle } from '@components/toggle';
import { useSocket } from '@context/websocket-context';
import { DialogWindow } from '@dialogs/dialog-window';

export const WebsocketApiDialog = () => {
    const { isConnected, toggleConnection, config } = useSocket();

    return (
        <DialogWindow dialogId='websocketApi' title='Конфиг вебсокета'>
            <div>
                <span>Подключение:</span>
                <Toggle value={isConnected} onChange={toggleConnection} />
            </div>
            <div>
                <span>Хост:</span>
                <input type='text' value={config.host} />
            </div>
            <div>
                <span>Порт:</span>
                <input type='number' value={config.port} />
            </div>
        </DialogWindow>
    );
};
