import { basePlateColor } from '@types_/colors';
import { Vector3 } from 'three';

interface BasePlateModelProps {
    size: Vector3;
}

export const BasePlateModel = (props: BasePlateModelProps) => {
    return (
        <mesh position={[0, -props.size.y / 2, 0]}>
            <boxGeometry args={props.size.toArray()} />
            <meshStandardMaterial color={basePlateColor}/>
        </mesh>
    );
};
