import { useWeatherStations } from '@context/weather-station-context';
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

type PollStatus = 'DONE' | 'ERROR' | 'DEACTIVATED' | 'CONNECTION_FAILURE';

interface PayloadItem {
    description: string;
    name: string;
    units: string;
    value: number;
}

interface DebugInfo {
    poll_start_time: number;
    poll_end_time: number;
}

interface PollResult {
    timestamp: number;
    payload: PayloadItem[];
    status: PollStatus;
    debug_info: DebugInfo;
}

interface ServerMessage {
    pollable_name: string;
    pipelines: string[];
    poll_result: PollResult | null;
}

interface SocketConfig {
    host: string;
    port: number;
}

interface SocketContextType {
    sendMessage: (data: any) => void;
    readyState: ReadyState;
    isConnected: boolean;
    toggleConnection: () => void;
    config: SocketConfig;
    updateConfig: (host: string, port: number) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
    const { updateStation } = useWeatherStations();

    const [connectionEnabled, setConnectionEnabled] = useState(false);
    const [config, setConfig] = useState<SocketConfig>({
        host: 'localhost',
        port: 5052,
    });

    const socketUrl = connectionEnabled ? `ws://${config.host}:${config.port}/ws` : null;

    const { sendJsonMessage, readyState } = useWebSocket<ServerMessage>(socketUrl, {
        onMessage: (event) => {
            try {
                const message: ServerMessage = JSON.parse(event.data);
                const name = message.pollable_name;
                if (message.poll_result && name.toLowerCase().includes('wind')) {
                    let value = 0;
                    for (const item of message.poll_result.payload!) {
                        if (item.name.toLowerCase().includes('temp')) {
                            value = item.value;
                            break;
                        }
                    }
                    updateStation(name, value);
                }
            } catch (error) {
                console.error(`Parsing error: ${error}`);
            }
        },
        shouldReconnect: () => true,
        reconnectAttempts: 10,
        reconnectInterval: 3000,
        share: true,
    });

    const isConnected = [ReadyState.OPEN, ReadyState.CONNECTING].includes(readyState);

    const contextValue = useMemo(
        () => ({
            sendMessage: sendJsonMessage,
            readyState,
            isConnected,
            toggleConnection: () => setConnectionEnabled((prev) => !prev),
            config,
            updateConfig: (host: string, port: number) => setConfig({ host, port }),
        }),
        [sendJsonMessage, readyState, isConnected, config],
    );

    return <SocketContext.Provider value={contextValue}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) throw new Error('useSocket must be used within SocketProvider');
    return context;
};
