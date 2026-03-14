import { Guid } from 'typescript-guid';
import { storageManager } from '@managers/local-storage-manager';
import { getMastConfig, type Mast, type WeatherStation } from '@utils/complexes';
import { polarToLocal, type GeographicSystemPosition } from '@utils/coordinate-systems';
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
    type ReactNode,
} from 'react';
import { Vector2, Vector3 } from 'three';

interface ComplexDataContextType {
    getStations: () => Record<string, WeatherStation>;
    updateStation: (name: string, value: number) => void;
    position: GeographicSystemPosition;
    updatePosition: (lat: Vector3, lon: Vector3) => void;
    masts: Mast[];
    addMast: () => void;
    updateMast: <K extends keyof Mast>(id: string, key: K, value: Mast[K]) => void;
    deleteMast: (id: string) => void;
}

const ComplexDataContext = createContext<ComplexDataContextType | undefined>(undefined);

export const ComplexDataProvider = ({ children }: { children: ReactNode }) => {
    const stationsRef = useRef<Record<string, WeatherStation>>({});
    const [position, setPosition] = useState<GeographicSystemPosition>(
        storageManager.getItem('position'),
    );
    const [masts, setMasts] = useState<Mast[]>(storageManager.getItem('masts'));

    useEffect(() => {
        storageManager.setItem('masts', masts);
    }, [masts]);

    const getStationPos = useCallback(
        (name: string): Vector3 => {
            const parts = name.toLowerCase().split('-');
            let mastPos: Vector2 = new Vector2(0, 0);
            let lastMast = undefined;
            for (const mast of masts) {
                mastPos = polarToLocal(mast.position);
                lastMast = mast;
                if (mast.prefix === parts[0]) break;
            }
            const mastHeight = lastMast ? getMastConfig(lastMast.configName).height : 100;
            return new Vector3(mastPos.x, Math.random() * mastHeight, mastPos.y);
        },
        [masts],
    );

    const getStations = useCallback(() => stationsRef.current, []);

    const updateStation = useCallback(
        (name: string, value: number) => {
            if (!(name in stationsRef.current)) {
                stationsRef.current[name] = { position: getStationPos(name), value: value };
            } else {
                stationsRef.current[name].value = value;
            }
        },
        [getStationPos],
    );

    const updatePosition = useCallback((lat: Vector3, lon: Vector3) => {
        const newPos: GeographicSystemPosition = { lat, lon };
        setPosition(newPos);
        storageManager.setItem('position', newPos);
    }, []);

    const addMast = useCallback(() => {
        setMasts((prev) => [
            ...prev,
            {
                id: Guid.create().toString(),
                prefix: '',
                description: '',
                configName: '35m, 4 stations',
                position: { radius: 0, angle: 0 },
                rotation: 0,
            },
        ]);
    }, []);

    const updateMast = useCallback(<K extends keyof Mast>(id: string, key: K, value: Mast[K]) => {
        setMasts((prev) => prev.map((mast) => (mast.id === id ? { ...mast, [key]: value } : mast)));
    }, []);

    const deleteMast = useCallback((id: string) => {
        setMasts((prev) => prev.filter((m) => m.id != id));
    }, []);

    const contextValue: ComplexDataContextType = {
        getStations: getStations,
        updateStation: updateStation,
        position: position,
        updatePosition: updatePosition,
        masts: masts,
        addMast: addMast,
        updateMast: updateMast,
        deleteMast: deleteMast,
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
