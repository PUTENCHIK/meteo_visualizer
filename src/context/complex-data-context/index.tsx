import { storageManager } from '@managers/local-storage-manager';
import { masts } from '@utils/consts';
import { polarPosToXY } from '@utils/funcs';
import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';
import { Vector2, Vector3 } from 'three';

export interface WeatherStationData {
    position: Vector3;
    value: number;
}

export interface ComplexPosition {
    lat: Vector3;
    lon: Vector3;
}

interface ComplexDataContextType {
    getStations: () => Record<string, WeatherStationData>;
    updateStation: (name: string, value: number) => void;
    position: ComplexPosition;
    updatePosition: (lat: Vector3, lon: Vector3) => void;
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

const ComplexDataContext = createContext<ComplexDataContextType | undefined>(undefined);

export const ComplexDataProvider = ({ children }: { children: ReactNode }) => {
    const stationsRef = useRef<Record<string, WeatherStationData>>({});
    const [position, setPosition] = useState<ComplexPosition>(storageManager.getItem('position'));

    const getStations = useCallback(() => stationsRef.current, []);

    const updateStation = useCallback((name: string, value: number) => {
        if (!(name in stationsRef.current)) {
            stationsRef.current[name] = { position: getStationPos(name), value: value };
        } else {
            stationsRef.current[name].value = value;
        }
    }, []);

    const updatePosition = useCallback((lat: Vector3, lon: Vector3) => {
        const newPos: ComplexPosition = { lat, lon };
        setPosition(newPos);
        storageManager.setItem('position', newPos);
    }, []);

    const contextValue: ComplexDataContextType = {
        getStations: getStations,
        updateStation: updateStation,
        position: position,
        updatePosition: updatePosition,
    };

    return (
        <ComplexDataContext.Provider value={contextValue}>{children}</ComplexDataContext.Provider>
    );
};

export const useComplexData = () => {
    const context = useContext(ComplexDataContext);
    if (!context) throw new Error('useComplexData must be used within ComplexDataProvider');
    return context;
};
