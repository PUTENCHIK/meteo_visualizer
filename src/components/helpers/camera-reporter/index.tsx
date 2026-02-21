import { useThree, type Camera } from '@react-three/fiber';
import { useEffect } from 'react';

interface CameraReporterProps {
    onCameraReady: (camera: Camera) => void;
}

export const CameraReporter = ({ onCameraReady }: CameraReporterProps) => {
    const camera = useThree((state) => state.camera);

    useEffect(() => {
        if (camera) onCameraReady(camera);
    }, [camera, onCameraReady]);

    return null;
};
