import { Vector3 } from 'three';
import { Canvas, type Camera } from '@react-three/fiber';
import { OrbitControls, type OrbitControlsChangeEvent } from '@react-three/drei';
import { BasePlateModel } from '@models_/base-plate-model';
import { TelescopeModel } from '@models_/telescope-model';
import { MastModel } from '@models_/mast-model';
import { masts } from '@utils/consts';
import { Suspense, useMemo } from 'react';
import { Loader } from '@components/loader';
import { AtmosphereModel } from '@models_/atmosphere-model';
import { polarPosToXY } from '@utils/funcs';
import { CameraReporter } from '@helpers/camera-reporter';
import { degToRad } from 'three/src/math/MathUtils.js';
import { useSettings } from '@context/use-settings';

interface SceneProps {
    onCameraReady: (camera: Camera) => void;
}

export const Scene = ({ onCameraReady }: SceneProps) => {
    const { map: settings } = useSettings();

    const basePlateSize = useMemo(() => {
        const size = new Vector3(20, settings.model.basePlate.height, 20);

        masts.forEach((mast) => {
            const mastPos = polarPosToXY(mast.position);
            size.x = Math.max(size.x, 2 * Math.abs(mastPos.x));
            size.z = Math.max(size.z, 2 * Math.abs(mastPos.y));
        });

        size.x += settings.model.basePlate.padding;
        size.z += settings.model.basePlate.padding;

        return size;
    }, [settings.model.basePlate.height, settings.model.basePlate.padding]);

    const cameraProps = {
        position: new Vector3(basePlateSize.x, settings.atmosphere.height * 2, -basePlateSize.z),
        fov: 60,
    };

    const handleCameraChange = (e?: OrbitControlsChangeEvent) => {
        if (!e || settings.camera.noLimits) return;

        const controls = e.target;
        const target = controls.target;

        target.x = Math.max(-basePlateSize.x / 2, Math.min(basePlateSize.x / 2, target.x));
        target.y = Math.max(0, Math.min(settings.atmosphere.height * 2, target.y));
        target.z = Math.max(-basePlateSize.z / 2, Math.min(basePlateSize.z / 2, target.z));
    };

    return (
        <Canvas camera={cameraProps}>
            <Suspense fallback={<Loader type='circle' />}>
                {settings.scene.light.ambient.enable && (
                    <ambientLight
                        intensity={settings.scene.light.ambient.intensity}
                        color={settings.scene.light.ambient.color}
                    />
                )}
                {settings.scene.light.directional.enable && (
                    <directionalLight
                        position={[200, 200, 200]}
                        intensity={settings.scene.light.directional.intensity}
                        castShadow={settings.scene.light.directional.castShadow}
                        shadow-mapSize={[64, 64]}
                        color={settings.scene.light.directional.color}
                    />
                )}
                <CameraReporter onCameraReady={onCameraReady} />

                {settings.model.basePlate.enable && <BasePlateModel size={basePlateSize} />}
                {settings.model.telescope.enable && (
                    <TelescopeModel
                        height={settings.model.telescope.height}
                        radius={settings.model.telescope.radius}
                        length={settings.model.telescope.length}
                    />
                )}

                {masts.map((item, index) => (
                    <MastModel
                        key={index}
                        height={item.height}
                        position={item.position}
                        rotation={item.rotation}
                        yards={item.yards}
                    />
                ))}
                {settings.atmosphere.enable && (
                    <AtmosphereModel
                        basePlateSize={basePlateSize}
                        height={settings.atmosphere.height}
                    />
                )}
            </Suspense>

            <OrbitControls
                onChange={handleCameraChange}
                minDistance={!settings.camera.noLimits ? settings.camera.minDistance : 0}
                maxDistance={!settings.camera.noLimits ? settings.camera.maxDistance : 10_000}
                maxPolarAngle={degToRad(
                    !settings.camera.noLimits ? settings.camera.maxPolarAngle : 360,
                )}
            />
        </Canvas>
    );
};
