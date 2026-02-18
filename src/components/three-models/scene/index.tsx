import { Vector3 } from 'three';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Select } from '@react-three/drei';
import { BasePlateModel } from '@models_/base-plate-model';
import { TelescopeModel } from '@models_/telescope-model';
import { MastModel } from '@models_/mast-model';
import { masts } from '@utils/consts';
import { OutlineEffect } from '@models_/outline-effect';
import { AtmosphereModel } from '@models_/atmosphere-model';

export const Scene = () => {
    const basePlateSize: Vector3 = new Vector3(200, 10, 160);
    const cameraProps = {
        position: new Vector3(-90, 90, 130),
        fov: 60,
    };
    return (
        <Canvas camera={cameraProps}>
            <ambientLight intensity={0.5} />
            <pointLight position={[0, 100, 0]} />
            <Environment
                preset='city'
                background={undefined}
                ground={undefined}
            />

            <OutlineEffect>
                <Select>
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
                </Select>
            </OutlineEffect>

            <AtmosphereModel
                basePlateSize={basePlateSize}
                height={60}
            />

            <OrbitControls />
        </Canvas>
    );
};
