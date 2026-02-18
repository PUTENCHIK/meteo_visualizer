import { Outlines } from '@react-three/drei';
import { basePlateColor, edgesColor } from '@shared/colors';
import { edgesEnable, edgesScale } from '@utils/consts';
import { Vector3 } from 'three';

interface BasePlateModelProps {
    size: Vector3;
}

export const BasePlateModel = ({ size }: BasePlateModelProps) => {
    return (
        <mesh position={[0, -size.y / 2, 0]}>
            <boxGeometry args={size.toArray()} />
            <meshStandardMaterial color={basePlateColor} />
            {edgesEnable && <Outlines thickness={edgesScale} color={edgesColor} />}
        </mesh>
    );
};
