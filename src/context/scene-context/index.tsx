import type { CameraControls } from '@react-three/drei';
import type { Camera } from '@react-three/fiber';
import { createContext, useContext, useRef, type ReactNode, type RefObject } from 'react';
import type { Scene } from 'three';

interface SceneContextType {
    sceneRef: RefObject<Scene | null>;
    cameraRef: RefObject<Camera | null>;
    controlsRef: RefObject<CameraControls | null>;
}

const SceneContext = createContext<SceneContextType | undefined>(undefined);

export const SceneProvider = ({ children }: { children: ReactNode }) => {
    const sceneRef = useRef<Scene>(null);
    const controlsRef = useRef<CameraControls>(null);
    const cameraRef = useRef<Camera>(null);

    const contextValue: SceneContextType = {
        sceneRef: sceneRef,
        controlsRef: controlsRef,
        cameraRef: cameraRef,
    };

    return <SceneContext.Provider value={contextValue}>{children}</SceneContext.Provider>;
};

export const useScene = () => {
    const context = useContext(SceneContext);
    if (!context) throw new Error('useScene must be used within SceneProvider');
    return context;
};
