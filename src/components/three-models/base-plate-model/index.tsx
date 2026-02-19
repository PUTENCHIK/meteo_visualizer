import { BoxMesh } from '@models_/box-mesh';
import { basePlateColor } from '@shared/colors';
import { Vector3 } from 'three';

interface BasePlateModelProps {
    size: Vector3;
}

export const BasePlateModel = ({ size }: BasePlateModelProps) => {
    return (
        <BoxMesh 
            size={size}
            position={new Vector3(0, -size.y / 2, 0)}
            color={basePlateColor}
        />
    );
};
