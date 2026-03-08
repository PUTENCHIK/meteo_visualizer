import { masts } from '@utils/consts';
import { polarPosToXY } from '@utils/funcs';
import { createContext, useCallback, useContext, useRef, type ReactNode } from 'react';
import { Vector2, Vector3 } from 'three';

export interface WeatherStationData {
    position: Vector3;
    value: number;
}

interface WeatherStationContextType {
    getStations: () => Record<string, WeatherStationData>;
    updateStation: (name: string, value: number) => void;
}

const getStationPos = (name: string): Vector3 => {
    const parts = name.toLowerCase().split('-');
    let mastPos: Vector2 = new Vector2(0, 0);
    let lastMast = undefined;
    for (const mast of masts) {
        mastPos = polarPosToXY(mast.position);
        lastMast = mast;
        if (mast.stationPrefix === parts[0]) break;
    }
    return new Vector3(mastPos.x, Math.random() * (lastMast?.height ?? 100), mastPos.y);
};

const WeatherStationContext = createContext<WeatherStationContextType | undefined>(undefined);

export const WeatherStationProvider = ({ children }: { children: ReactNode }) => {
    const stationsRef = useRef<Record<string, WeatherStationData>>({});

    const getStations = useCallback(() => stationsRef.current, []);

    const updateStation = useCallback((name: string, value: number) => {
        if (!(name in stationsRef.current)) {
            stationsRef.current[name] = { position: getStationPos(name), value: value };
        } else {
            stationsRef.current[name].value = value;
        }
    }, []);

    return (
        <WeatherStationContext.Provider value={{ getStations, updateStation }}>
            {children}
        </WeatherStationContext.Provider>
    );
};

export const useWeatherStations = () => {
    const context = useContext(WeatherStationContext);
    if (!context) throw new Error('useWeatherStations must be used within WeatherStationProvider');
    return context;
};
