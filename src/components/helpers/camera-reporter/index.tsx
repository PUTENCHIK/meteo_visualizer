import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';

interface CameraReporterProps {
    onCameraReady: (camera: any) => void;
}

export const CameraReporter = ({ onCameraReady }: CameraReporterProps) => {
    const camera = useThree((state) => state.camera);

    useEffect(() => {
        if (camera) onCameraReady(camera);
    }, []);

    return null;
};
