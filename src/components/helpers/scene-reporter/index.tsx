import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { useScene } from '@context/scene-context';

export const SceneReporter = () => {
    const { sceneRef, cameraRef } = useScene();

    const camera = useThree((state) => state.camera);
    const scene = useThree((state) => state.scene);

    useEffect(() => {
        if (scene) sceneRef.current = scene;
        if (camera) cameraRef.current = camera;
    }, [scene, camera, sceneRef, cameraRef]);

    return null;
};
