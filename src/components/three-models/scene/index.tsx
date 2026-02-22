import { Vector3 } from 'three';
import { Canvas, type Camera } from '@react-three/fiber';
import { OrbitControls, type OrbitControlsChangeEvent } from '@react-three/drei';
import { BasePlateModel } from '@models_/base-plate-model';
import { TelescopeModel } from '@models_/telescope-model';
import { MastModel } from '@models_/mast-model';
import { masts, orbidControlSettings } from '@utils/consts';
import { Suspense, useMemo } from 'react';
import { Loader } from '@components/loader';
import { AtmosphereModel } from '@models_/atmosphere-model';
import { polarPosToXY } from '@utils/funcs';
import { CameraReporter } from '@helpers/camera-reporter';

interface SceneProps {
    onCameraReady: (camera: Camera) => void;
}

export const Scene = ({ onCameraReady }: SceneProps) => {
    const basePlateHeight = 5;
    const basePlatePadding = 100;
    const atmosphereHeight = 60;

    const basePlateSize = useMemo(() => {
        const size = new Vector3(20, basePlateHeight, 20);

        masts.map((mast) => {
            const mastPos = polarPosToXY(mast.position);

            size.x = Math.max(size.x, 2 * Math.abs(mastPos.x));
            size.z = Math.max(size.z, 2 * Math.abs(mastPos.y));
        });
        size.x += basePlatePadding;
        size.z += basePlatePadding;

        return size;
    }, []);

    const cameraProps = {
        position: new Vector3(basePlateSize.x, atmosphereHeight * 2, -basePlateSize.z),
        fov: 60,
    };

    const handleCameraChange = (e?: OrbitControlsChangeEvent) => {
        if (!e) return;

        const controls = e.target;
        const target = controls.target;

        target.x = Math.max(-basePlateSize.x / 2, Math.min(basePlateSize.x / 2, target.x));
        target.y = Math.max(0, Math.min(atmosphereHeight * 2, target.y));
        target.z = Math.max(-basePlateSize.z / 2, Math.min(basePlateSize.z / 2, target.z));
    };

    return (
        <Canvas camera={cameraProps}>
            <Suspense fallback={<Loader type='circle' />}>
                <ambientLight intensity={2} />
                <directionalLight
                    position={[200, 200, 200]}
                    intensity={2}
                    castShadow
                    shadow-mapSize={[64, 64]}
                />
                <CameraReporter onCameraReady={onCameraReady} />

                <BasePlateModel size={basePlateSize} />
                <TelescopeModel height={12} radius={10} length={35} />

                {masts.map((item, index) => (
                    <MastModel
                        key={index}
                        height={item.height}
                        position={item.position}
                        rotation={item.rotation}
                        yards={item.yards}
                    />
                ))}

                <AtmosphereModel basePlateSize={basePlateSize} height={atmosphereHeight} />
            </Suspense>

            <OrbitControls
                onChange={handleCameraChange}
                minDistance={orbidControlSettings.minDistance}
                maxDistance={orbidControlSettings.maxDistance}
                maxPolarAngle={orbidControlSettings.maxPolarAngle}
            />
        </Canvas>
    );
};
